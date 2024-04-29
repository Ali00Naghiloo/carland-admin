import { Fragment, useEffect, useRef, useState } from "react";
import { Card, CardBody, Label, Col, Input } from "reactstrap";
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
import { AsyncPaginate } from "react-select-async-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setDeleteModal,
  setPerPage,
  setOfferModal,
  setScoreModal,
} from "../../../redux/service_slice";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import Filterbar from "./components/filterbar";
import TableLoading from "../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";
import useService from "../../../hooks/use_service";

const AllService = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const {
    getServices,
    getSelectCategories,
    getSelectOffers,
    getOperators,
    deleteService,
    assignOffer,
    addScore,
    operatorsList,
    filters,
    setFilters,
    loadings,
    getOperatorsLoading,
  } = useService();

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [scoreValue, setScoreValue] = useState("");

  const serviceList = useSelector((state) => state.service.serviceList);
  const deleteModal = useSelector((state) => state.service.deleteModal);
  const selectedEntity = useSelector((state) => state.service.selectedEntity);
  const currentPage = useSelector((state) => state.service.currentPage);
  const totalPage = useSelector((state) => state.service.totalPage);
  const perPage = useSelector((state) => state.service.perPage);
  const patchLoading = useSelector((state) => state.service.patchLoading);
  const offerModal = useSelector((state) => state.service.offerModal);
  const scoreModal = useSelector((state) => state.service.scoreModal);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getServices && serviceList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getServices(page.selected + 1, perPage);
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
                getServices(1, value, "without_filter");
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
    getServices(currentPage, perPage, "without_filter");
    getOperators();
  }, []);

  useEffect(() => {
    if (!offerModal) {
      setSelectedOffer(null);
    } else {
      if (selectedEntity?.offer) {
        setSelectedOffer({
          label: selectedEntity.offer.offerName,
          value: selectedEntity.offer.id,
        });
      }
    }
  }, [offerModal]);

  useEffect(() => {
    if (!scoreModal) {
      setScoreValue("");
    } else {
      if (selectedEntity?.score) {
        setScoreValue(selectedEntity.score);
      }
    }
  }, [scoreModal]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="خدمات"
        data={[{ title: "داشبورد" }, { title: "خدمات" }]}
      />
      {/* filterbar */}
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        getServices={getServices}
        getSelectCategories={getSelectCategories}
        getSelectOffers={getSelectOffers}
        operatorsList={operatorsList}
        getOperatorsLoading={getOperatorsLoading}
      />
      {/* loading */}
      {loadings.getServices ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getServices && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getServices ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>خدمتی یافت نشد.</div>
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
              data={serviceList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getServices && serviceList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            خدمتی یافت نشد.
          </CardBody>
        </Card>
      ) : null}{" "}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این خدمت مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteService}
        yesAction={() => deleteService(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
      {/* offer modal */}
      <Confirm
        visible={offerModal}
        setVisible={setOfferModal}
        title={"تخصیص تخفیف به این خدمت"}
        noAction={() => dispatch(setOfferModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.assignOffer}
        yesAction={() => {
          assignOffer(selectedEntity.id, selectedOffer?.value);
        }}
        yesColor={"primary"}
        yesTitle={"تخصیص"}
        type={"global"}
      >
        {/* sourceNumberId */}
        <Col xs="12" className="mb-1">
          <Label className="form-label" for="serviceId">
            تخفیف
          </Label>
          <AsyncPaginate
            value={selectedOffer}
            loadOptions={getSelectOffers}
            onChange={(value) => setSelectedOffer(value)}
            additional={{
              page: 1,
            }}
            loadingMessage={() => "در حال بارگذاری . . ."}
            closeMenuOnSelect={true}
            cacheUniqs={[offerModal]}
            theme={selectThemeColors}
            isClearable={true}
            placeholder="تخفیف را انتخاب کنید"
            className={"react-select"}
            classNamePrefix="select"
            id="selectedSourceNumber"
            name="selectedSourceNumber"
          />
        </Col>
      </Confirm>
      {/* score modal */}
      <Confirm
        visible={scoreModal}
        setVisible={setScoreModal}
        title={"افزودن امتیاز به این محصول"}
        noAction={() => dispatch(setScoreModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.addScore}
        yesAction={() => {
          addScore(selectedEntity.id, scoreValue);
        }}
        yesColor={"primary"}
        yesTitle={"افزودن"}
        type={"global"}
      >
        {/* scoreValue */}
        <Col xs="12" className="mb-1">
          <Label className="form-label" for="serviceId">
            امتیاز
          </Label>
          <Input
            value={scoreValue}
            onChange={(e) => setScoreValue(e.target.value)}
            placeholder="امتیاز را وارد کنید"
            id="scoreValue"
            name="scoreValue"
            type="number"
            autoFocus
          />
        </Col>
      </Confirm>
    </Fragment>
  );
};
export default AllService;
