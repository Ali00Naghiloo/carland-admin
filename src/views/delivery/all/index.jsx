import { Fragment, useEffect, useRef } from "react";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "@components/breadcrumbs";
import useDelivery from "../../../hooks/use_delivery";
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
} from "../../../redux/delivery_slice";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import Filterbar from "./components/filterbar";
import TableLoading from "../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";

const AllDelivery = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const {
    getDeliveries,
    getProvinces,
    getFilterCities,
    deleteDelivery,
    filters,
    setFilters,
    loadings,
  } = useDelivery();

  const deliveryList = useSelector((state) => state.delivery.deliveryList);
  const deleteModal = useSelector((state) => state.delivery.deleteModal);
  const selectedEntity = useSelector((state) => state.delivery.selectedEntity);
  const currentPage = useSelector((state) => state.delivery.currentPage);
  const totalPage = useSelector((state) => state.delivery.totalPage);
  const perPage = useSelector((state) => state.delivery.perPage);
  const patchLoading = useSelector((state) => state.delivery.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getDeliveries && deliveryList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getDeliveries(page.selected + 1, perPage);
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
                getDeliveries(1, value, "without_filter");
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
    getDeliveries(currentPage, perPage, "without_filter");
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="تعرفه های ارسال"
        data={[{ title: "داشبورد" }, { title: "تعرفه های ارسال" }]}
      />
      {/* filterbar */}
      <Filterbar
        getDeliveries={getDeliveries}
        getProvinces={getProvinces}
        getFilterCities={getFilterCities}
        deleteDelivery={deleteDelivery}
        filters={filters}
        setFilters={setFilters}
      />
      {/* loading */}
      {loadings.getDeliveries ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getDeliveries && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getDeliveries ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>تعرفه ارسالی یافت نشد.</div>
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
              data={deliveryList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getDeliveries && deliveryList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            تعرفه ارسالی یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این تعرفه ارسال مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteDelivery}
        yesAction={() => deleteDelivery(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllDelivery;
