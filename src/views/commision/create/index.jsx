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
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useCommision from "../../../hooks/use_commision";

const CreateCommision = () => {
  const {
    getSelectGrade,
    getOperators,
    getSelectProduct,
    getSelectService,
    createCommisionController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useCommision();

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد کمیسیون جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد کمیسیون جدید" }]}
      />
      <Form onSubmit={createCommisionController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد کمیسیون جدید</CardTitle>
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
                  value={createCommisionController.values.gradeId}
                  loadOptions={getSelectGrade}
                  onChange={(value) =>
                    createCommisionController.setFieldValue("gradeId", value)
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
                    createCommisionController.touched.gradeId &&
                    createCommisionController.errors.gradeId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="gradeId"
                  name="gradeId"
                />
                {createCommisionController.touched.gradeId &&
                createCommisionController.errors.gradeId ? (
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
                  value={createCommisionController.values.operatorId}
                  onChange={(value) => {
                    createCommisionController.setFieldValue(
                      "operatorId",
                      value
                    );
                    createCommisionController.setFieldValue("productId", []);
                    createCommisionController.setFieldValue("serviceId", []);
                  }}
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    createCommisionController.touched.operatorId &&
                    createCommisionController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createCommisionController.touched.operatorId &&
                createCommisionController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* productId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="productId">
                  محصول
                </Label>
                <AsyncPaginate
                  isMulti={true}
                  value={createCommisionController.values.productId}
                  loadOptions={getSelectProduct}
                  onChange={(value) =>
                    createCommisionController.setFieldValue("productId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isDisabled={!createCommisionController.values.operatorId}
                  cacheUniqs={[createCommisionController.values.operatorId]}
                  isClearable={false}
                  placeholder="محصول را انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="productId"
                  name="productId"
                />
              </Col>
              {/* serviceId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="serviceId">
                  خدمت
                </Label>
                <AsyncPaginate
                  isMulti={true}
                  value={createCommisionController.values.serviceId}
                  loadOptions={getSelectService}
                  onChange={(value) =>
                    createCommisionController.setFieldValue("serviceId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  isDisabled={!createCommisionController.values.operatorId}
                  cacheUniqs={[createCommisionController.values.operatorId]}
                  placeholder="خدمت را انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="serviceId"
                  name="serviceId"
                />
              </Col>
              {/* price */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="price">
                  مبلغ (تومان)
                </Label>
                <Input
                  value={createCommisionController.values.price}
                  onChange={createCommisionController.handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="مبلغ را به تومان وارد کنید"
                  invalid={
                    createCommisionController.touched.price
                      ? createCommisionController.errors.price
                      : null
                  }
                />
                {createCommisionController.touched.price &&
                createCommisionController.errors.price ? (
                  <FormFeedback>
                    {createCommisionController.errors.price}
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
                      checked={createCommisionController.values.active}
                      onChange={(e) => {
                        createCommisionController.setFieldValue(
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
              loading={loadings.createCommision}
              type="submit"
              color="primary"
              style={{ minWidth: 150 }}
            >
              ثبت
            </CustomButton>
          </CardFooter>
        </Card>
      </Form>
    </Fragment>
  );
};
export default CreateCommision;
