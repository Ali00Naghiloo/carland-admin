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
  Button,
} from "reactstrap";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";
import { Editor } from "@tinymce/tinymce-react";
import useService from "../../../hooks/use_service";

const CreateService = () => {
  const {
    getSelectCategories,
    getOperators,
    createServiceController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useService();

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        createServiceController.setFieldValue("image", reader.result);
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
        title="ایجاد خدمت جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد خدمت جدید" }]}
      />
      <Form onSubmit={createServiceController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد خدمت جدید</CardTitle>
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
                  src={
                    createServiceController.values.image.length > 0
                      ? createServiceController.values.image
                      : avatarBlank
                  }
                  alt="Generic placeholder image"
                  height="100"
                  width="100"
                />
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <Button tag={Label} size="sm" color="primary">
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
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام خدمت
                </Label>
                <Input
                  value={createServiceController.values.name}
                  onChange={createServiceController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام خدمت را وارد کنید"
                  invalid={
                    createServiceController.touched.name
                      ? createServiceController.errors.name
                      : null
                  }
                />
                {createServiceController.touched.name &&
                createServiceController.errors.name ? (
                  <FormFeedback>
                    {createServiceController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* opratorTableId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="opratorTableId">
                  اپراتور
                </Label>
                <Select
                  value={createServiceController.values.opratorTableId}
                  onChange={(value) =>
                    createServiceController.setFieldValue(
                      "opratorTableId",
                      value
                    )
                  }
                  options={operatorsList}
                  isDisabled={getOperatorsLoading}
                  isLoading={getOperatorsLoading}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="انتخاب کنید"
                  className={`react-select ${
                    createServiceController.touched.opratorTableId &&
                    createServiceController.errors.opratorTableId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="opratorTableId"
                  name="opratorTableId"
                />
                {createServiceController.touched.opratorTableId &&
                createServiceController.errors.opratorTableId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* categoryId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="categoryId">
                  دسته بندی
                </Label>
                <AsyncPaginate
                  value={createServiceController.values.categoryId}
                  loadOptions={getSelectCategories}
                  onChange={(value) =>
                    createServiceController.setFieldValue("categoryId", value)
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
                    createServiceController.touched.categoryId &&
                    createServiceController.errors.categoryId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="categoryId"
                  name="categoryId"
                />
                {createServiceController.touched.categoryId &&
                createServiceController.errors.categoryId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد دسته بندی اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* creditPrice */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="creditPrice">
                  قیمت اعتباری
                </Label>
                <Input
                  value={createServiceController.values.creditPrice}
                  onChange={createServiceController.handleChange}
                  type="number"
                  id="creditPrice"
                  name="creditPrice"
                  placeholder="قیمت اعتباری را وارد کنید"
                  invalid={
                    createServiceController.touched.creditPrice
                      ? createServiceController.errors.creditPrice
                      : null
                  }
                />
                {createServiceController.touched.creditPrice &&
                createServiceController.errors.creditPrice ? (
                  <FormFeedback>
                    {createServiceController.errors.creditPrice}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* fixedPrice */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="fixedPrice">
                  قیمت دائمی
                </Label>
                <Input
                  value={createServiceController.values.fixedPrice}
                  onChange={createServiceController.handleChange}
                  type="number"
                  id="fixedPrice"
                  name="fixedPrice"
                  placeholder="قیمت دائمی را وارد کنید"
                  invalid={
                    createServiceController.touched.fixedPrice
                      ? createServiceController.errors.fixedPrice
                      : null
                  }
                />
                {createServiceController.touched.fixedPrice &&
                createServiceController.errors.fixedPrice ? (
                  <FormFeedback>
                    {createServiceController.errors.fixedPrice}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* isActive */}
              <Col xs="12" className="mb-2 mt-1">
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={
                        createServiceController.values.isActive === true
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        createServiceController.setFieldValue(
                          "isActive",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      خدمت فعال باشد
                    </Label>
                  </div>
                </div>
              </Col>
              {/* summary */}
              <Col xs="12" className="mb-2">
                <Label className="form-label" for="summary">
                  خلاصه محصول
                </Label>
                <Editor
                  apiKey="6nct7sklr88a59qr1lmnjytyu0wpj81vaq2f4qyemnyc2dzf"
                  init={{
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    directionality: "ltr",
                    language: "fa",
                    height: "250",
                  }}
                  onEditorChange={(value) =>
                    createServiceController.setFieldValue("summary", value)
                  }
                  value={createServiceController.values.summary}
                />
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createService}
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
export default CreateService;
