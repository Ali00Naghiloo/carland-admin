import { Fragment, useEffect, useRef, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useSimcardNave from "../../../../hooks/use_simcard_nave";
import { Card, CardBody, Col, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import CustomLoading from "../../../../components/loading";
import Confirm from "../../../../components/confirm";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { columns } from "./datatable";
import { useDispatch, useSelector } from "react-redux";
import { AsyncPaginate } from "react-select-async-paginate";
import formatHelper from "../../../../helper/format_helper";
import toast from "react-hot-toast";
import { selectThemeColors } from "@utils";
import {
  setAssignModal,
  setCurrentPage,
  setDeleteModal,
  setPerPage,
} from "../../../../redux/simcard_nave_slice";
import { PaginationCountData } from "../../../../utility/data/pagination_count";
import Filterbar from "./components/filterbar";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../../components/button";

const AllSimcardNave = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const {
    getSimcardNaves,
    deleteSimcardNave,
    assignSourceNumber,
    getOperators,
    getSelectSourceNumber,
    operatorsList,
    filters,
    setFilters,
    loadings,
    getOperatorsLoading,
  } = useSimcardNave();

  const [selectedSourceNumber, setSelectedSourceNumber] = useState(null);

  const simcardNaveList = useSelector(
    (state) => state.simcardNave.simcardNaveList
  );
  const deleteModal = useSelector((state) => state.simcardNave.deleteModal);
  const selectedEntity = useSelector(
    (state) => state.simcardNave.selectedEntity
  );
  const currentPage = useSelector((state) => state.simcardNave.currentPage);
  const totalPage = useSelector((state) => state.simcardNave.totalPage);
  const perPage = useSelector((state) => state.simcardNave.perPage);
  const assignModal = useSelector((state) => state.simcardNave.assignModal);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getSimcardNaves && simcardNaveList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getSimcardNaves(page.selected + 1, perPage);
            }}
            pageCount={totalPage}
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            nextLinkClassName="page-link"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextClassName="page-item next-item"
            previousClassName="page-item prev-item"
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
          />
          <div className="d-flex align-items-center">
            <CustomButton
              color="success"
              style={{ marginLeft: 8, height: 35, padding: "0 12px" }}
            >
              خروجی اکسل کل صفحات
            </CustomButton>
            <CustomButton
              color="success"
              style={{ marginLeft: 8, height: 35, padding: "0 12px" }}
            >
              خروجی اکسل این صفحه
            </CustomButton>
            <CustomButton
              color="danger"
              onClick={handlePrint}
              style={{ marginLeft: 8, height: 35, padding: "0 12px" }}
            >
              پرینت جدول
            </CustomButton>
            {/* grade */}
            <Select
              isClearable={false}
              menuPlacement="top"
              theme={selectThemeColors}
              closeMenuOnSelect={true}
              isSearchable={false}
              placeholder="تعداد رکورد قابل نمایش"
              onChange={(value) => {
                dispatch(setPerPage(value));
                dispatch(setCurrentPage(1));
                getSimcardNaves(1, value, "without_filter");
              }}
              value={perPage}
              options={PaginationCountData}
              className={"react-select"}
              classNamePrefix="select"
              id="pagination_count"
              name="pagination_count"
            />
          </div>
        </div>
      ) : null}
    </>
  );

  useEffect(() => {
    getSimcardNaves(currentPage, perPage, "without_filter");
    getOperators();
  }, []);

  useEffect(() => {
    if (!assignModal) {
      setSelectedSourceNumber(null);
    } else {
      if (selectedEntity?.sorceNumber) {
        setSelectedSourceNumber({
          label: formatHelper.toPersianString(
            `${selectedEntity?.sorceNumber.number} (${selectedEntity?.sorceNumber.labelShowNumber})`
          ),
          value: selectedEntity?.sorceNumber.id,
        });
      }
    }
  }, [assignModal]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="سیمکارت های خام"
        data={[{ title: "داشبورد" }, { title: "سیمکارت های خام" }]}
      />
      {/* filterbar */}
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        getSimcardNaves={getSimcardNaves}
        operatorsList={operatorsList}
        getOperatorsLoading={getOperatorsLoading}
      />
      {/* loading */}
      {loadings.getSimcardNaves ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getSimcardNaves && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getSimcardNaves ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>سیمکارت خامی یافت نشد.</div>
                )
              }
              noHeader
              pagination
              paginationPerPage={perPage.id}
              columns={columns}
              className="react-dataTable"
              style={{ background: "red" }}
              paginationComponent={() => <></>}
              sortIcon={<ChevronDown size={10} />}
              data={simcardNaveList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getSimcardNaves && simcardNaveList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            سیمکارت خامی یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* assign modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این سیمکارت خام مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteSimcardNave}
        yesAction={() => deleteSimcardNave(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
      {/* assign modal */}
      <Confirm
        visible={assignModal}
        setVisible={setAssignModal}
        title={"تخصیص شماره به سیمکارت خام"}
        noAction={() => dispatch(setAssignModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.assignSourceNumber}
        yesAction={() => {
          if (!selectedSourceNumber) {
            toast.error("شماره تلفن را انتخاب کنید");
          } else {
            assignSourceNumber(selectedEntity.id, selectedSourceNumber.value);
          }
        }}
        yesColor={"primary"}
        yesTitle={"تخصیص"}
        type={"global"}
      >
        {/* sourceNumberId */}
        <Col xs="12" className="mb-1">
          <Label className="form-label" for="serviceId">
            شماره تلفن
          </Label>
          <AsyncPaginate
            value={selectedSourceNumber}
            loadOptions={getSelectSourceNumber}
            onChange={(value) => setSelectedSourceNumber(value)}
            additional={{
              page: 1,
            }}
            loadingMessage={() => "در حال بارگذاری . . ."}
            closeMenuOnSelect={true}
            cacheUniqs={[assignModal]}
            theme={selectThemeColors}
            isClearable={false}
            placeholder="شماره تلفن را انتخاب کنید"
            className={"react-select"}
            classNamePrefix="select"
            id="selectedSourceNumber"
            name="selectedSourceNumber"
          />
        </Col>
      </Confirm>
    </Fragment>
  );
};
export default AllSimcardNave;
