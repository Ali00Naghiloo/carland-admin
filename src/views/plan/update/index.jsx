import { Fragment, useState, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import usePlan from "../../../hooks/use_plan";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import CustomLoading from "../../../components/loading";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";

const UpdatePlan = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getPlanById,
    updatePlanController,
    getSelectCategories,
    getOperators,
    operatorsList,
    viewPlanData,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  } = usePlan();

  const [fileUri, setFileUri] = useState(null);

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      setFileUri(URL.createObjectURL(e.target.files[0]));
      var reader = new FileReader();
      reader.onloadend = function () {
        updatePlanController.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getPlanById(entity_id);
      getOperators();
      updatePlanController.setFieldValue("id", entity_id);
    } else {
      navigate("/plan/all");
    }
  }, []);

  useEffect(() => {
    if (viewPlanData) {
      updatePlanController.setFieldValue("name", viewPlanData?.name);
      updatePlanController.setFieldValue("summray", viewPlanData?.summray);
      updatePlanController.setFieldValue(
        "description",
        viewPlanData?.description
      );
      updatePlanController.setFieldValue("countStar", viewPlanData?.countStar);
      updatePlanController.setFieldValue("categoryId", {
        label: viewPlanData?.category?.name,
        value: viewPlanData?.category?.id,
      });
      updatePlanController.setFieldValue("opratorId", {
        label: viewPlanData?.oprator?.name,
        value: viewPlanData?.oprator?.id,
      });
    }
  }, [viewPlanData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش طرح"
        data={[{ title: "داشبورد" }, { title: "ویرایش طرح" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* form */}
      {!getByIdLoading ? (
        <Form onSubmit={updatePlanController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش طرح</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* upload avatar */}
              <div className="d-flex flex-column align-items-center mb-3">
                <div className="mb-1">
                  {viewPlanData?.image ? (
                    <img
                      style={{
                        objectFit: "cover",
                        border: "1px solid rgba(226, 226, 226, 0.366)",
                      }}
                      className="rounded"
                      src={
                        fileUri
                          ? fileUri
                          : process.env.REACT_APP_BASE_URL + viewPlanData?.image
                      }
                      alt="Generic placeholder image"
                      height="100"
                      width="100"
                    />
                  ) : (
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
                  )}
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
                    value={updatePlanController.values.name}
                    onChange={updatePlanController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام طرح را وارد کنید"
                    invalid={
                      updatePlanController.touched.name
                        ? updatePlanController.errors.name
                        : null
                    }
                  />
                  {updatePlanController.touched.name &&
                  updatePlanController.errors.name ? (
                    <FormFeedback>
                      {updatePlanController.errors.name}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* categoryId */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="categoryId">
                    دسته بندی
                  </Label>
                  <AsyncPaginate
                    value={updatePlanController.values.categoryId}
                    loadOptions={getSelectCategories}
                    onChange={(value) =>
                      updatePlanController.setFieldValue("categoryId", value)
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
                      updatePlanController.touched.categoryId &&
                      updatePlanController.errors.categoryId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="categoryId"
                    name="categoryId"
                  />
                  {updatePlanController.touched.categoryId &&
                  updatePlanController.errors.categoryId ? (
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
                    value={updatePlanController.values.opratorId}
                    onChange={(value) =>
                      updatePlanController.setFieldValue("opratorId", value)
                    }
                    isLoading={getOperatorsLoading}
                    noOptionsMessage={() => " اپراتوری یافت نشد."}
                    theme={selectThemeColors}
                    closeMenuOnSelect={true}
                    isDisabled={getOperatorsLoading}
                    placeholder="اپراتور را انتخاب کنید"
                    options={operatorsList}
                    className={`react-select ${
                      updatePlanController.touched.opratorId &&
                      updatePlanController.errors.opratorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="opratorId"
                    name="opratorId"
                  />
                  {updatePlanController.touched.opratorId &&
                  updatePlanController.errors.opratorId ? (
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
                    value={updatePlanController.values.countStar}
                    onChange={updatePlanController.handleChange}
                    type="number"
                    id="countStar"
                    name="countStar"
                    placeholder="تعداد ستاره های طرح را وارد کنید"
                    invalid={
                      updatePlanController.touched.countStar
                        ? updatePlanController.errors.countStar
                        : null
                    }
                  />
                  {updatePlanController.touched.countStar &&
                  updatePlanController.errors.countStar ? (
                    <FormFeedback>
                      {updatePlanController.errors.countStar}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* summray */}
                <Col xs="12" className="mb-1">
                  <Label className="form-label" for="summray">
                    خلاصه طرح
                  </Label>
                  <Input
                    value={updatePlanController.values.summray}
                    onChange={updatePlanController.handleChange}
                    type="textarea"
                    id="summray"
                    name="summray"
                    placeholder="خلاصه طرح را وارد کنید"
                    invalid={
                      updatePlanController.touched.summray
                        ? updatePlanController.errors.summray
                        : null
                    }
                  />
                  {updatePlanController.touched.summray &&
                  updatePlanController.errors.summray ? (
                    <FormFeedback>
                      {updatePlanController.errors.summray}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* description */}
                <Col xs="12" className="mb-1">
                  <Label className="form-label" for="description">
                    توضیحات طرح
                  </Label>
                  <Input
                    value={updatePlanController.values.description}
                    onChange={updatePlanController.handleChange}
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder="توضیحات طرح را وارد کنید"
                    invalid={
                      updatePlanController.touched.description
                        ? updatePlanController.errors.description
                        : null
                    }
                  />
                  {updatePlanController.touched.description &&
                  updatePlanController.errors.description ? (
                    <FormFeedback>
                      {updatePlanController.errors.description}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updatePlan}
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

export default UpdatePlan;
