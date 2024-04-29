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
import CustomButton from "../../../components/button";
import useSms from "../../../hooks/use_sms";
import CustomLoading from "../../../components/loading";

const UpdateSms = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getSmsById,
    viewSmsData,
    updateSmsController,
    loadings,
    getByIdLoading,
  } = useSms();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getSmsById(entity_id);
      updateSmsController.setFieldValue("id", entity_id);
    } else {
      navigate("/sms/all");
    }
  }, []);

  useEffect(() => {
    if (viewSmsData) {
      // title
      if (viewSmsData?.title) {
        updateSmsController.setFieldValue("title", viewSmsData?.title);
      }
      // contextBody
      if (viewSmsData?.contextBody) {
        updateSmsController.setFieldValue(
          "contextBody",
          viewSmsData?.contextBody
        );
      }
      // isActive
      updateSmsController.setFieldValue("isActive", viewSmsData?.isActive);
    }
  }, [viewSmsData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش پیامک"
        data={[{ title: "داشبورد" }, { title: "ویرایش پیامک" }]}
      />
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateSmsController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش پیامک</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* form fields */}
              <Row>
                {/* title */}
                <Col xs="12" sm="6" className="mb-1">
                  <Label className="form-label" for="title">
                    عنوان پیامک
                  </Label>
                  <Input
                    value={updateSmsController.values.title}
                    onChange={updateSmsController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="عنوان پیامک را وارد کنید"
                    invalid={
                      updateSmsController.touched.title
                        ? updateSmsController.errors.title
                        : null
                    }
                  />
                  {updateSmsController.touched.title &&
                  updateSmsController.errors.title ? (
                    <FormFeedback>
                      {updateSmsController.errors.title}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* contextBody */}
                <Col xs="12" className="mb-1">
                  <Label className="form-label" for="contextBody">
                    متن پیامک
                  </Label>
                  <Input
                    value={updateSmsController.values.contextBody}
                    onChange={updateSmsController.handleChange}
                    type="textarea"
                    id="contextBody"
                    name="contextBody"
                    placeholder="متن پیامک را وارد کنید"
                    invalid={
                      updateSmsController.touched.contextBody
                        ? updateSmsController.errors.contextBody
                        : null
                    }
                  />
                  {updateSmsController.touched.contextBody &&
                  updateSmsController.errors.contextBody ? (
                    <FormFeedback>
                      {updateSmsController.errors.contextBody}
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
                          updateSmsController.values.isActive === true
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          updateSmsController.setFieldValue(
                            "isActive",
                            e.target.checked
                          );
                        }}
                      />
                      <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                        پیامک فعال باشد
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
                loading={loadings.updateSms}
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
export default UpdateSms;
