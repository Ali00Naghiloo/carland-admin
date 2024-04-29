import { Fragment, useEffect, useRef } from "react";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "@components/breadcrumbs";
import useCommision from "../../../hooks/use_commision";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import CustomLoading from "../../../components/loading";
import Confirm from "../../../components/confirm";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { columns } from "./datatable";
import { selectThemeColors } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setDeleteModal,
  setPerPage,
} from "../../../redux/commision_slice";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import Filterbar from "./components/filterbar";
import TableLoading from "../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";

const AllCommision = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const {
    getCommisions,
    getSelectGrade,
    getOperators,
    getSelectProduct,
    getFilterSelectProduct,
    getSelectService,
    getFilterSelectService,
    deleteCommision,
    operatorsList,
    filters,
    setFilters,
    loadings,
    getOperatorsLoading,
  } = useCommision();

  const commisionList = useSelector((state) => state.commision.commisionList);
  const deleteModal = useSelector((state) => state.commision.deleteModal);
  const selectedEntity = useSelector((state) => state.commision.selectedEntity);
  const currentPage = useSelector((state) => state.commision.currentPage);
  const totalPage = useSelector((state) => state.commision.totalPage);
  const perPage = useSelector((state) => state.commision.perPage);
  const patchLoading = useSelector((state) => state.commision.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getCommisions && commisionList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getCommisions(page.selected + 1, perPage);
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
                getCommisions(1, value, "without_filter");
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
    getCommisions(currentPage, perPage, "without_filter");
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="کمیسیون ها"
        data={[{ title: "داشبورد" }, { title: "کمیسیون ها" }]}
      />
      {/* filterbar */}
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        getCommisions={getCommisions}
        getSelectGrade={getSelectGrade}
        getSelectProduct={getSelectProduct}
        getFilterSelectProduct={getFilterSelectProduct}
        getSelectService={getSelectService}
        getFilterSelectService={getFilterSelectService}
        operatorsList={operatorsList}
        getOperatorsLoading={getOperatorsLoading}
      />
      {/* loading */}
      {loadings.getCommisions ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getCommisions && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getCommisions ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>کمیسیونی یافت نشد.</div>
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
              data={commisionList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getCommisions && commisionList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            کمیسیونی یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این کمیسیون مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteCommision}
        yesAction={() => deleteCommision(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllCommision;
