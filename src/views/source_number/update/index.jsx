import { Fragment, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "@components/breadcrumbs";
import useSourceNumber from "../../../hooks/use_source_number";
import CustomLoading from "../../../components/loading";
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

const UpdateSourceNumber = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getSourceNumberById,
    updateSourceNumberController,
    viewSourceNumberData,
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
  } = useSourceNumber();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getSourceNumberById(entity_id);
      getOperators();
      getNumberTypes();
      getNumberLabels();
      updateSourceNumberController.setFieldValue("id", entity_id);
    } else {
      navigate("/source_number/all");
    }
  }, []);

  useEffect(() => {
    if (viewSourceNumberData) {
      updateSourceNumberController.setFieldValue(
        "number",
        viewSourceNumberData?.number
      );
      updateSourceNumberController.setFieldValue(
        "labelShowNumber",
        viewSourceNumberData?.labelShowNumber
      );
      updateSourceNumberController.setFieldValue("operatorId", {
        label: viewSourceNumberData?.operator?.name,
        value: viewSourceNumberData?.operator?.id,
      });
      updateSourceNumberController.setFieldValue("typeNumberId", {
        label: viewSourceNumberData?.typeNumber?.name,
        value: viewSourceNumberData?.typeNumber?.id,
      });
      updateSourceNumberController.setFieldValue("labelNumberId", {
        label: viewSourceNumberData?.labelNumber?.name,
        value: viewSourceNumberData?.labelNumber?.id,
      });
      updateSourceNumberController.setFieldValue("planId", {
        label: viewSourceNumberData?.plan?.name,
        value: viewSourceNumberData?.plan?.id,
      });
      updateSourceNumberController.setFieldValue("categoryId", {
        label: viewSourceNumberData?.category?.name,
        value: viewSourceNumberData?.category?.id,
      });
      updateSourceNumberController.setFieldValue(
        "price",
        viewSourceNumberData?.price
      );
      updateSourceNumberController.setFieldValue(
        "active",
        viewSourceNumberData?.active
      );
    }
  }, [viewSourceNumberData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش شماره تلفن"
        data={[{ title: "داشبورد" }, { title: "ویرایش شماره تلفن" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* update form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateSourceNumberController.handleSubmit}>
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
                    value={updateSourceNumberController.values.number}
                    onChange={(e) => {
                      updateSourceNumberController.setFieldValue(
                        "number",
                        e.target.value
                      );
                      if (e.target.value.length === 11) {
                        updateSourceNumberController.setFieldValue(
                          "labelShowNumber",
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
                      updateSourceNumberController.touched.number
                        ? updateSourceNumberController.errors.number
                        : null
                    }
                  />
                  {updateSourceNumberController.touched.number &&
                  updateSourceNumberController.errors.number ? (
                    <FormFeedback>
                      {updateSourceNumberController.errors.number}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* labelShowNumber */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="labelShowNumber">
                    فرمت نمایش
                  </Label>
                  <Input
                    value={updateSourceNumberController.values.labelShowNumber}
                    onChange={updateSourceNumberController.handleChange}
                    type="text"
                    id="labelShowNumber"
                    name="labelShowNumber"
                    placeholder="فرمت نمایش وارد کنید"
                    invalid={
                      updateSourceNumberController.touched.labelShowNumber
                        ? updateSourceNumberController.errors.labelShowNumber
                        : null
                    }
                  />
                  {updateSourceNumberController.touched.labelShowNumber &&
                  updateSourceNumberController.errors.labelShowNumber ? (
                    <FormFeedback>
                      {updateSourceNumberController.errors.labelShowNumber}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* operatorId */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="operatorId">
                    اپراتور
                  </Label>
                  <Select
                    value={updateSourceNumberController.values.operatorId}
                    onChange={(value) =>
                      updateSourceNumberController.setFieldValue(
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
                      updateSourceNumberController.touched.operatorId &&
                      updateSourceNumberController.errors.operatorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="operatorId"
                    name="operatorId"
                  />
                  {updateSourceNumberController.touched.operatorId &&
                  updateSourceNumberController.errors.operatorId ? (
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
                    value={updateSourceNumberController.values.typeNumberId}
                    onChange={(value) =>
                      updateSourceNumberController.setFieldValue(
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
                      updateSourceNumberController.touched.typeNumberId &&
                      updateSourceNumberController.errors.typeNumberId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="typeNumberId"
                    name="typeNumberId"
                  />
                  {updateSourceNumberController.touched.typeNumberId &&
                  updateSourceNumberController.errors.typeNumberId ? (
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
                    value={updateSourceNumberController.values.labelNumberId}
                    onChange={(value) =>
                      updateSourceNumberController.setFieldValue(
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
                      updateSourceNumberController.touched.labelNumberId &&
                      updateSourceNumberController.errors.labelNumberId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="labelNumberId"
                    name="labelNumberId"
                  />
                  {updateSourceNumberController.touched.labelNumberId &&
                  updateSourceNumberController.errors.labelNumberId ? (
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
                    value={updateSourceNumberController.values.planId}
                    loadOptions={getSelectPlans}
                    onChange={(value) =>
                      updateSourceNumberController.setFieldValue(
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
                      updateSourceNumberController.touched.planId &&
                      updateSourceNumberController.errors.planId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="planId"
                    name="planId"
                  />
                  {updateSourceNumberController.touched.planId &&
                  updateSourceNumberController.errors.planId ? (
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
                    value={updateSourceNumberController.values.categoryId}
                    loadOptions={getSelectCategories}
                    onChange={(value) =>
                      updateSourceNumberController.setFieldValue(
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
                      updateSourceNumberController.touched.categoryId &&
                      updateSourceNumberController.errors.categoryId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="categoryId"
                    name="categoryId"
                  />
                  {updateSourceNumberController.touched.categoryId &&
                  updateSourceNumberController.errors.categoryId ? (
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
                    value={updateSourceNumberController.values.price}
                    onChange={updateSourceNumberController.handleChange}
                    type="number"
                    id="price"
                    name="price"
                    placeholder="قیمت را به تومان وارد کنید"
                    invalid={
                      updateSourceNumberController.touched.price
                        ? updateSourceNumberController.errors.price
                        : null
                    }
                  />
                  {updateSourceNumberController.touched.price &&
                  updateSourceNumberController.errors.price ? (
                    <FormFeedback>
                      {updateSourceNumberController.errors.price}
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
                        checked={updateSourceNumberController.values.active}
                        onChange={(e) => {
                          updateSourceNumberController.setFieldValue(
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
                loading={loadings.updateSourceNumber}
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
export default UpdateSourceNumber;
