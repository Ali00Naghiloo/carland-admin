import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
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
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useProduct from "../../../hooks/use_product";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";
import { Editor } from "@tinymce/tinymce-react";
import CustomLoading from "../../../components/loading";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getProductById,
    getSelectCategories,
    getOperators,
    viewProductData,
    updateProductController,
    operatorsList,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  } = useProduct();

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateProductController.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  const imageUrlToBase64 = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getProductById(entity_id);
      getOperators();
      updateProductController.setFieldValue("id", entity_id);
    } else {
      navigate("/product/all");
    }
  }, []);

  useEffect(() => {
    if (viewProductData) {
      // name
      if (viewProductData?.name) {
        updateProductController.setFieldValue("name", viewProductData?.name);
      }
      // image
      if (viewProductData?.image) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewProductData?.image
        ).then((item) => {
          updateProductController.setFieldValue("image", item);
        });
      }
      // summary
      if (viewProductData?.summary) {
        updateProductController.setFieldValue(
          "summary",
          viewProductData?.summary
        );
      }
      // description
      if (viewProductData?.description) {
        updateProductController.setFieldValue(
          "description",
          viewProductData?.description
        );
      }
      // stockSite
      if (viewProductData?.stockSite) {
        updateProductController.setFieldValue(
          "stockSite",
          viewProductData?.stockSite
        );
      }
      // stockAgent
      if (viewProductData?.stockAgent) {
        updateProductController.setFieldValue(
          "stockAgent",
          viewProductData?.stockAgent
        );
      }
      // categoryId
      if (viewProductData?.categoryId) {
        updateProductController.setFieldValue("categoryId", {
          label: viewProductData?.category.name,
          value: viewProductData?.category.id,
        });
      }
      // operatorId
      if (viewProductData?.operatorId) {
        updateProductController.setFieldValue("operatorId", {
          label: viewProductData?.operator.name,
          value: viewProductData?.operator.id,
        });
      }
      // review
      if (viewProductData?.review) {
        updateProductController.setFieldValue(
          "review",
          viewProductData?.review
        );
      }
      // help
      if (viewProductData?.help) {
        updateProductController.setFieldValue("help", viewProductData?.help);
      }
      // brandName
      if (viewProductData?.brand) {
        updateProductController.setFieldValue(
          "brandName",
          viewProductData?.brand
        );
      }
      // priceseller
      if (viewProductData?.priceseller) {
        updateProductController.setFieldValue(
          "priceseller",
          viewProductData?.priceseller
        );
      }
      // priceBuy
      if (viewProductData?.priceBuy) {
        updateProductController.setFieldValue(
          "priceBuy",
          viewProductData?.priceBuy
        );
      }
      // serial
      if (viewProductData?.serial) {
        updateProductController.setFieldValue(
          "serial",
          viewProductData?.serial
        );
      }
      // active
      updateProductController.setFieldValue("active", viewProductData?.active);
    }
  }, [viewProductData]);

  return (
    <Fragment>
      <Breadcrumbs
        title="ویرایش محصول"
        data={[{ title: "داشبورد" }, { title: "ویرایش محصول" }]}
      />
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateProductController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش محصول</CardTitle>
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
                      updateProductController.values.image.length > 0
                        ? updateProductController.values.image
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
                    value={updateProductController.values.name}
                    onChange={updateProductController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام محصول را وارد کنید"
                    invalid={
                      updateProductController.touched.name
                        ? updateProductController.errors.name
                        : null
                    }
                  />
                  {updateProductController.touched.name &&
                  updateProductController.errors.name ? (
                    <FormFeedback>
                      {updateProductController.errors.name}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* stockSite */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="stockSite">
                    تعداد در سایت
                  </Label>
                  <Input
                    value={updateProductController.values.stockSite}
                    onChange={updateProductController.handleChange}
                    type="number"
                    id="stockSite"
                    name="stockSite"
                    placeholder="تعداد در سایت را وارد کنید"
                    invalid={
                      updateProductController.touched.stockSite
                        ? updateProductController.errors.stockSite
                        : null
                    }
                  />
                  {updateProductController.touched.stockSite &&
                  updateProductController.errors.stockSite ? (
                    <FormFeedback>
                      {updateProductController.errors.stockSite}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* stockAgent */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="stockAgent">
                    تعداد برای نمایندگان
                  </Label>
                  <Input
                    value={updateProductController.values.stockAgent}
                    onChange={updateProductController.handleChange}
                    type="number"
                    id="stockAgent"
                    name="stockAgent"
                    placeholder="تعداد برای نمایندگان را وارد کنید"
                    invalid={
                      updateProductController.touched.stockAgent
                        ? updateProductController.errors.stockAgent
                        : null
                    }
                  />
                  {updateProductController.touched.stockAgent &&
                  updateProductController.errors.stockAgent ? (
                    <FormFeedback>
                      {updateProductController.errors.stockAgent}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* categoryId */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="categoryId">
                    دسته بندی
                  </Label>
                  <AsyncPaginate
                    value={updateProductController.values.categoryId}
                    loadOptions={getSelectCategories}
                    onChange={(value) =>
                      updateProductController.setFieldValue("categoryId", value)
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
                      updateProductController.touched.categoryId &&
                      updateProductController.errors.categoryId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="categoryId"
                    name="categoryId"
                  />
                  {updateProductController.touched.categoryId &&
                  updateProductController.errors.categoryId ? (
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
                    value={updateProductController.values.operatorId}
                    onChange={(value) =>
                      updateProductController.setFieldValue("operatorId", value)
                    }
                    options={operatorsList}
                    isDisabled={getOperatorsLoading}
                    isLoading={getOperatorsLoading}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="انتخاب کنید"
                    className={`react-select ${
                      updateProductController.touched.operatorId &&
                      updateProductController.errors.operatorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="operatorId"
                    name="operatorId"
                  />
                  {updateProductController.touched.operatorId &&
                  updateProductController.errors.operatorId ? (
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
                    value={updateProductController.values.priceseller}
                    onChange={updateProductController.handleChange}
                    type="number"
                    id="priceseller"
                    name="priceseller"
                    placeholder="قیمت نمایندگان را وارد کنید"
                    invalid={
                      updateProductController.touched.priceseller
                        ? updateProductController.errors.priceseller
                        : null
                    }
                  />
                  {updateProductController.touched.priceseller &&
                  updateProductController.errors.priceseller ? (
                    <FormFeedback>
                      {updateProductController.errors.priceseller}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* priceBuy */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="priceBuy">
                    قیمت فروش
                  </Label>
                  <Input
                    value={updateProductController.values.priceBuy}
                    onChange={updateProductController.handleChange}
                    type="number"
                    id="priceBuy"
                    name="priceBuy"
                    placeholder="قیمت فروش را وارد کنید"
                    invalid={
                      updateProductController.touched.priceBuy
                        ? updateProductController.errors.priceBuy
                        : null
                    }
                  />
                  {updateProductController.touched.priceBuy &&
                  updateProductController.errors.priceBuy ? (
                    <FormFeedback>
                      {updateProductController.errors.priceBuy}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* brandName */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="brandName">
                    نام برند محصول
                  </Label>
                  <Input
                    value={updateProductController.values.brandName}
                    onChange={updateProductController.handleChange}
                    type="text"
                    id="brandName"
                    name="brandName"
                    placeholder="نام برند محصول را وارد کنید"
                    invalid={
                      updateProductController.touched.brandName
                        ? updateProductController.errors.brandName
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
                    value={updateProductController.values.serial}
                    onChange={updateProductController.handleChange}
                    type="text"
                    id="serial"
                    name="serial"
                    placeholder="سریال محصول را وارد کنید"
                    invalid={
                      updateProductController.touched.serial
                        ? updateProductController.errors.serial
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
                        checked={updateProductController.values.active}
                        onChange={(e) => {
                          updateProductController.setFieldValue(
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
                      updateProductController.setFieldValue("summary", value)
                    }
                    value={updateProductController.values.summary}
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
                      updateProductController.setFieldValue(
                        "description",
                        value
                      )
                    }
                    value={updateProductController.values.description}
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
                      updateProductController.setFieldValue("review", value)
                    }
                    value={updateProductController.values.review}
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
                      updateProductController.setFieldValue("help", value)
                    }
                    value={updateProductController.values.help}
                  />
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateProduct}
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
export default UpdateProduct;
