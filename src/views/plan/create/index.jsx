import { Fragment, useEffect, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import usePlan from "../../../hooks/use_plan";
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
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";

const CreatePlan = () => {
  const {
    getOperators,
    getSelectCategories,
    createPlanController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = usePlan();

  const [fileUri, setFileUri] = useState(null);

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      setFileUri(URL.createObjectURL(e.target.files[0]));
      var reader = new FileReader();
      reader.onloadend = function () {
        createPlanController.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد طرح جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد طرح جدید" }]}
      />
      <Form onSubmit={createPlanController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد طرح جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* upload avatar */}
            <div className="d-flex flex-column align-items-center mb-3">
              <div className="mb-1">
                <img
                  style={{
                    objectFit: "cover",
                    border: "1px solid rgba(226, 226, 226, 0.366)",
                  }}
                  className="rounded"
                  src={fileUri ? fileUri : avatarBlank}
                  alt="Generic placeholder image"
                  height="100"
                  width="100"
                />
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <Button
                    tag={Label}
                    // disabled={loadings.updateLogo}
                    size="sm"
                    color="primary"
                  >
                    انتخاب تصویر
                    <Input
                      type="file"
                      onChange={handleUploadImage}
                      hidden
                      accept="image/*"
                    />
                  </Button>
                </div>
              </div>
            </div>
            {/* form fields */}
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="name">
                  نام طرح
                </Label>
                <Input
                  value={createPlanController.values.name}
                  onChange={createPlanController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام طرح را وارد کنید"
                  invalid={
                    createPlanController.touched.name
                      ? createPlanController.errors.name
                      : null
                  }
                />
                {createPlanController.touched.name &&
                createPlanController.errors.name ? (
                  <FormFeedback>
                    {createPlanController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* categoryId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="categoryId">
                  دسته بندی
                </Label>
                <AsyncPaginate
                  value={createPlanController.values.categoryId}
                  loadOptions={getSelectCategories}
                  onChange={(value) =>
                    createPlanController.setFieldValue("categoryId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="انتخاب کنید"
                  className={`react-select ${
                    createPlanController.touched.categoryId &&
                    createPlanController.errors.categoryId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="categoryId"
                  name="categoryId"
                />
                {createPlanController.touched.categoryId &&
                createPlanController.errors.categoryId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد دسته بندی اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* opratorId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="opratorId">
                  اپراتور
                </Label>
                <Select
                  value={createPlanController.values.opratorId}
                  onChange={(value) =>
                    createPlanController.setFieldValue("opratorId", value)
                  }
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    createPlanController.touched.opratorId &&
                    createPlanController.errors.opratorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="opratorId"
                  name="opratorId"
                />
                {createPlanController.touched.opratorId &&
                createPlanController.errors.opratorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* countStar */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="countStar">
                  تعداد ستاره های طرح
                </Label>
                <Input
                  value={createPlanController.values.countStar}
                  onChange={createPlanController.handleChange}
                  type="number"
                  id="countStar"
                  name="countStar"
                  placeholder="تعداد ستاره های طرح را وارد کنید"
                  invalid={
                    createPlanController.touched.countStar
                      ? createPlanController.errors.countStar
                      : null
                  }
                />
                {createPlanController.touched.countStar &&
                createPlanController.errors.countStar ? (
                  <FormFeedback>
                    {createPlanController.errors.countStar}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* summray */}
              <Col xs="12" className="mb-1">
                <Label className="form-label" for="summray">
                  خلاصه طرح
                </Label>
                <Input
                  value={createPlanController.values.summray}
                  onChange={createPlanController.handleChange}
                  type="textarea"
                  id="summray"
                  name="summray"
                  placeholder="خلاصه طرح را وارد کنید"
                  invalid={
                    createPlanController.touched.summray
                      ? createPlanController.errors.summray
                      : null
                  }
                />
                {createPlanController.touched.summray &&
                createPlanController.errors.summray ? (
                  <FormFeedback>
                    {createPlanController.errors.summray}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* description */}
              <Col xs="12" className="mb-1">
                <Label className="form-label" for="description">
                  توضیحات طرح
                </Label>
                <Input
                  value={createPlanController.values.description}
                  onChange={createPlanController.handleChange}
                  type="textarea"
                  id="description"
                  name="description"
                  placeholder="توضیحات طرح را وارد کنید"
                  invalid={
                    createPlanController.touched.description
                      ? createPlanController.errors.description
                      : null
                  }
                />
                {createPlanController.touched.description &&
                createPlanController.errors.description ? (
                  <FormFeedback>
                    {createPlanController.errors.description}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createPlan}
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

export default CreatePlan;
