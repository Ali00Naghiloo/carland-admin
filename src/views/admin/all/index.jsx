import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useAdmin from "../../../hooks/use_admin";
import { useDispatch, useSelector } from "react-redux";
import { useSkin } from "@hooks/useSkin";
import { Card, CardBody } from "reactstrap";
import TableLoading from "../../../components/table_loading";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import CustomLoading from "../../../components/loading";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import ReactPaginate from "react-paginate";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";
import Select from "react-select";
import { columns } from "./datatable";
import { selectThemeColors } from "@utils";
import Confirm from "../../../components/confirm";
import Filterbar from "./components/filterbar";
import {
  setCurrentPage,
  setDeleteModal,
  setPerPage,
} from "../../../redux/admin_slice";

const AllAdmins = () => {
  const array = [1, 1, 1, 1];
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const { getAdmins, deleteAdmin, filters, setFilters, loadings } = useAdmin();

  const datatableRef = useRef();

  const adminList = useSelector((state) => state.admin.adminList);
  const currentPage = useSelector((state) => state.admin.currentPage);
  const totalPage = useSelector((state) => state.admin.totalPage);
  const perPage = useSelector((state) => state.admin.perPage);
  const selectedEntity = useSelector((state) => state.admin.selectedEntity);
  const deleteModal = useSelector((state) => state.admin.deleteModal);
  const patchLoading = useSelector((state) => state.admin.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getAdmins && adminList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getAdmins(page.selected + 1, perPage);
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
                getAdmins(1, value, "without_filter");
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
    getAdmins(currentPage, perPage, "without_filter");
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ادمین ها"
        data={[{ title: "داشبورد" }, { title: "ادمین ها" }]}
      />
      {/* filterbar */}
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        getAdmins={getAdmins}
      />
      {/* loading */}
      {loadings.getAdmins ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getAdmins && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getAdmins ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>ادمینی یافت نشد.</div>
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
              data={adminList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getAdmins && adminList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            ادمینی یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این ادمین مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteAdmin}
        yesAction={() => deleteAdmin(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllAdmins;
