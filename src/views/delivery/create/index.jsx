import { Fragment } from "react";
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
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useDelivery from "../../../hooks/use_delivery";

const CreateDelivery = () => {
  const { getProvinces, getCities, createDeliveryController, loadings } =
    useDelivery();

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد تعرفه ارسال جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد تعرفه ارسال جدید" }]}
      />
      <Form onSubmit={createDeliveryController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد تعرفه ارسال جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* provincesId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="provincesId">
                  استان
                </Label>
                <AsyncPaginate
                  value={createDeliveryController.values.provincesId}
                  loadOptions={getProvinces}
                  onChange={(value) => {
                    createDeliveryController.setFieldValue(
                      "provincesId",
                      value
                    );
                    createDeliveryController.setFieldValue("citiesId", null);
                  }}
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="استان را انتخاب کنید"
                  className={`react-select ${
                    createDeliveryController.touched.provincesId &&
                    createDeliveryController.errors.provincesId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="provincesId"
                  name="provincesId"
                />
                {createDeliveryController.touched.provincesId &&
                createDeliveryController.errors.provincesId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد استان اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* citiesId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="citiesId">
                  شهر
                </Label>
                <AsyncPaginate
                  value={createDeliveryController.values.citiesId}
                  loadOptions={getCities}
                  onChange={(value) =>
                    createDeliveryController.setFieldValue("citiesId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  cacheUniqs={[createDeliveryController.values.provincesId]}
                  isDisabled={!createDeliveryController.values.provincesId}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="شهر را انتخاب کنید"
                  className={`react-select ${
                    createDeliveryController.touched.citiesId &&
                    createDeliveryController.errors.citiesId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="citiesId"
                  name="citiesId"
                />
                {createDeliveryController.touched.citiesId &&
                createDeliveryController.errors.citiesId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد شهر اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* price */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="price">
                  هزینه ی ارسال (تومان)
                </Label>
                <Input
                  value={createDeliveryController.values.price}
                  onChange={createDeliveryController.handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="هزینه ی ارسال را به تومان وارد کنید"
                  invalid={
                    createDeliveryController.touched.price
                      ? createDeliveryController.errors.price
                      : null
                  }
                />
                {createDeliveryController.touched.price &&
                createDeliveryController.errors.price ? (
                  <FormFeedback>
                    {createDeliveryController.errors.price}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* is_active */}
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
                      checked={createDeliveryController.values.is_active}
                      onChange={(e) => {
                        createDeliveryController.setFieldValue(
                          "is_active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      تعرفه فعال باشد
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
              loading={loadings.createDelivery}
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
export default CreateDelivery;
