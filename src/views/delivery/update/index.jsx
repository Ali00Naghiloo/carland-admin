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
import useDelivery from "../../../hooks/use_delivery";

const UpdateDelivery = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getDeliveryById,
    getProvinces,
    getUpdateCities,
    viewDeliveryData,
    updateDeliveryController,
    loadings,
    getByIdLoading,
  } = useDelivery();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getDeliveryById(entity_id);
      updateDeliveryController.setFieldValue("id", entity_id);
    } else {
      navigate("/delivery/all");
    }
  }, []);

  useEffect(() => {
    if (viewDeliveryData) {
      if (viewDeliveryData?.provinces) {
        updateDeliveryController.setFieldValue("provincesId", {
          label: viewDeliveryData?.provinces?.name,
          value: viewDeliveryData?.provinces?.id,
        });
      }
      if (viewDeliveryData?.cities) {
        updateDeliveryController.setFieldValue("citiesId", {
          label: viewDeliveryData?.cities?.name,
          value: viewDeliveryData?.cities?.id,
        });
      }
      if (viewDeliveryData?.price) {
        updateDeliveryController.setFieldValue(
          "price",
          viewDeliveryData?.price
        );
      }
      updateDeliveryController.setFieldValue(
        "is_active",
        viewDeliveryData?.is_active
      );
    }
  }, [viewDeliveryData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش تعرفه ارسال"
        data={[{ title: "داشبورد" }, { title: "ویرایش تعرفه ارسال" }]}
      />
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateDeliveryController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش تعرفه ارسال</CardTitle>
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
                    value={updateDeliveryController.values.provincesId}
                    loadOptions={getProvinces}
                    onChange={(value) => {
                      updateDeliveryController.setFieldValue(
                        "provincesId",
                        value
                      );
                      updateDeliveryController.setFieldValue("citiesId", null);
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
                      updateDeliveryController.touched.provincesId &&
                      updateDeliveryController.errors.provincesId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="provincesId"
                    name="provincesId"
                  />
                  {updateDeliveryController.touched.provincesId &&
                  updateDeliveryController.errors.provincesId ? (
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
                    value={updateDeliveryController.values.citiesId}
                    loadOptions={getUpdateCities}
                    onChange={(value) =>
                      updateDeliveryController.setFieldValue("citiesId", value)
                    }
                    additional={{
                      page: 1,
                    }}
                    cacheUniqs={[updateDeliveryController.values.provincesId]}
                    isDisabled={!updateDeliveryController.values.provincesId}
                    loadingMessage={() => "در حال بارگذاری . . ."}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="شهر را انتخاب کنید"
                    className={`react-select ${
                      updateDeliveryController.touched.citiesId &&
                      updateDeliveryController.errors.citiesId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="citiesId"
                    name="citiesId"
                  />
                  {updateDeliveryController.touched.citiesId &&
                  updateDeliveryController.errors.citiesId ? (
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
                    value={updateDeliveryController.values.price}
                    onChange={updateDeliveryController.handleChange}
                    type="number"
                    id="price"
                    name="price"
                    placeholder="هزینه ی ارسال را به تومان وارد کنید"
                    invalid={
                      updateDeliveryController.touched.price
                        ? updateDeliveryController.errors.price
                        : null
                    }
                  />
                  {updateDeliveryController.touched.price &&
                  updateDeliveryController.errors.price ? (
                    <FormFeedback>
                      {updateDeliveryController.errors.price}
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
                        checked={updateDeliveryController.values.is_active}
                        onChange={(e) => {
                          updateDeliveryController.setFieldValue(
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
                loading={loadings.updateDelivery}
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
export default UpdateDelivery;
