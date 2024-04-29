import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useSimcardNumber from "../../../../hooks/use_simcard_number";
import Filterbar from "./components/filterbar";
import { Card, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import CustomLoading from "../../../../components/loading";
import Confirm from "../../../../components/confirm";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { columns } from "./datatable";
import { selectThemeColors } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setDeleteModal,
  setPerPage,
} from "../../../../redux/simcard_number_slice";
import { PaginationCountData } from "../../../../utility/data/pagination_count";
import TableLoading from "../../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../../components/button";

const AllSimcardWithNumbers = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const {
    getSimcardNumbers,
    getOperators,
    deleteSimcardNumber,
    filters,
    setFilters,
    operatorsList,
    loadings,
    getOperatorsLoading,
    getNumberTypes,
    numberTypesList,
    getNumberTypesLoading,
    getNumberLabels,
    numberLabelsList,
    getNumberLabelsLoading,
    getSelectPlans,
    getSelectCategories,
  } = useSimcardNumber();

  const simcardNumberList = useSelector(
    (state) => state.simcardNumber.simcardNumberList
  );
  const deleteModal = useSelector((state) => state.simcardNumber.deleteModal);
  const selectedEntity = useSelector(
    (state) => state.simcardNumber.selectedEntity
  );
  const currentPage = useSelector((state) => state.simcardNumber.currentPage);
  const totalPage = useSelector((state) => state.simcardNumber.totalPage);
  const perPage = useSelector((state) => state.simcardNumber.perPage);
  const patchLoading = useSelector((state) => state.simcardNumber.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getSimcardNumbers && simcardNumberList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getSimcardNumbers(page.selected + 1, perPage);
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
            <Select
              isClearable={false}
              menuPlacement="top"
              theme={selectThemeColors}
              closeMenuOnSelect={true}
              placeholder="تعداد رکورد قابل نمایش"
              onChange={(value) => {
                dispatch(setPerPage(value));
                dispatch(setCurrentPage(1));
                getSimcardNumbers(1, value, "without_filter");
              }}
              isSearchable={false}
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
    getSimcardNumbers(currentPage, perPage, "without_filter");
    getOperators();
    getNumberTypes();
    getNumberLabels();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="سیمکارت های با شماره"
        data={[{ title: "داشبورد" }, { title: "سیمکارت های با شماره" }]}
      />
      {/* filterbar */}
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        operatorsList={operatorsList}
        getOperatorsLoading={getOperatorsLoading}
        getSimcardNumbers={getSimcardNumbers}
        numberTypesList={numberTypesList}
        getNumberTypesLoading={getNumberTypesLoading}
        numberLabelsList={numberLabelsList}
        getNumberLabelsLoading={getNumberLabelsLoading}
        getSelectPlans={getSelectPlans}
        getSelectCategories={getSelectCategories}
      />
      {/* loading */}
      {loadings.getSimcardNumbers ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getSimcardNumbers && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getSimcardNumbers ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>
                    سیمکارت با شماره ای یافت نشد.
                  </div>
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
              data={simcardNumberList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getSimcardNumbers && simcardNumberList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            سیمکارت با شماره ای یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این سیمکارت با شماره مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteSimcardNumber}
        yesAction={() => deleteSimcardNumber(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllSimcardWithNumbers;
