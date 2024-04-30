import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useOffer from "../../../hooks/use_offer";
import CustomLoading from "../../../components/loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "jalali-moment";
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
  Button,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import toast from "react-hot-toast";
import CustomButton from "../../../components/button";
import CustomDatePicker from "../../../components/datepicker";

const UpdateAd = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getOfferById,
    getOperators,
    updateOfferController,
    viewOfferData,
    operatorsList,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  } = useOffer();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getOfferById(entity_id);
      updateOfferController.setFieldValue("offer_id", entity_id);
    } else {
      navigate("/offer/all");
    }
  }, []);

  useEffect(() => {
    if (viewOfferData) {
      updateOfferController.setFieldValue(
        "offerName",
        viewOfferData?.offerName
      );
      updateOfferController.setFieldValue(
        "offerCode",
        viewOfferData?.offerCode
      );
      if (viewOfferData?.price) {
        updateOfferController.setFieldValue("offerValue", viewOfferData?.price);
        updateOfferController.setFieldValue("type", 0);
      } else if (viewOfferData?.percent) {
        updateOfferController.setFieldValue(
          "offerValue",
          viewOfferData?.percent
        );
        updateOfferController.setFieldValue("type", 1);
      }
      if (viewOfferData?.operator) {
        updateOfferController.setFieldValue("operatorId", {
          label: viewOfferData?.operator?.name,
          value: viewOfferData?.operator?.id,
        });
      }
      if (viewOfferData?.startDate) {
        updateOfferController.setFieldValue("startDate", {
          year: parseFloat(
            moment(viewOfferData?.startDate).locale("fa").format("YYYY")
          ),
          month: parseFloat(
            moment(viewOfferData?.startDate).locale("fa").format("MM")
          ),
          day: parseFloat(
            moment(viewOfferData?.startDate).locale("fa").format("DD")
          ),
        });
      }
      if (viewOfferData?.endDate) {
        updateOfferController.setFieldValue("endDate", {
          year: parseFloat(
            moment(viewOfferData?.endDate).locale("fa").format("YYYY")
          ),
          month: parseFloat(
            moment(viewOfferData?.endDate).locale("fa").format("MM")
          ),
          day: parseFloat(
            moment(viewOfferData?.endDate).locale("fa").format("DD")
          ),
        });
      }
    }
  }, [viewOfferData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش تخفیف"
        data={[{ title: "داشبورد" }, { title: "ویرایش تخفیف" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      <Form onSubmit={updateOfferController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ویرایش تخفیف</CardTitle>
          </CardHeader>
          {/* form fields */}
          <CardBody className="pt-2">
            <Row>
              {/* offerName */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="offerName">
                  نام تخفیف
                </Label>
                <Input
                  value={updateOfferController.values.offerName}
                  onChange={updateOfferController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="offerName"
                  name="offerName"
                  placeholder="نام تخفیف را وارد کنید"
                  invalid={
                    updateOfferController.touched.offerName
                      ? updateOfferController.errors.offerName
                      : null
                  }
                />
                {updateOfferController.touched.offerName &&
                updateOfferController.errors.offerName ? (
                  <FormFeedback>
                    {updateOfferController.errors.offerName}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* offerCode */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="offerCode">
                  کد تخفیف
                </Label>
                <Input
                  value={updateOfferController.values.offerCode}
                  onChange={updateOfferController.handleChange}
                  type="text"
                  id="offerCode"
                  name="offerCode"
                  placeholder="کد تخفیف را وارد کنید"
                  invalid={
                    updateOfferController.touched.offerCode
                      ? updateOfferController.errors.offerCode
                      : null
                  }
                />
                {updateOfferController.touched.offerCode &&
                updateOfferController.errors.offerCode ? (
                  <FormFeedback>
                    {updateOfferController.errors.offerCode}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* price or percent */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="offerName">
                  مقدار تخفیف (
                  {updateOfferController.values.type === 0 ? "مبلغ" : "درصد"})
                </Label>
                <div className="position-relative d-flex align-items-center">
                  <Input
                    value={updateOfferController.values.offerValue}
                    onChange={(e) => {
                      if (updateOfferController.values.type === 1) {
                        if (e.target.value.length > 2) {
                          toast.error("حداکثر درصد تخفیف ۹۹ درصد است.");
                        } else {
                          updateOfferController.setFieldValue(
                            "offerValue",
                            e.target.value
                          );
                        }
                      } else {
                        updateOfferController.setFieldValue(
                          "offerValue",
                          e.target.value
                        );
                      }
                    }}
                    type="number"
                    max={updateOfferController.values.type === 1 ? 100 : null}
                    id="offerValue"
                    name="offerValue"
                    placeholder={`${
                      updateOfferController.values.type === 0 ? "مبلغ" : "درصد"
                    } تخفیف را وارد کنید`}
                    invalid={
                      updateOfferController.touched.offerValue
                        ? updateOfferController.errors.offerValue
                        : null
                    }
                  />
                  <Button
                    style={{ position: "absolute", left: 32 }}
                    size="sm"
                    onClick={() => {
                      updateOfferController.setFieldValue("offerValue", "");
                      if (updateOfferController.values.type === 0) {
                        updateOfferController.setFieldValue("type", 1);
                      } else {
                        updateOfferController.setFieldValue("type", 0);
                      }
                    }}
                  >
                    {updateOfferController.values.type === 0
                      ? "به درصد"
                      : "به مبلغ"}
                  </Button>
                </div>
                {updateOfferController.touched.offerValue &&
                updateOfferController.errors.offerValue ? (
                  <FormFeedback style={{ display: "block" }}>
                    {updateOfferController.errors.offerValue}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* startDate */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="startDate">
                  تاریخ شروع
                </Label>
                <CustomDatePicker
                  maximumDate={updateOfferController.values.endDate}
                  inputName="startDate"
                  inputClassName={
                    updateOfferController.touched.startDate &&
                    updateOfferController.errors.startDate
                      ? "form_error"
                      : ""
                  }
                  value={updateOfferController.values.startDate}
                  onChange={(value) => {
                    updateOfferController.setFieldValue("startDate", value);
                  }}
                  inputPlaceholder="انتخاب تاریخ"
                />
                {updateOfferController.touched.startDate &&
                updateOfferController.errors.startDate ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد تاریخ شروع اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* endDate */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="endDate">
                  تاریخ پایان
                </Label>
                <CustomDatePicker
                  minimumDate={updateOfferController.values.startDate}
                  inputName="endDate"
                  inputClassName={
                    updateOfferController.touched.endDate &&
                    updateOfferController.errors.endDate
                      ? "form_error"
                      : ""
                  }
                  value={updateOfferController.values.endDate}
                  onChange={(value) => {
                    updateOfferController.setFieldValue("endDate", value);
                  }}
                  inputPlaceholder="انتخاب تاریخ"
                />
                {updateOfferController.touched.endDate &&
                updateOfferController.errors.endDate ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد تاریخ پایان اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* operatorId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="operatorId">
                  اپراتور
                </Label>
                <Select
                  value={updateOfferController.values.operatorId}
                  onChange={(value) =>
                    updateOfferController.setFieldValue("operatorId", value)
                  }
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    updateOfferController.touched.operatorId &&
                    updateOfferController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {updateOfferController.touched.operatorId &&
                updateOfferController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.updateOffer}
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

export default UpdateAd;
