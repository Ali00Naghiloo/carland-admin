import { Fragment, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "@components/breadcrumbs";
import useSimcardNumber from "../../../../hooks/use_simcard_number";
import CustomLoading from "../../../../components/loading";
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

const UpdateSimcardWithNumber = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getSimcardNumberById,
    updateSimcardNumberControllers,
    viewSimcardNumberData,
    getOperators,
    getOperatorsLoading,
    operatorsList,
    getNumberTypes,
    getNumberTypesLoading,
    numberTypesList,
    getNumberLabels,
    numberLabelsList,
    getNumberLabelsLoading,
    getSelectPlans,
    getSelectCategories,
    loadings,
    getByIdLoading,
  } = useSimcardNumber();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getSimcardNumberById(entity_id);
      getOperators();
      getNumberTypes();
      getNumberLabels();
      updateSimcardNumberControllers.setFieldValue("id", entity_id);
    } else {
      navigate("/source_number/all");
    }
  }, []);

  useEffect(() => {
    if (viewSimcardNumberData) {
      updateSimcardNumberControllers.setFieldValue(
        "number",
        viewSimcardNumberData?.number
      );
      updateSimcardNumberControllers.setFieldValue(
        "showLabelNumber",
        viewSimcardNumberData?.showLabelNumber
      );
      updateSimcardNumberControllers.setFieldValue(
        "serial",
        viewSimcardNumberData?.serial
      );
      updateSimcardNumberControllers.setFieldValue("operatorId", {
        label: viewSimcardNumberData?.operator?.name,
        value: viewSimcardNumberData?.operator?.id,
      });
      updateSimcardNumberControllers.setFieldValue("typeId", {
        label: viewSimcardNumberData?.typeNumber?.name,
        value: viewSimcardNumberData?.typeNumber?.id,
      });
      updateSimcardNumberControllers.setFieldValue("labelNumberId", {
        label: viewSimcardNumberData?.labelNumber?.name,
        value: viewSimcardNumberData?.labelNumber?.id,
      });
      updateSimcardNumberControllers.setFieldValue("planId", {
        label: viewSimcardNumberData?.plan?.name,
        value: viewSimcardNumberData?.plan?.id,
      });
      updateSimcardNumberControllers.setFieldValue(
        "price",
        viewSimcardNumberData?.price
      );
      updateSimcardNumberControllers.setFieldValue(
        "active",
        viewSimcardNumberData?.active
      );
    }
  }, [viewSimcardNumberData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش سیمکارت با شماره"
        data={[{ title: "داشبورد" }, { title: "ویرایش سیمکارت با شماره" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* update form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateSimcardNumberControllers.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش شماره تلفن</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* form fields */}
              <Row>
                {/* number */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="number">
                    شماره تلفن
                  </Label>
                  <Input
                    value={updateSimcardNumberControllers.values.number}
                    onChange={(e) => {
                      updateSimcardNumberControllers.setFieldValue(
                        "number",
                        e.target.value
                      );
                      if (e.target.value.length === 11) {
                        updateSimcardNumberControllers.setFieldValue(
                          "showLabelNumber",
                          e.target.value.substring(0, 4) +
                            "-" +
                            e.target.value.substring(4, 7) +
                            "-" +
                            e.target.value.substring(7, 11)
                        );
                      }
                    }}
                    type="number"
                    id="number"
                    name="number"
                    placeholder="شماره تلفن وارد کنید"
                    invalid={
                      updateSimcardNumberControllers.touched.number
                        ? updateSimcardNumberControllers.errors.number
                        : null
                    }
                  />
                  {updateSimcardNumberControllers.touched.number &&
                  updateSimcardNumberControllers.errors.number ? (
                    <FormFeedback>
                      {updateSimcardNumberControllers.errors.number}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* showLabelNumber */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="showLabelNumber">
                    فرمت نمایش
                  </Label>
                  <Input
                    value={
                      updateSimcardNumberControllers.values.showLabelNumber
                    }
                    onChange={updateSimcardNumberControllers.handleChange}
                    type="text"
                    id="showLabelNumber"
                    name="showLabelNumber"
                    placeholder="فرمت نمایش وارد کنید"
                    invalid={
                      updateSimcardNumberControllers.touched.showLabelNumber
                        ? updateSimcardNumberControllers.errors.showLabelNumber
                        : null
                    }
                  />
                  {updateSimcardNumberControllers.touched.showLabelNumber &&
                  updateSimcardNumberControllers.errors.showLabelNumber ? (
                    <FormFeedback>
                      {updateSimcardNumberControllers.errors.showLabelNumber}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* serial */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="serial">
                    سریال سیمکارت
                  </Label>
                  <Input
                    value={updateSimcardNumberControllers.values.serial}
                    onChange={(e) => {
                      updateSimcardNumberControllers.setFieldValue(
                        "serial",
                        e.target.value
                      );
                    }}
                    type="text"
                    id="serial"
                    name="serial"
                    placeholder="شماره تلفن وارد کنید"
                    invalid={
                      updateSimcardNumberControllers.touched.serial
                        ? updateSimcardNumberControllers.errors.serial
                        : null
                    }
                  />
                  {updateSimcardNumberControllers.touched.serial &&
                  updateSimcardNumberControllers.errors.serial ? (
                    <FormFeedback>
                      {updateSimcardNumberControllers.errors.serial}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* operatorId */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="operatorId">
                    اپراتور
                  </Label>
                  <Select
                    value={updateSimcardNumberControllers.values.operatorId}
                    onChange={(value) =>
                      updateSimcardNumberControllers.setFieldValue(
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
                      updateSimcardNumberControllers.touched.operatorId &&
                      updateSimcardNumberControllers.errors.operatorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="operatorId"
                    name="operatorId"
                  />
                  {updateSimcardNumberControllers.touched.operatorId &&
                  updateSimcardNumberControllers.errors.operatorId ? (
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
                    value={updateSimcardNumberControllers.values.typeId}
                    onChange={(value) =>
                      updateSimcardNumberControllers.setFieldValue(
                        "typeId",
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
                      updateSimcardNumberControllers.touched.typeId &&
                      updateSimcardNumberControllers.errors.typeId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="typeId"
                    name="typeId"
                  />
                  {updateSimcardNumberControllers.touched.typeId &&
                  updateSimcardNumberControllers.errors.typeId ? (
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
                    value={updateSimcardNumberControllers.values.labelNumberId}
                    onChange={(value) =>
                      updateSimcardNumberControllers.setFieldValue(
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
                      updateSimcardNumberControllers.touched.labelNumberId &&
                      updateSimcardNumberControllers.errors.labelNumberId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="labelNumberId"
                    name="labelNumberId"
                  />
                  {updateSimcardNumberControllers.touched.labelNumberId &&
                  updateSimcardNumberControllers.errors.labelNumberId ? (
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
                    value={updateSimcardNumberControllers.values.planId}
                    loadOptions={getSelectPlans}
                    onChange={(value) =>
                      updateSimcardNumberControllers.setFieldValue(
                        "planId",
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
                    placeholder="طرح را انتخاب کنید"
                    className={`react-select ${
                      updateSimcardNumberControllers.touched.planId &&
                      updateSimcardNumberControllers.errors.planId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="planId"
                    name="planId"
                  />
                  {updateSimcardNumberControllers.touched.planId &&
                  updateSimcardNumberControllers.errors.planId ? (
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
                    value={updateSimcardNumberControllers.values.price}
                    onChange={updateSimcardNumberControllers.handleChange}
                    type="number"
                    id="price"
                    name="price"
                    placeholder="قیمت را به تومان وارد کنید"
                    invalid={
                      updateSimcardNumberControllers.touched.price
                        ? updateSimcardNumberControllers.errors.price
                        : null
                    }
                  />
                  {updateSimcardNumberControllers.touched.price &&
                  updateSimcardNumberControllers.errors.price ? (
                    <FormFeedback>
                      {updateSimcardNumberControllers.errors.price}
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
                        checked={updateSimcardNumberControllers.values.active}
                        onChange={(e) => {
                          updateSimcardNumberControllers.setFieldValue(
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
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateSimcardNumber}
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
export default UpdateSimcardWithNumber;
