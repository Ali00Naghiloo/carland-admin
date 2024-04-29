import { Fragment, useEffect, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useOffer from "../../../hooks/use_offer";
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
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CustomButton from "../../../components/button";
import CustomDatePicker from "../../../components/datepicker";

const CreateOffer = () => {
  const {
    getOperators,
    createOfferController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useOffer();

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد تخفیف جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد تخفیف جدید" }]}
      />
      <Form onSubmit={createOfferController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد تخفیف جدید</CardTitle>
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
                  value={createOfferController.values.offerName}
                  onChange={createOfferController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="offerName"
                  name="offerName"
                  placeholder="نام تخفیف را وارد کنید"
                  invalid={
                    createOfferController.touched.offerName
                      ? createOfferController.errors.offerName
                      : null
                  }
                />
                {createOfferController.touched.offerName &&
                createOfferController.errors.offerName ? (
                  <FormFeedback>
                    {createOfferController.errors.offerName}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* offerCode */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="offerCode">
                  کد تخفیف
                </Label>
                <Input
                  value={createOfferController.values.offerCode}
                  onChange={createOfferController.handleChange}
                  type="text"
                  id="offerCode"
                  name="offerCode"
                  placeholder="کد تخفیف را وارد کنید"
                  invalid={
                    createOfferController.touched.offerCode
                      ? createOfferController.errors.offerCode
                      : null
                  }
                />
                {createOfferController.touched.offerCode &&
                createOfferController.errors.offerCode ? (
                  <FormFeedback>
                    {createOfferController.errors.offerCode}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* price or percent */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="offerName">
                  مقدار تخفیف (
                  {createOfferController.values.type === 0 ? "مبلغ" : "درصد"})
                </Label>
                <div className="position-relative d-flex align-items-center">
                  <Input
                    value={createOfferController.values.offerValue}
                    onChange={(e) => {
                      if (createOfferController.values.type === 1) {
                        if (e.target.value.length > 2) {
                          toast.error("حداکثر درصد تخفیف ۹۹ درصد است.");
                        } else {
                          createOfferController.setFieldValue(
                            "offerValue",
                            e.target.value
                          );
                        }
                      } else {
                        createOfferController.setFieldValue(
                          "offerValue",
                          e.target.value
                        );
                      }
                    }}
                    type="number"
                    max={createOfferController.values.type === 1 ? 100 : null}
                    id="offerValue"
                    name="offerValue"
                    placeholder={`${
                      createOfferController.values.type === 0 ? "مبلغ" : "درصد"
                    } تخفیف را وارد کنید`}
                    invalid={
                      createOfferController.touched.offerValue
                        ? createOfferController.errors.offerValue
                        : null
                    }
                  />
                  <Button
                    style={{ position: "absolute", left: 32 }}
                    size="sm"
                    onClick={() => {
                      createOfferController.setFieldValue("offerValue", "");
                      if (createOfferController.values.type === 0) {
                        createOfferController.setFieldValue("type", 1);
                      } else {
                        createOfferController.setFieldValue("type", 0);
                      }
                    }}
                  >
                    {createOfferController.values.type === 0
                      ? "به درصد"
                      : "به مبلغ"}
                  </Button>
                </div>
                {createOfferController.touched.offerValue &&
                createOfferController.errors.offerValue ? (
                  <FormFeedback style={{ display: "block" }}>
                    {createOfferController.errors.offerValue}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* startDate */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="startDate">
                  تاریخ شروع
                </Label>
                <CustomDatePicker
                  maximumDate={createOfferController.values.endDate}
                  inputName="startDate"
                  inputClassName={
                    createOfferController.touched.startDate &&
                    createOfferController.errors.startDate
                      ? "form_error"
                      : ""
                  }
                  value={createOfferController.values.startDate}
                  onChange={(value) => {
                    createOfferController.setFieldValue("startDate", value);
                  }}
                  inputPlaceholder="انتخاب تاریخ"
                />
                {createOfferController.touched.startDate &&
                createOfferController.errors.startDate ? (
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
                  minimumDate={createOfferController.values.startDate}
                  inputName="endDate"
                  inputClassName={
                    createOfferController.touched.endDate &&
                    createOfferController.errors.endDate
                      ? "form_error"
                      : ""
                  }
                  value={createOfferController.values.endDate}
                  onChange={(value) => {
                    createOfferController.setFieldValue("endDate", value);
                  }}
                  inputPlaceholder="انتخاب تاریخ"
                />
                {createOfferController.touched.endDate &&
                createOfferController.errors.endDate ? (
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
                  value={createOfferController.values.operatorId}
                  onChange={(value) =>
                    createOfferController.setFieldValue("operatorId", value)
                  }
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    createOfferController.touched.operatorId &&
                    createOfferController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createOfferController.touched.operatorId &&
                createOfferController.errors.operatorId ? (
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
              loading={loadings.createOffer}
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

export default CreateOffer;
