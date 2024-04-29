import { Fragment, useEffect, useRef } from "react";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "@components/breadcrumbs";
import useFinance from "../../../hooks/use_finance";
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
import { setCurrentPage, setPerPage } from "../../../redux/finance_slice";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import Filterbar from "./components/filterbar";
import TableLoading from "../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";

const AllFinance = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const { getFinances, filters, setFilters, loadings } = useFinance();

  const financeList = useSelector((state) => state.finance.financeList);
  const currentPage = useSelector((state) => state.finance.currentPage);
  const totalPage = useSelector((state) => state.finance.totalPage);
  const perPage = useSelector((state) => state.finance.perPage);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getFinances && financeList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getFinances(page.selected + 1, perPage);
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
                getFinances(1, value, "without_filter");
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
    getFinances(currentPage, perPage, "without_filter");
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="مالی"
        data={[{ title: "داشبورد" }, { title: "مالی" }]}
      />
      {/* filterbar */}
      {/* <Filterbar
        filters={filters}
        setFilters={setFilters}
        getFinances={getFinances}
      /> */}
      {/* loading */}
      {loadings.getFinances ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getFinances && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getFinances ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>
                    اطلاعات مالی ای یافت نشد.
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
              data={financeList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getFinances && financeList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            اطلاعات مالی ای یافت نشد.
          </CardBody>
        </Card>
      ) : null}
    </Fragment>
  );
};
export default AllFinance;
