import { Fragment, useEffect, useRef } from "react";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "@components/breadcrumbs";
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
} from "../../../redux/schedule_slice";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import Filterbar from "./components/filterbar";
import TableLoading from "../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";
import useSchedule from "../../../hooks/use_schedule";

const AllSchedule = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const { getSchedules, deleteSchedule, filters, setFilters, loadings } =
    useSchedule();

  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  const deleteModal = useSelector((state) => state.schedule.deleteModal);
  const selectedEntity = useSelector((state) => state.schedule.selectedEntity);
  const currentPage = useSelector((state) => state.schedule.currentPage);
  const totalPage = useSelector((state) => state.schedule.totalPage);
  const perPage = useSelector((state) => state.schedule.perPage);
  const patchLoading = useSelector((state) => state.schedule.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getSchedules && scheduleList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getSchedules(page.selected + 1, perPage);
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
                getSchedules(1, value, "without_filter");
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
    getSchedules(currentPage, perPage, "without_filter");
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="زمانبندی های خدمات"
        data={[{ title: "داشبورد" }, { title: "زمانبندی های خدمات" }]}
      />
      {/* filterbar */}
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        getSchedules={getSchedules}
      />
      {/* loading */}
      {loadings.getSchedules ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getSchedules && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getSchedules ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>
                    زمانبندی خدماتی یافت نشد.
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
              data={scheduleList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getSchedules && scheduleList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            زمانبندی خدماتی یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این زمانبندی خدمات مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteSchedule}
        yesAction={() => deleteSchedule(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllSchedule;
