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
import CustomButton from "../../../components/button";
import useSourcNumber from "../../../hooks/use_source_number";
import toast from "react-hot-toast";
import formatHelper from "../../../helper/format_helper";

const CreateSourceNumber = () => {
  const {
    getOperators,
    getNumberLabels,
    getSelectCategories,
    createSourceNumberController,
    operatorsList,
    numberLabelsList,
    loadings,
    getOperatorsLoading,
    getNumberLabelsLoading,
    getNumberTypes,
    numberTypesList,
    getNumberTypesLoading,
    getSelectPlans,
  } = useSourcNumber();

  const [numberValue, setNumberValue] = useState("");
  const [labelShowNumber, setLabelShowNumber] = useState("");
  const [isAuto, setIsAuto] = useState(false);

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
      if (isAuto) {
        let array = [...createSourceNumberController.values.number];
        if (array.find((num) => num.number === numberValue)) {
          toast.error("شماره تلفن قبلا در لیست اضافه شده است.");
        } else {
          array.push({
            number: numberValue,
            labelShowNumber:
              numberValue.substring(0, 4) +
              "-" +
              numberValue.substring(4, 7) +
              "-" +
              numberValue.substring(7, 11),
          });
          createSourceNumberController.setFieldValue("number", array);
          setNumberValue("");
          setLabelShowNumber("");
        }
      }
    }
  }, [numberValue]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد شماره تلفن جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد شماره تلفن جدید" }]}
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (numberValue.length === 11) {
            let array = [...createSourceNumberController.values.number];
            if (array.find((num) => num.number === numberValue)) {
              toast.error("شماره تلفن قبلا در لیست اضافه شده است.");
            } else {
              array.push({
                number: numberValue,
                labelShowNumber: labelShowNumber,
              });
              createSourceNumberController.setFieldValue("number", array);
              setNumberValue("");
              setLabelShowNumber("");
            }
          }
          createSourceNumberController.handleSubmit();
        }}
      >
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد شماره تلفن جدید</CardTitle>
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
                  value={createSourceNumberController.values.operatorId}
                  onChange={(value) =>
                    createSourceNumberController.setFieldValue(
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
                    createSourceNumberController.touched.operatorId &&
                    createSourceNumberController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createSourceNumberController.touched.operatorId &&
                createSourceNumberController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* typeNumberId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="typeNumberId">
                  نوع سیمکارت
                </Label>
                <Select
                  value={createSourceNumberController.values.typeNumberId}
                  onChange={(value) =>
                    createSourceNumberController.setFieldValue(
                      "typeNumberId",
                      value
                    )
                  }
                  isLoading={getNumberTypesLoading}
                  noOptionsMessage={() => " نوع سیمکارتی یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getNumberTypesLoading}
                  placeholder="نوع سیمکارت را انتخاب کنید"
                  options={numberTypesList}
                  className={`react-select ${
                    createSourceNumberController.touched.typeNumberId &&
                    createSourceNumberController.errors.typeNumberId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="typeNumberId"
                  name="typeNumberId"
                />
                {createSourceNumberController.touched.typeNumberId &&
                createSourceNumberController.errors.typeNumberId ? (
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
                  value={createSourceNumberController.values.labelNumberId}
                  onChange={(value) =>
                    createSourceNumberController.setFieldValue(
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
                    createSourceNumberController.touched.labelNumberId &&
                    createSourceNumberController.errors.labelNumberId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="labelNumberId"
                  name="labelNumberId"
                />
                {createSourceNumberController.touched.labelNumberId &&
                createSourceNumberController.errors.labelNumberId ? (
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
                  value={createSourceNumberController.values.planId}
                  loadOptions={getSelectPlans}
                  onChange={(value) =>
                    createSourceNumberController.setFieldValue("planId", value)
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
                    createSourceNumberController.touched.planId &&
                    createSourceNumberController.errors.planId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="planId"
                  name="planId"
                />
                {createSourceNumberController.touched.planId &&
                createSourceNumberController.errors.planId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد طرح اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* categoryId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="categoryId">
                  دسته بندی
                </Label>
                <AsyncPaginate
                  value={createSourceNumberController.values.categoryId}
                  loadOptions={getSelectCategories}
                  onChange={(value) =>
                    createSourceNumberController.setFieldValue(
                      "categoryId",
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
                  placeholder="دسته بندی را انتخاب کنید"
                  className={`react-select ${
                    createSourceNumberController.touched.categoryId &&
                    createSourceNumberController.errors.categoryId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="categoryId"
                  name="categoryId"
                />
                {createSourceNumberController.touched.categoryId &&
                createSourceNumberController.errors.categoryId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد دسته بندی اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* price */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="price">
                  قیمت (تومان)
                </Label>
                <Input
                  value={createSourceNumberController.values.price}
                  onChange={createSourceNumberController.handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="قیمت را به تومان وارد کنید"
                  invalid={
                    createSourceNumberController.touched.price
                      ? createSourceNumberController.errors.price
                      : null
                  }
                />
                {createSourceNumberController.touched.price &&
                createSourceNumberController.errors.price ? (
                  <FormFeedback>
                    {createSourceNumberController.errors.price}
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
                      checked={createSourceNumberController.values.active}
                      onChange={(e) => {
                        createSourceNumberController.setFieldValue(
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
                <Label
                  className="form-label d-flex align-items-center justify-content-between mb-1"
                  for="number"
                >
                  <span>شماره تلفن</span>
                  <div className="form-switch p-0 m-0">
                    <div className="d-flex align-items-center">
                      <Label
                        style={{ paddingTop: 3, paddingLeft: 8 }}
                        htmlFor="isAuto"
                      >
                        افزودن خودکار
                      </Label>
                      <Input
                        type="switch"
                        id="isAuto"
                        className="m-0 p-0"
                        name="isAuto"
                        checked={isAuto}
                        onChange={() => setIsAuto(!isAuto)}
                      />
                    </div>
                  </div>
                </Label>
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
                    className="mb-1 mt-1 mb-sm-0 mt-sm-0"
                    placeholder="فرمت نمایش"
                  />
                  <CustomButton
                    onClick={() => {
                      if (numberValue.length !== 11) {
                        toast.error("شماره تلفن باید ۱۱ رقم باشد");
                      } else {
                        let array = [
                          ...createSourceNumberController.values.number,
                        ];
                        if (array.find((num) => num.number === numberValue)) {
                          toast.error("شماره تلفن قبلا در لیست اضافه شده است.");
                        } else {
                          array.push({
                            number: numberValue,
                            labelShowNumber: labelShowNumber,
                          });
                          createSourceNumberController.setFieldValue(
                            "number",
                            array
                          );
                          setNumberValue("");
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
                {createSourceNumberController.values.number.map(
                  (item, index) => (
                    <div
                      key={index}
                      style={
                        index !==
                        createSourceNumberController.values.number.length - 1
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
                        ({formatHelper.toPersianString(item.labelShowNumber)})
                      </div>
                      <div
                        style={{ cursor: "pointer", fontSize: 18 }}
                        onClick={() => {
                          createSourceNumberController.setFieldValue(
                            "number",
                            createSourceNumberController.values.number.filter(
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
              loading={loadings.createSourceNumber}
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
export default CreateSourceNumber;
