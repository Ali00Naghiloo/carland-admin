import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import {
  Col,
  Form,
  Row,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Input,
  Card,
  CardFooter,
  FormFeedback,
} from "reactstrap";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomLoading from "../../../components/loading";
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/button";
import useCommision from "../../../hooks/use_commision";

const UpdateCommision = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getCommisionById,
    getSelectGrade,
    getOperators,
    getSelectProduct,
    getSelectService,
    viewCommisionData,
    operatorsList,
    updateCommisionController,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  } = useCommision();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getCommisionById(entity_id);
      getOperators();
      updateCommisionController.setFieldValue("id", entity_id);
    } else {
      navigate("/commision/all");
    }
  }, []);

  useEffect(() => {
    if (viewCommisionData) {
      if (viewCommisionData?.grade) {
        updateCommisionController.setFieldValue("gradeId", {
          label: viewCommisionData?.grade?.name,
          value: viewCommisionData?.grade?.id,
        });
      }
      if (viewCommisionData?.operator) {
        updateCommisionController.setFieldValue("operatorId", {
          label: viewCommisionData?.operator?.name,
          value: viewCommisionData?.operator?.id,
        });
      }
      if (viewCommisionData?.product) {
        updateCommisionController.setFieldValue("productId", {
          label: viewCommisionData?.product?.name,
          value: viewCommisionData?.product?.id,
        });
      }
      if (viewCommisionData?.service) {
        updateCommisionController.setFieldValue("serviceId", {
          label: viewCommisionData?.service?.name,
          value: viewCommisionData?.service?.id,
        });
      }
      if (viewCommisionData?.price) {
        updateCommisionController.setFieldValue(
          "price",
          viewCommisionData?.price
        );
      }
      updateCommisionController.setFieldValue(
        "active",
        viewCommisionData?.active
      );
    }
  }, [viewCommisionData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش کمیسیون"
        data={[{ title: "داشبورد" }, { title: "ویرایش کمیسیون" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateCommisionController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش کمیسیون</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* form fields */}
              <Row>
                {/* gradeId */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="gradeId">
                    گرید
                  </Label>
                  <AsyncPaginate
                    value={updateCommisionController.values.gradeId}
                    loadOptions={getSelectGrade}
                    onChange={(value) =>
                      updateCommisionController.setFieldValue("gradeId", value)
                    }
                    additional={{
                      page: 1,
                    }}
                    loadingMessage={() => "در حال بارگذاری . . ."}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="گرید را انتخاب کنید"
                    className={`react-select ${
                      updateCommisionController.touched.gradeId &&
                      updateCommisionController.errors.gradeId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="gradeId"
                    name="gradeId"
                  />
                  {updateCommisionController.touched.gradeId &&
                  updateCommisionController.errors.gradeId ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد گرید اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* operatorId */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="operatorId">
                    اپراتور
                  </Label>
                  <Select
                    value={updateCommisionController.values.operatorId}
                    onChange={(value) => {
                      updateCommisionController.setFieldValue(
                        "operatorId",
                        value
                      );
                      updateCommisionController.setFieldValue(
                        "productId",
                        null
                      );
                      updateCommisionController.setFieldValue(
                        "serviceId",
                        null
                      );
                    }}
                    isLoading={getOperatorsLoading}
                    noOptionsMessage={() => " اپراتوری یافت نشد."}
                    theme={selectThemeColors}
                    closeMenuOnSelect={true}
                    isDisabled={getOperatorsLoading}
                    placeholder="اپراتور را انتخاب کنید"
                    options={operatorsList}
                    className={`react-select ${
                      updateCommisionController.touched.operatorId &&
                      updateCommisionController.errors.operatorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="operatorId"
                    name="operatorId"
                  />
                  {updateCommisionController.touched.operatorId &&
                  updateCommisionController.errors.operatorId ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد اپراتور اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* productId */}
                {viewCommisionData?.product ? (
                  <Col xs="12" sm="6" md="3" className="mb-1">
                    <Label className="form-label" for="productId">
                      محصول
                    </Label>
                    <AsyncPaginate
                      value={updateCommisionController.values.productId}
                      loadOptions={getSelectProduct}
                      onChange={(value) =>
                        updateCommisionController.setFieldValue(
                          "productId",
                          value
                        )
                      }
                      additional={{
                        page: 1,
                      }}
                      loadingMessage={() => "در حال بارگذاری . . ."}
                      closeMenuOnSelect={true}
                      theme={selectThemeColors}
                      isClearable={false}
                      isDisabled={!updateCommisionController.values.operatorId}
                      cacheUniqs={[updateCommisionController.values.operatorId]}
                      placeholder="محصول را انتخاب کنید"
                      className={`react-select ${
                        updateCommisionController.touched.productId &&
                        updateCommisionController.errors.productId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="productId"
                      name="productId"
                    />
                    {updateCommisionController.touched.productId &&
                    updateCommisionController.errors.productId ? (
                      <FormFeedback style={{ display: "block" }}>
                        انتخاب حداقل یک محصول اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                ) : null}
                {/* serviceId */}
                {viewCommisionData?.service ? (
                  <Col xs="12" sm="6" md="3" className="mb-1">
                    <Label className="form-label" for="serviceId">
                      خدمت
                    </Label>
                    <AsyncPaginate
                      value={updateCommisionController.values.serviceId}
                      loadOptions={getSelectService}
                      onChange={(value) =>
                        updateCommisionController.setFieldValue(
                          "serviceId",
                          value
                        )
                      }
                      additional={{
                        page: 1,
                      }}
                      loadingMessage={() => "در حال بارگذاری . . ."}
                      closeMenuOnSelect={true}
                      theme={selectThemeColors}
                      isClearable={false}
                      isDisabled={!updateCommisionController.values.operatorId}
                      cacheUniqs={[updateCommisionController.values.operatorId]}
                      placeholder="خدمت را انتخاب کنید"
                      className={`react-select ${
                        updateCommisionController.touched.serviceId &&
                        updateCommisionController.errors.serviceId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="serviceId"
                      name="serviceId"
                    />
                    {updateCommisionController.touched.serviceId &&
                    updateCommisionController.errors.serviceId ? (
                      <FormFeedback style={{ display: "block" }}>
                        انتخاب حداقل یک خدمت اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                ) : null}
                {/* price */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="price">
                    مبلغ (تومان)
                  </Label>
                  <Input
                    value={updateCommisionController.values.price}
                    onChange={updateCommisionController.handleChange}
                    type="number"
                    id="price"
                    name="price"
                    placeholder="مبلغ را به تومان وارد کنید"
                    invalid={
                      updateCommisionController.touched.price
                        ? updateCommisionController.errors.price
                        : null
                    }
                  />
                  {updateCommisionController.touched.price &&
                  updateCommisionController.errors.price ? (
                    <FormFeedback>
                      {updateCommisionController.errors.price}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* active */}
                <Col
                  xs="12"
                  sm="6"
                  md="3"
                  className="mb-1 d-flex align-items-center"
                >
                  <div className="form-switch p-0 m-0">
                    <div className="d-flex">
                      <Input
                        type="switch"
                        id="rtl"
                        className="m-0 p-0"
                        name="RTL"
                        checked={updateCommisionController.values.active}
                        onChange={(e) => {
                          updateCommisionController.setFieldValue(
                            "active",
                            e.target.checked
                          );
                        }}
                      />
                      <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                        کمیسیون فعال باشد
                      </Label>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateCommision}
                type="submit"
                color="primary"
                style={{ minWidth: 150 }}
              >
                ثبت
              </CustomButton>
            </CardFooter>
          </Card>
        </Form>
      ) : null}
    </Fragment>
  );
};
export default UpdateCommision;
