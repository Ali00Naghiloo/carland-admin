import { Fragment, useEffect, useState } from "react";
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
import CustomButton from "../../../../components/button";
import useSimcardNumber from "../../../../hooks/use_simcard_number";
import toast from "react-hot-toast";
import formatHelper from "../../../../helper/format_helper";

const CreateSimcardWithNumber = () => {
  const {
    getOperators,
    getNumberLabels,
    getSelectCategories,
    createSimcardNumberController,
    operatorsList,
    numberLabelsList,
    loadings,
    getOperatorsLoading,
    getNumberLabelsLoading,
    getNumberTypes,
    numberTypesList,
    getNumberTypesLoading,
    getSelectPlans,
  } = useSimcardNumber();

  const [numberValue, setNumberValue] = useState("");
  const [serialValue, setSerialValue] = useState("");
  const [labelShowNumber, setLabelShowNumber] = useState("");

  useEffect(() => {
    getOperators();
    getNumberTypes();
    getNumberLabels();
  }, []);

  useEffect(() => {
    if (numberValue.length === 11) {
      setLabelShowNumber(
        numberValue.substring(0, 4) +
          "-" +
          numberValue.substring(4, 7) +
          "-" +
          numberValue.substring(7, 11)
      );
    }
  }, [numberValue]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد سیمکارت با شماره جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد سیمکارت با شماره جدید" }]}
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (numberValue.length === 11 && serialValue.length > 0) {
            let array = [...createSimcardNumberController.values.number];
            if (array.find((num) => num.number === numberValue)) {
              toast.error("شماره تلفن قبلا در لیست اضافه شده است.");
            } else {
              array.push({
                number: numberValue,
                serial: serialValue,
                ShowLabelNumber: labelShowNumber,
              });
              createSimcardNumberController.setFieldValue("number", array);
              setNumberValue("");
              setSerialValue("");
              setLabelShowNumber("");
            }
          }
          createSimcardNumberController.handleSubmit();
        }}
      >
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد سیمکارت با شماره جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* operatorId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="operatorId">
                  اپراتور
                </Label>
                <Select
                  value={createSimcardNumberController.values.operatorId}
                  onChange={(value) =>
                    createSimcardNumberController.setFieldValue(
                      "operatorId",
                      value
                    )
                  }
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    createSimcardNumberController.touched.operatorId &&
                    createSimcardNumberController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createSimcardNumberController.touched.operatorId &&
                createSimcardNumberController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* typeId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="typeId">
                  نوع سیمکارت
                </Label>
                <Select
                  value={createSimcardNumberController.values.typeId}
                  onChange={(value) =>
                    createSimcardNumberController.setFieldValue("typeId", value)
                  }
                  isLoading={getNumberTypesLoading}
                  noOptionsMessage={() => " نوع سیمکارتی یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getNumberTypesLoading}
                  placeholder="نوع سیمکارت را انتخاب کنید"
                  options={numberTypesList}
                  className={`react-select ${
                    createSimcardNumberController.touched.typeId &&
                    createSimcardNumberController.errors.typeId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="typeId"
                  name="typeId"
                />
                {createSimcardNumberController.touched.typeId &&
                createSimcardNumberController.errors.typeId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد نوع سیمکارت اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* labelNumberId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="labelNumberId">
                  برچسب سیمکارت
                </Label>
                <Select
                  value={createSimcardNumberController.values.labelNumberId}
                  onChange={(value) =>
                    createSimcardNumberController.setFieldValue(
                      "labelNumberId",
                      value
                    )
                  }
                  isLoading={getNumberLabelsLoading}
                  noOptionsMessage={() => " برچسب سیمکارتی یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getNumberLabelsLoading}
                  placeholder="برچسب سیمکارت را انتخاب کنید"
                  options={numberLabelsList}
                  className={`react-select ${
                    createSimcardNumberController.touched.labelNumberId &&
                    createSimcardNumberController.errors.labelNumberId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="labelNumberId"
                  name="labelNumberId"
                />
                {createSimcardNumberController.touched.labelNumberId &&
                createSimcardNumberController.errors.labelNumberId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد برچسب سیمکارت اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* planId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="planId">
                  طرح
                </Label>
                <AsyncPaginate
                  value={createSimcardNumberController.values.planId}
                  loadOptions={getSelectPlans}
                  onChange={(value) =>
                    createSimcardNumberController.setFieldValue("planId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="طرح را انتخاب کنید"
                  className={`react-select ${
                    createSimcardNumberController.touched.planId &&
                    createSimcardNumberController.errors.planId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="planId"
                  name="planId"
                />
                {createSimcardNumberController.touched.planId &&
                createSimcardNumberController.errors.planId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد طرح اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* price */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="price">
                  قیمت (تومان)
                </Label>
                <Input
                  value={createSimcardNumberController.values.price}
                  onChange={createSimcardNumberController.handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="قیمت را به تومان وارد کنید"
                  invalid={
                    createSimcardNumberController.touched.price
                      ? createSimcardNumberController.errors.price
                      : null
                  }
                />
                {createSimcardNumberController.touched.price &&
                createSimcardNumberController.errors.price ? (
                  <FormFeedback>
                    {createSimcardNumberController.errors.price}
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
                      checked={createSimcardNumberController.values.active}
                      onChange={(e) => {
                        createSimcardNumberController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      شماره تلفن فعال باشد
                    </Label>
                  </div>
                </div>
              </Col>
              {/* ---------------------- numbers form ------------------- */}
              {/* number */}
              <Col xs="12" className="mb-1">
                <Label for="number">شماره تلفن</Label>
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                  <Input
                    value={numberValue}
                    onChange={(e) => setNumberValue(e.target.value)}
                    type="number"
                    id="number"
                    name="number"
                    placeholder="شماره تلفن"
                  />
                  <Input
                    style={{ margin: "0 8px" }}
                    value={labelShowNumber}
                    onChange={(e) => setLabelShowNumber(e.target.value)}
                    type="text"
                    id="numberLabel"
                    name="numberLabel"
                    className="mt-1 mb-sm-0 mt-sm-0"
                    placeholder="فرمت نمایش"
                  />
                  <Input
                    value={serialValue}
                    onChange={(e) => setSerialValue(e.target.value)}
                    type="number"
                    id="serial"
                    name="serial"
                    className="mb-1 mb-sm-0 mt-1 mt-sm-0"
                    placeholder="سریال سیمکارت"
                  />
                  <CustomButton
                    onClick={() => {
                      if (numberValue.length !== 11) {
                        toast.error("شماره تلفن باید ۱۱ رقم باشد");
                      } else if (serialValue.length === 0) {
                        toast.error("سریال سیمکارت را وارد کنید");
                      } else {
                        let array = [
                          ...createSimcardNumberController.values.number,
                        ];
                        if (array.find((num) => num.number === numberValue)) {
                          toast.error("شماره تلفن قبلا در لیست اضافه شده است.");
                        } else {
                          array.push({
                            number: numberValue,
                            serial: serialValue,
                            ShowLabelNumber: labelShowNumber,
                          });
                          createSimcardNumberController.setFieldValue(
                            "number",
                            array
                          );
                          setNumberValue("");
                          setSerialValue("");
                          setLabelShowNumber("");
                        }
                      }
                    }}
                    className="d-sm-block"
                    color="primary"
                  >
                    +
                  </CustomButton>
                </div>
              </Col>
              {/* added numbers list */}
              <Col xs="12">
                {createSimcardNumberController.values.number.map(
                  (item, index) => (
                    <div
                      key={index}
                      style={
                        index !==
                        createSimcardNumberController.values.number.length - 1
                          ? {
                              borderBottom: "1px solid rgb(160,160,160)",
                              padding: "12px 5px",
                            }
                          : { border: "none", padding: "12px 5px" }
                      }
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div className="mr-2">
                        {formatHelper.toPersianString(index + 1)} -{" "}
                        {formatHelper.toPersianString(item.number)} ------------
                        ({formatHelper.toPersianString(item.ShowLabelNumber)})
                        ------------
                        {" سریال سیمکارت : " +
                          formatHelper.toPersianString(item.serial)}
                      </div>
                      <div
                        style={{ cursor: "pointer", fontSize: 18 }}
                        onClick={() => {
                          createSimcardNumberController.setFieldValue(
                            "number",
                            createSimcardNumberController.values.number.filter(
                              (it) => it !== item
                            )
                          );
                        }}
                      >
                        x
                      </div>
                    </div>
                  )
                )}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createSimcardNumber}
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
export default CreateSimcardWithNumber;
