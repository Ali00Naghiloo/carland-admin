import { Fragment, useEffect, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import CustomLoading from "../../../components/loading";
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/button";
import useSliders from "../../../hooks/use_sliders";
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
  FormGroup,
} from "reactstrap";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";

const fileTypes = ["JPG", "PNG", "JPEG"];

const UpdateSlider = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    updateSliderController,
    getSliderById,
    viewSliderData,
    loadings,
    getByIdLoading,
  } = useSliders();

  const [bannerImage, setBannerImage] = useState(null);
  const [isDrag, setIsDrag] = useState(false);

  const [mobileImage, setMobileImage] = useState(null);
  const [isDragMobile, setIsDragMobile] = useState(false);

  const handleUploadBanner = (file) => {
    if (file !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateSliderController.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const handleUploadMobile = (file) => {
    if (file !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateSliderController.setFieldValue("mobileImage", reader.result);
      };
      reader.readAsDataURL(file);
      setMobileImage(URL.createObjectURL(file));
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
      getSliderById(entity_id);
      updateSliderController.setFieldValue("slider_id", entity_id);
    } else {
      navigate("/sliders/all");
    }
  }, []);

  useEffect(() => {
    if (viewSliderData) {
      updateSliderController.setFieldValue("name", viewSliderData?.name);
      updateSliderController.setFieldValue("link", viewSliderData?.link);
      updateSliderController.setFieldValue("active", viewSliderData?.active);
      if (viewSliderData?.image) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewSliderData?.image
        ).then((item) => {
          updateSliderController.setFieldValue("image", item);
          setBannerImage(item);
        });
      }
      if (viewSliderData?.mobileImage) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewSliderData?.mobileImage
        ).then((item) => {
          updateSliderController.setFieldValue("mobileImage", item);
          setMobileImage(item);
        });
      }
    }
  }, [viewSliderData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش اسلایدر"
        data={[{ title: "داشبورد" }, { title: "ویرایش اسلایدر" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateSliderController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ایجاد اسلایدر جدید</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* form fields */}
              <Row>
                {/* name */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="name">
                    عنوان اسلایدر
                  </Label>
                  <Input
                    disabled={loadings.createSlider}
                    value={updateSliderController.values.name}
                    onChange={updateSliderController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام اسلایدر را وارد کنید"
                    invalid={
                      updateSliderController.touched.name
                        ? updateSliderController.errors.name
                        : null
                    }
                  />
                  {updateSliderController.touched.name &&
                  updateSliderController.errors.name ? (
                    <FormFeedback>
                      {updateSliderController.errors.name}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* link */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="link">
                    لینک اسلایدر
                  </Label>
                  <Input
                    disabled={loadings.createSlider}
                    value={updateSliderController.values.link}
                    onChange={updateSliderController.handleChange}
                    type="text"
                    id="link"
                    name="link"
                    placeholder="لینک اسلایدر را وارد کنید"
                    invalid={
                      updateSliderController.touched.link
                        ? updateSliderController.errors.link
                        : null
                    }
                  />
                  {updateSliderController.touched.link &&
                  updateSliderController.errors.link ? (
                    <FormFeedback>
                      {updateSliderController.errors.link}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* active */}
                <Col
                  xs="12"
                  sm="6"
                  md="4"
                  className="mb-1 d-flex flex-column justify-content-center"
                >
                  <div className="form-switch p-0 m-0">
                    <div className="d-flex">
                      <Input
                        type="switch"
                        id="rtl"
                        className="m-0 p-0"
                        name="RTL"
                        checked={updateSliderController.values.active}
                        onChange={(e) => {
                          updateSliderController.setFieldValue(
                            "active",
                            e.target.checked
                          );
                        }}
                      />
                      <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                        اسلایدر فعال باشد
                      </Label>
                    </div>
                  </div>
                </Col>
                {/* image */}
                <Col
                  xs="12"
                  className="profile_edit_banner_upload_wrapper mt-2"
                >
                  <Label>تصویر دسکتاپ</Label>
                  <FileUploader
                    handleChange={handleUploadBanner}
                    name="file"
                    multiple={false}
                    label="تصویر مورد نظر خود را بکشید و در این ناحیه بیندازید"
                    hoverTitle={"تصویر خود را در این ناحیه بیندازید"}
                    maxSize={3}
                    types={fileTypes}
                    onDraggingStateChange={(val) => setIsDrag(val)}
                    dropMessageStyle={{
                      background: "rgba(226, 226, 226, 0.366)",
                      borderRadius: 20,
                      fontSize: 22,
                    }}
                    children={
                      isDrag ? (
                        <div className="profile_edit_banner_upload"></div>
                      ) : (
                        <div className="profile_edit_banner_upload">
                          {bannerImage ? (
                            <div className="profile_edit_banner_uploaded">
                              <img src={bannerImage} alt="profile banner" />
                              <div>
                                <Button
                                  onClick={() => {
                                    updateSliderController.setFieldValue(
                                      "image",
                                      ""
                                    );
                                    setBannerImage(null);
                                  }}
                                  style={{ minWidth: 150 }}
                                  color="danger"
                                >
                                  پاک کردن
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div>
                                <AiOutlineCloudUpload fontSize={32} />
                                <span style={{ textAlign: "center" }}>
                                  لطفا تصویر خود را بکشید و در این ناحیه
                                  بیندازید
                                </span>
                              </div>
                              <div>
                                {fileTypes?.map((type, index) => (
                                  <div key={index}>{type}</div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )
                    }
                  />
                  {updateSliderController.touched.image &&
                  updateSliderController.errors.image ? (
                    <FormFeedback style={{ display: "block" }}>
                      {updateSliderController.errors.image}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* mobileImage */}
                <Col
                  xs="12"
                  sm="6"
                  className="profile_edit_banner_upload_wrapper mt-2"
                >
                  <Label>تصویر موبایل</Label>
                  <FileUploader
                    handleChange={handleUploadMobile}
                    name="file"
                    multiple={false}
                    label="تصویر مورد نظر خود را بکشید و در این ناحیه بیندازید"
                    hoverTitle={"تصویر خود را در این ناحیه بیندازید"}
                    maxSize={3}
                    types={fileTypes}
                    onDraggingStateChange={(val) => setIsDragMobile(val)}
                    dropMessageStyle={{
                      background: "rgba(226, 226, 226, 0.366)",
                      borderRadius: 20,
                      fontSize: 22,
                    }}
                    children={
                      isDragMobile ? (
                        <div className="profile_edit_banner_upload"></div>
                      ) : (
                        <div className="profile_edit_banner_upload">
                          {mobileImage ? (
                            <div className="profile_edit_banner_uploaded">
                              <img src={mobileImage} alt="profile banner" />
                              <div>
                                <Button
                                  onClick={() => {
                                    updateSliderController.setFieldValue(
                                      "mobileImage",
                                      ""
                                    );
                                    setMobileImage(null);
                                  }}
                                  style={{ minWidth: 150 }}
                                  color="danger"
                                >
                                  پاک کردن
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div>
                                <AiOutlineCloudUpload fontSize={32} />
                                <span style={{ textAlign: "center" }}>
                                  لطفا تصویر خود را بکشید و در این ناحیه
                                  بیندازید
                                </span>
                              </div>
                              <div>
                                {fileTypes?.map((type, index) => (
                                  <div key={index}>{type}</div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )
                    }
                  />
                  {updateSliderController.touched.mobileImage &&
                  updateSliderController.errors.mobileImage ? (
                    <FormFeedback style={{ display: "block" }}>
                      {updateSliderController.errors.mobileImage}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateSlider}
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
export default UpdateSlider;
