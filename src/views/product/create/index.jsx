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
import useProduct from "../../../hooks/use_product";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";
import { Editor } from "@tinymce/tinymce-react";

const CreateProduct = () => {
  const {
    getSelectCategories,
    getOperators,
    createProductController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useProduct();

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        createProductController.setFieldValue("image", reader.result);
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
        title="ایجاد محصول جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد محصول جدید" }]}
      />
      <Form onSubmit={createProductController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد محصول جدید</CardTitle>
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
                    createProductController.values.image.length > 0
                      ? createProductController.values.image
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
                  نام محصول
                </Label>
                <Input
                  value={createProductController.values.name}
                  onChange={createProductController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام محصول را وارد کنید"
                  invalid={
                    createProductController.touched.name
                      ? createProductController.errors.name
                      : null
                  }
                />
                {createProductController.touched.name &&
                createProductController.errors.name ? (
                  <FormFeedback>
                    {createProductController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* stockSite */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="stockSite">
                  تعداد در سایت
                </Label>
                <Input
                  value={createProductController.values.stockSite}
                  onChange={createProductController.handleChange}
                  type="number"
                  id="stockSite"
                  name="stockSite"
                  placeholder="تعداد در سایت را وارد کنید"
                  invalid={
                    createProductController.touched.stockSite
                      ? createProductController.errors.stockSite
                      : null
                  }
                />
                {createProductController.touched.stockSite &&
                createProductController.errors.stockSite ? (
                  <FormFeedback>
                    {createProductController.errors.stockSite}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* stockAgent */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="stockAgent">
                  تعداد برای نمایندگان
                </Label>
                <Input
                  value={createProductController.values.stockAgent}
                  onChange={createProductController.handleChange}
                  type="number"
                  id="stockAgent"
                  name="stockAgent"
                  placeholder="تعداد برای نمایندگان را وارد کنید"
                  invalid={
                    createProductController.touched.stockAgent
                      ? createProductController.errors.stockAgent
                      : null
                  }
                />
                {createProductController.touched.stockAgent &&
                createProductController.errors.stockAgent ? (
                  <FormFeedback>
                    {createProductController.errors.stockAgent}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* categoryId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="categoryId">
                  دسته بندی
                </Label>
                <AsyncPaginate
                  value={createProductController.values.categoryId}
                  loadOptions={getSelectCategories}
                  onChange={(value) =>
                    createProductController.setFieldValue("categoryId", value)
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
                    createProductController.touched.categoryId &&
                    createProductController.errors.categoryId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="categoryId"
                  name="categoryId"
                />
                {createProductController.touched.categoryId &&
                createProductController.errors.categoryId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد دسته بندی اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* operatorId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="operatorId">
                  اپراتور
                </Label>
                <Select
                  value={createProductController.values.operatorId}
                  onChange={(value) =>
                    createProductController.setFieldValue("operatorId", value)
                  }
                  options={operatorsList}
                  isDisabled={getOperatorsLoading}
                  isLoading={getOperatorsLoading}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="انتخاب کنید"
                  className={`react-select ${
                    createProductController.touched.operatorId &&
                    createProductController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createProductController.touched.operatorId &&
                createProductController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* priceseller */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="priceseller">
                  قیمت نمایندگان
                </Label>
                <Input
                  value={createProductController.values.priceseller}
                  onChange={createProductController.handleChange}
                  type="number"
                  id="priceseller"
                  name="priceseller"
                  placeholder="قیمت نمایندگان را وارد کنید"
                  invalid={
                    createProductController.touched.priceseller
                      ? createProductController.errors.priceseller
                      : null
                  }
                />
                {createProductController.touched.priceseller &&
                createProductController.errors.priceseller ? (
                  <FormFeedback>
                    {createProductController.errors.priceseller}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* priceBuy */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="priceBuy">
                  قیمت فروش
                </Label>
                <Input
                  value={createProductController.values.priceBuy}
                  onChange={createProductController.handleChange}
                  type="number"
                  id="priceBuy"
                  name="priceBuy"
                  placeholder="قیمت فروش را وارد کنید"
                  invalid={
                    createProductController.touched.priceBuy
                      ? createProductController.errors.priceBuy
                      : null
                  }
                />
                {createProductController.touched.priceBuy &&
                createProductController.errors.priceBuy ? (
                  <FormFeedback>
                    {createProductController.errors.priceBuy}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* brandName */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="brandName">
                  نام برند محصول
                </Label>
                <Input
                  value={createProductController.values.brandName}
                  onChange={createProductController.handleChange}
                  type="text"
                  id="brandName"
                  name="brandName"
                  placeholder="نام برند محصول را وارد کنید"
                  invalid={
                    createProductController.touched.brandName
                      ? createProductController.errors.brandName
                      : null
                  }
                />
              </Col>
              {/* serial */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="serial">
                  سریال محصول
                </Label>
                <Input
                  value={createProductController.values.serial}
                  onChange={createProductController.handleChange}
                  type="text"
                  id="serial"
                  name="serial"
                  placeholder="سریال محصول را وارد کنید"
                  invalid={
                    createProductController.touched.serial
                      ? createProductController.errors.serial
                      : null
                  }
                />
              </Col>
              {/* active */}
              <Col xs="12" className="mb-2 mt-1">
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={
                        createProductController.values.active === true
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        createProductController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      محصول فعال باشد
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
                    createProductController.setFieldValue("summary", value)
                  }
                  value={createProductController.values.summary}
                />
              </Col>
              {/* description */}
              <Col xs="12" className="mb-2">
                <Label className="form-label" for="description">
                  توضیحات محصول
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
                    height: "400",
                  }}
                  onEditorChange={(value) =>
                    createProductController.setFieldValue("description", value)
                  }
                  value={createProductController.values.description}
                />
              </Col>
              {/* review */}
              <Col xs="12" className="mb-2">
                <Label className="form-label" for="review">
                  نقد و بررسی محصول
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
                    height: "300",
                  }}
                  onEditorChange={(value) =>
                    createProductController.setFieldValue("review", value)
                  }
                  value={createProductController.values.review}
                />
              </Col>
              {/* help */}
              <Col xs="12" className="mb-2">
                <Label className="form-label" for="help">
                  راهنمای محصول
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
                    height: "300",
                  }}
                  onEditorChange={(value) =>
                    createProductController.setFieldValue("help", value)
                  }
                  value={createProductController.values.help}
                />
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createProduct}
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
export default CreateProduct;
