import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useSms from "../../../hooks/use_sms";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import { columns } from "./datatable/index";
import CustomLoading from "../../../components/loading";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import { useDispatch, useSelector } from "react-redux";
import Filterbar from "./components/filterbar";
import {
  setDeleteModal,
  setCurrentPage,
  setPerPage,
} from "../../../redux/sms_slice";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import TableLoading from "../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";

const AllSms = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const { getSmsList, loadings, filters, setFilters } = useSms();

  const smsList = useSelector((state) => state.sms.smsList);
  const currentPage = useSelector((state) => state.sms.currentPage);
  const totalPage = useSelector((state) => state.sms.totalPage);
  const perPage = useSelector((state) => state.sms.perPage);
  const patchLoading = useSelector((state) => state.sms.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getSmsList && smsList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getSmsList(page.selected + 1, perPage);
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
                getSmsList(1, value, "without_filter");
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
    getSmsList(currentPage, perPage, "without_filter");
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="لیست پیامک ها"
        data={[{ title: "داشبورد" }, { title: "لیست پیامک ها" }]}
      />
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        getSmsList={getSmsList}
      />
      {/* datatable */}
      {!loadings.getSmsList ? (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                loadings.getSmsList ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>پیامکی یافت نشد.</div>
                )
              }
              noHeader
              pagination
              paginationPerPage={perPage.id}
              columns={columns}
              className="react-dataTable"
              paginationComponent={() => <></>}
              sortIcon={<ChevronDown size={10} />}
              data={smsList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      ) : null}
      {/* loading */}
      {loadings.getSmsList ? <CustomLoading /> : null}
    </Fragment>
  );
};
export default AllSms;
