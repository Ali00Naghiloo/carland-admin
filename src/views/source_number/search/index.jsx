import { Fragment, useEffect, useRef, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Row,
  Col,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import useSourceNumber from "../../../hooks/use_source_number";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/button";
import { columns } from "./datatable/index";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import CustomLoading from "../../../components/loading";
import ReactPaginate from "react-paginate";
import {
  setCurrentPageSearch,
  setPerPageSearch,
} from "../../../redux/source_number_slice";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import { PaginationCountData } from "../../../utility/data/pagination_count";

const SearchSourceNumbers = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const {
    simpleSearchController,
    simpleSearch,
    advanceSearchController,
    advanceSearch,
    searchResult,
    getSelectPrefixes,
    getOperators,
    getOperatorsLoading,
    operatorsList,
    loadings,
  } = useSourceNumber();

  const input5ref = useRef(null);
  const input6ref = useRef(null);
  const input7ref = useRef(null);
  const input8ref = useRef(null);
  const input9ref = useRef(null);
  const input10ref = useRef(null);
  const input11ref = useRef(null);

  const [searchMode, setSearchMode] = useState(0);

  const currentPageSearch = useSelector(
    (state) => state.sourceNumber.currentPageSearch
  );
  const totalPageSearch = useSelector(
    (state) => state.sourceNumber.totalPageSearch
  );
  const perPageSearch = useSelector(
    (state) => state.sourceNumber.perPageSearch
  );

  // ** Custom Pagination
  const CustomPagination = () => (
    <div className="w-100 d-flex align-items-center justify-content-between">
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        forcePage={currentPageSearch - 1}
        onPageChange={(page) => {
          dispatch(setCurrentPageSearch(page.selected + 1));
          if (searchMode === 0) {
            advanceSearch(
              advanceSearchController.values,
              page.selected + 1,
              perPageSearch
            );
          } else {
            simpleSearch(
              simpleSearchController.values,
              page.selected + 1,
              perPageSearch
            );
          }
        }}
        pageCount={totalPageSearch}
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
      <Select
        isClearable={false}
        menuPlacement="top"
        theme={selectThemeColors}
        closeMenuOnSelect={true}
        placeholder="تعداد رکورد قابل نمایش"
        onChange={(value) => {
          dispatch(setPerPageSearch(value));
          dispatch(setCurrentPageSearch(1));
          if (searchMode === 0) {
            advanceSearch(advanceSearchController.values, 1, value);
          } else {
            simpleSearch(simpleSearchController.values, 1, value);
          }
        }}
        value={perPageSearch}
        options={PaginationCountData}
        className={"react-select"}
        classNamePrefix="select"
        id="pagination_count"
        name="pagination_count"
      />
    </div>
  );

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="جستجوی شماره تلفن ها"
        data={[{ title: "داشبورد" }, { title: "جستجوی شماره تلفن ها" }]}
      />
      {/* search form */}
      <Form
        onSubmit={
          searchMode === 0
            ? advanceSearchController.handleSubmit
            : simpleSearchController.handleSubmit
        }
      >
        <Card>
          {/* tabs */}
          <CardHeader className="justify-content-start border-bottom">
            <CustomButton
              onClick={() => {
                setSearchMode(0);
                simpleSearchController.resetForm();
              }}
              color="primary"
              outline={searchMode === 0 ? false : true}
            >
              جستجوی پیشرفته
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                setSearchMode(1);
                advanceSearchController.resetForm();
              }}
              color="primary"
              outline={searchMode === 1 ? false : true}
            >
              جستجوی ساده
            </CustomButton>
          </CardHeader>
          {/* form */}
          <CardBody className="border-bottom">
            {/* advance search */}
            {searchMode === 0 ? (
              <Row className="d-flex flex-column align-items-center">
                <Col className="mb-1" xs="12" md="6" sm="4">
                  {/* operatorId */}
                  <Col xs="12" className="mt-1">
                    <Label className="form-label" for="operatorId">
                      اپراتور
                    </Label>
                    <Select
                      value={advanceSearchController.values.operatorId}
                      onChange={(value) => {
                        advanceSearchController.setFieldValue(
                          "operatorId",
                          value
                        );
                        advanceSearchController.setFieldValue(
                          "prefixSearch",
                          null
                        );
                        advanceSearchController.setFieldValue(
                          "middleSearch",
                          ""
                        );
                        advanceSearchController.setFieldValue("endSearch", "");
                      }}
                      isLoading={getOperatorsLoading}
                      noOptionsMessage={() => " اپراتوری یافت نشد."}
                      theme={selectThemeColors}
                      closeMenuOnSelect={true}
                      isDisabled={getOperatorsLoading}
                      placeholder="اپراتور را انتخاب کنید"
                      options={operatorsList}
                      className={"react-select"}
                      classNamePrefix="select"
                      id="operatorId"
                      name="operatorId"
                    />
                  </Col>
                </Col>
                <Col
                  xs="12"
                  className="mt-1 d-flex justify-content-center advance_search_container"
                >
                  {/* middleSearch */}
                  <div
                    className="d-flex align-items-center"
                    style={{ direction: "ltr" }}
                  >
                    {/* Number8 */}
                    <Input
                      innerRef={input8ref}
                      value={advanceSearchController.values.Number8}
                      onChange={(e) => {
                        if (e.target.value.length === 1) {
                          input9ref.current.focus();
                          advanceSearchController.setFieldValue(
                            "Number8",
                            e.target.value
                          );
                        } else if (e.target.value.length === 0) {
                          input7ref.current.focus();
                          advanceSearchController.setFieldValue(
                            "Number8",
                            e.target.value
                          );
                        } else {
                          return;
                        }
                      }}
                      id="Number8"
                      name="Number8"
                      type="number"
                      placeholder="*"
                      className="text-center advance_search_input"
                      disabled={!advanceSearchController.values.operatorId}
                    />
                    {/* Number9 */}
                    <Input
                      innerRef={input9ref}
                      value={advanceSearchController.values.Number9}
                      onChange={(e) => {
                        if (e.target.value.length === 1) {
                          input10ref.current.focus();
                          advanceSearchController.setFieldValue(
                            "Number9",
                            e.target.value
                          );
                        } else if (e.target.value.length === 0) {
                          advanceSearchController.setFieldValue(
                            "Number9",
                            e.target.value
                          );
                          input8ref.current.focus();
                        } else {
                          return;
                        }
                      }}
                      id="Number9"
                      name="Number9"
                      type="number"
                      placeholder="*"
                      className="text-center advance_search_input"
                      disabled={!advanceSearchController.values.operatorId}
                    />
                    {/* Number10 */}
                    <Input
                      innerRef={input10ref}
                      value={advanceSearchController.values.Number10}
                      onChange={(e) => {
                        if (e.target.value.length === 1) {
                          input11ref.current.focus();
                          advanceSearchController.setFieldValue(
                            "Number10",
                            e.target.value
                          );
                        } else if (e.target.value.length === 0) {
                          advanceSearchController.setFieldValue(
                            "Number10",
                            e.target.value
                          );
                          input9ref.current.focus();
                        } else {
                          return;
                        }
                      }}
                      id="Number10"
                      name="Number10"
                      type="number"
                      placeholder="*"
                      className="text-center advance_search_input"
                      disabled={!advanceSearchController.values.operatorId}
                    />
                    {/* Number11 */}
                    <Input
                      innerRef={input11ref}
                      value={advanceSearchController.values.Number11}
                      onChange={(e) => {
                        if (e.target.value.length === 1) {
                          advanceSearchController.setFieldValue(
                            "Number11",
                            e.target.value
                          );
                        } else if (e.target.value.length === 0) {
                          advanceSearchController.setFieldValue(
                            "Number11",
                            e.target.value
                          );
                          input10ref.current.focus();
                        } else {
                          return;
                        }
                      }}
                      style={{ borderRadius: "0 20px 20px 0" }}
                      id="Number11"
                      name="Number11"
                      type="number"
                      placeholder="*"
                      className="text-center advance_search_input"
                      disabled={!advanceSearchController.values.operatorId}
                    />
                  </div>
                  {/* middleSearch */}
                  <div
                    className="d-flex align-items-center"
                    style={{ direction: "ltr" }}
                  >
                    {/* Number5 */}
                    <Input
                      innerRef={input5ref}
                      value={advanceSearchController.values.Number5}
                      onChange={(e) => {
                        if (e.target.value.length === 1) {
                          input6ref.current.focus();
                          advanceSearchController.setFieldValue(
                            "Number5",
                            e.target.value
                          );
                        } else if (e.target.value.length === 0) {
                          advanceSearchController.setFieldValue(
                            "Number5",
                            e.target.value
                          );
                        } else {
                          return;
                        }
                      }}
                      id="Number5"
                      name="Number5"
                      type="number"
                      placeholder="*"
                      className="text-center advance_search_input"
                      disabled={!advanceSearchController.values.operatorId}
                    />
                    {/* Number6 */}
                    <Input
                      innerRef={input6ref}
                      value={advanceSearchController.values.Number6}
                      onChange={(e) => {
                        if (e.target.value.length === 1) {
                          input7ref.current.focus();
                          advanceSearchController.setFieldValue(
                            "Number6",
                            e.target.value
                          );
                        } else if (e.target.value.length === 0) {
                          advanceSearchController.setFieldValue(
                            "Number6",
                            e.target.value
                          );
                          input5ref.current.focus();
                        } else {
                          return;
                        }
                      }}
                      id="Number6"
                      name="Number6"
                      type="number"
                      placeholder="*"
                      className="text-center advance_search_input"
                      disabled={!advanceSearchController.values.operatorId}
                    />
                    {/* Number7 */}
                    <Input
                      innerRef={input7ref}
                      value={advanceSearchController.values.Number7}
                      onChange={(e) => {
                        if (e.target.value.length === 1) {
                          input8ref.current.focus();
                          advanceSearchController.setFieldValue(
                            "Number7",
                            e.target.value
                          );
                        } else if (e.target.value.length === 0) {
                          advanceSearchController.setFieldValue(
                            "Number7",
                            e.target.value
                          );
                          input6ref.current.focus();
                        } else {
                          return;
                        }
                      }}
                      id="Number7"
                      name="Number7"
                      type="number"
                      placeholder="*"
                      className="text-center advance_search_input"
                      disabled={!advanceSearchController.values.operatorId}
                    />
                  </div>
                  {/* prefixes */}
                  <AsyncPaginate
                    value={advanceSearchController.values.prefixSearch}
                    loadOptions={getSelectPrefixes}
                    onChange={(value) =>
                      advanceSearchController.setFieldValue(
                        "prefixSearch",
                        value
                      )
                    }
                    additional={{
                      page: 1,
                    }}
                    cacheUniqs={[advanceSearchController.values.operatorId]}
                    isDisabled={!advanceSearchController.values.operatorId}
                    noOptionsMessage={() => "پیش شماره ای یافت نشد."}
                    loadingMessage={() => "در حال بارگذاری . . ."}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="پیش شماره"
                    className={"react-select"}
                    classNamePrefix="select"
                    id="prefixSearch"
                    name="prefixSearch"
                  />
                </Col>
              </Row>
            ) : null}
            {/* simple search */}
            {searchMode === 1 ? (
              <Row className="d-flex justify-content-center">
                {/* Number */}
                <Col xs="12" sm="6" className="mt-1">
                  <Label className="form-label" for="Number">
                    شماره تلفن
                  </Label>
                  <Input
                    value={simpleSearchController.values.Number}
                    onChange={simpleSearchController.handleChange}
                    id="Number"
                    name="Number"
                    placeholder="شماره تلفن را وارد کنید"
                    invalid={
                      simpleSearchController.touched.Number
                        ? simpleSearchController.errors.Number
                        : null
                    }
                  />
                  {simpleSearchController.touched.Number &&
                  simpleSearchController.errors.Number ? (
                    <FormFeedback style={{ display: "block" }}>
                      {simpleSearchController.errors.Number}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            ) : null}
          </CardBody>
          {/* action button */}
          <CardFooter className="d-flex justify-content-center">
            <CustomButton
              loading={
                searchMode === 0
                  ? loadings.advanceSearch
                  : loadings.simpleSearch
              }
              color="primary"
            >
              جستجو
            </CustomButton>
          </CardFooter>
        </Card>
      </Form>
      {/* loading */}
      {loadings.simpleSearch || loadings.advanceSearch ? (
        <CustomLoading />
      ) : null}
      {/* datatable */}
      {!loadings.simpleSearch && !loadings.advanceSearch && (
        <DataTable
          noDataComponent={
            !loadings.simpleSearch || !loadings.advanceSearch ? (
              ""
            ) : (
              <div style={{ margin: "24px 0" }}>شماره تلفنی یافت نشد.</div>
            )
          }
          noHeader
          pagination
          paginationPerPage={perPageSearch.id}
          columns={columns}
          className="react-dataTable"
          style={{ background: "red" }}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={searchResult}
          theme={skin === "dark" ? "darkTheme" : ""}
        />
      )}
    </Fragment>
  );
};
export default SearchSourceNumbers;
