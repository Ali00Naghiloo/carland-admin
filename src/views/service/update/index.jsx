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
import useService from "../../../hooks/use_service";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";
import { Editor } from "@tinymce/tinymce-react";
import CustomLoading from "../../../components/loading";

const UpdateService = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getServiceById,
    getSelectCategories,
    getOperators,
    viewServiceData,
    updateServiceController,
    operatorsList,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  } = useService();

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateServiceController.setFieldValue("image", reader.result);
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
      getServiceById(entity_id);
      getOperators();
      updateServiceController.setFieldValue("id", entity_id);
    } else {
      navigate("/service/all");
    }
  }, []);

  useEffect(() => {
    if (viewServiceData) {
      // name
      if (viewServiceData?.name) {
        updateServiceController.setFieldValue("name", viewServiceData?.name);
      }
      // image
      if (viewServiceData?.image) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewServiceData?.image
        ).then((item) => {
          updateServiceController.setFieldValue("image", item);
        });
      }
      // opratorTableId
      if (viewServiceData?.opratorTableId) {
        updateServiceController.setFieldValue("opratorTableId", {
          label: viewServiceData?.opratorTable.name,
          value: viewServiceData?.opratorTable.id,
        });
      }
      // categoryId
      if (viewServiceData?.categoryId) {
        updateServiceController.setFieldValue("categoryId", {
          label: viewServiceData?.category.name,
          value: viewServiceData?.category.id,
        });
      }
      // creditPrice
      if (viewServiceData?.creditPrice) {
        updateServiceController.setFieldValue(
          "creditPrice",
          viewServiceData?.creditPrice
        );
      }
      // fixedPrice
      if (viewServiceData?.fixedPrice) {
        updateServiceController.setFieldValue(
          "fixedPrice",
          viewServiceData?.fixedPrice
        );
      }
      // summary
      if (viewServiceData?.summary) {
        updateServiceController.setFieldValue(
          "summary",
          viewServiceData?.summary
        );
      }
      // isActive
      updateServiceController.setFieldValue(
        "isActive",
        viewServiceData?.isActive
      );
    }
  }, [viewServiceData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش خدمت"
        data={[{ title: "داشبورد" }, { title: "ویرایش خدمت" }]}
      />
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateServiceController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش خدمت</CardTitle>
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
                      updateServiceController.values.image.length > 0
                        ? updateServiceController.values.image
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
                    value={updateServiceController.values.name}
                    onChange={updateServiceController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام خدمت را وارد کنید"
                    invalid={
                      updateServiceController.touched.name
                        ? updateServiceController.errors.name
                        : null
                    }
                  />
                  {updateServiceController.touched.name &&
                  updateServiceController.errors.name ? (
                    <FormFeedback>
                      {updateServiceController.errors.name}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* opratorTableId */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="opratorTableId">
                    اپراتور
                  </Label>
                  <Select
                    value={updateServiceController.values.opratorTableId}
                    onChange={(value) =>
                      updateServiceController.setFieldValue(
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
                      updateServiceController.touched.opratorTableId &&
                      updateServiceController.errors.opratorTableId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="opratorTableId"
                    name="opratorTableId"
                  />
                  {updateServiceController.touched.opratorTableId &&
                  updateServiceController.errors.opratorTableId ? (
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
                    value={updateServiceController.values.categoryId}
                    loadOptions={getSelectCategories}
                    onChange={(value) =>
                      updateServiceController.setFieldValue("categoryId", value)
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
                      updateServiceController.touched.categoryId &&
                      updateServiceController.errors.categoryId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="categoryId"
                    name="categoryId"
                  />
                  {updateServiceController.touched.categoryId &&
                  updateServiceController.errors.categoryId ? (
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
                    value={updateServiceController.values.creditPrice}
                    onChange={updateServiceController.handleChange}
                    type="number"
                    id="creditPrice"
                    name="creditPrice"
                    placeholder="قیمت اعتباری را وارد کنید"
                    invalid={
                      updateServiceController.touched.creditPrice
                        ? updateServiceController.errors.creditPrice
                        : null
                    }
                  />
                  {updateServiceController.touched.creditPrice &&
                  updateServiceController.errors.creditPrice ? (
                    <FormFeedback>
                      {updateServiceController.errors.creditPrice}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* fixedPrice */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="fixedPrice">
                    قیمت دائمی
                  </Label>
                  <Input
                    value={updateServiceController.values.fixedPrice}
                    onChange={updateServiceController.handleChange}
                    type="number"
                    id="fixedPrice"
                    name="fixedPrice"
                    placeholder="قیمت دائمی را وارد کنید"
                    invalid={
                      updateServiceController.touched.fixedPrice
                        ? updateServiceController.errors.fixedPrice
                        : null
                    }
                  />
                  {updateServiceController.touched.fixedPrice &&
                  updateServiceController.errors.fixedPrice ? (
                    <FormFeedback>
                      {updateServiceController.errors.fixedPrice}
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
                          updateServiceController.values.isActive === true
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          updateServiceController.setFieldValue(
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
                      updateServiceController.setFieldValue("summary", value)
                    }
                    value={updateServiceController.values.summary}
                  />
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateService}
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
export default UpdateService;
