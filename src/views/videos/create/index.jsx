import { Fragment } from "react";
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
import CustomButton from "../../../components/button";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";
import useVideos from "../../../hooks/use_videos";
import { Editor } from "@tinymce/tinymce-react";

const CreateVideo = () => {
  const { createVideoController, loadings } = useVideos();

  const handleUploadVideo = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        createVideoController.setFieldValue("link", "");
        createVideoController.setFieldValue("link", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد ویدیو جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد ویدیو جدید" }]}
      />
      <Form onSubmit={createVideoController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد ویدیو جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* upload video */}
            <div className="d-flex flex-column align-items-center mb-1">
              <div className="mb-1 w-100">
                {createVideoController.values.link.length > 0 ? (
                  <video controls style={{ width: "100%", height: 300 }}>
                    <source
                      src={createVideoController.values.link}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <div
                    style={
                      createVideoController.touched.link &&
                      createVideoController.errors.link
                        ? {
                            height: 300,
                            borderRadius: 8,
                            border: "1px solid red",
                          }
                        : {
                            height: 300,
                            borderRadius: 8,
                            border: "1px solid rgba(210,210,210,.9)",
                          }
                    }
                    className="w-100 d-flex justify-content-center align-items-center"
                  >
                    <span
                      style={
                        createVideoController.touched.link &&
                        createVideoController.errors.link
                          ? {
                              color: "red",
                              fontSize: 20,
                            }
                          : { fontSize: 20 }
                      }
                    >
                      ویدیو خود را انتخاب کنید.
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <Button tag={Label} size="md" color="primary">
                    انتخاب ویدیو
                    <Input
                      type="file"
                      onChange={handleUploadVideo}
                      hidden
                      accept="video/*"
                    />
                  </Button>
                </div>
              </div>
            </div>
            {/* form fields */}
            <Row>
              {/* title */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="title">
                  عنوان ویدیو
                </Label>
                <Input
                  value={createVideoController.values.title}
                  onChange={createVideoController.handleChange}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="عنوان ویدیو را وارد کنید"
                  invalid={
                    createVideoController.touched.title
                      ? createVideoController.errors.title
                      : null
                  }
                />
                {createVideoController.touched.title &&
                createVideoController.errors.title ? (
                  <FormFeedback>
                    {createVideoController.errors.title}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* description */}
              <Col xs="12" className="mb-2">
                <Label className="form-label" for="description">
                  توضیحات ویدیو
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
                    createVideoController.setFieldValue("description", value)
                  }
                  value={createVideoController.values.description}
                />
                {createVideoController.touched.description &&
                createVideoController.errors.description ? (
                  <FormFeedback>
                    {createVideoController.errors.description}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createVideo}
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
export default CreateVideo;
