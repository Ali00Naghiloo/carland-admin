import { Fragment, useState } from "react";
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
  FormGroup,
} from "reactstrap";
import CustomButton from "../../../components/button";
import useSliders from "../../../hooks/use_sliders";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";

const fileTypes = ["JPG", "PNG", "JPEG"];

const CreateSlider = () => {
  const { createSliderController, loadings } = useSliders();

  const [bannerImage, setBannerImage] = useState(null);
  const [isDrag, setIsDrag] = useState(false);

  const [mobileImage, setMobileImage] = useState(null);
  const [isDragMobile, setIsDragMobile] = useState(false);

  const handleUploadBanner = (file) => {
    if (file !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        createSliderController.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const handleUploadMobile = (file) => {
    if (file !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        createSliderController.setFieldValue("mobileImage", reader.result);
      };
      reader.readAsDataURL(file);
      setMobileImage(URL.createObjectURL(file));
    }
  };

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد اسلایدر جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد اسلایدر جدید" }]}
      />
      <Form onSubmit={createSliderController.handleSubmit}>
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
                  value={createSliderController.values.name}
                  onChange={createSliderController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام اسلایدر را وارد کنید"
                  invalid={
                    createSliderController.touched.name
                      ? createSliderController.errors.name
                      : null
                  }
                />
                {createSliderController.touched.name &&
                createSliderController.errors.name ? (
                  <FormFeedback>
                    {createSliderController.errors.name}
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
                  value={createSliderController.values.link}
                  onChange={createSliderController.handleChange}
                  type="text"
                  id="link"
                  name="link"
                  placeholder="لینک اسلایدر را وارد کنید"
                  invalid={
                    createSliderController.touched.link
                      ? createSliderController.errors.link
                      : null
                  }
                />
                {createSliderController.touched.link &&
                createSliderController.errors.link ? (
                  <FormFeedback>
                    {createSliderController.errors.link}
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
                      checked={createSliderController.values.active}
                      onChange={(e) => {
                        createSliderController.setFieldValue(
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
              <Col xs="12" className="profile_edit_banner_upload_wrapper mt-2">
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
                                  createSliderController.setFieldValue(
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
                                لطفا تصویر خود را بکشید و در این ناحیه بیندازید
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
                {createSliderController.touched.image &&
                createSliderController.errors.image ? (
                  <FormFeedback style={{ display: "block" }}>
                    {createSliderController.errors.image}
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
                                  createSliderController.setFieldValue(
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
                                لطفا تصویر خود را بکشید و در این ناحیه بیندازید
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
                {createSliderController.touched.mobileImage &&
                createSliderController.errors.mobileImage ? (
                  <FormFeedback style={{ display: "block" }}>
                    {createSliderController.errors.mobileImage}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createSlider}
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
export default CreateSlider;
