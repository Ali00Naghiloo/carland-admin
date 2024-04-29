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
} from "reactstrap";
import CustomButton from "../../../components/button";
import useNumberLabel from "../../../hooks/use_number_label";

const CreateNumberLabel = () => {
  const { createNumberLabelController, loadings } = useNumberLabel();

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد برچسب سیمکارت جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد برچسب سیمکارت جدید" }]}
      />
      <Form onSubmit={createNumberLabelController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد برچسب سیمکارت جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام برچسب سیمکارت
                </Label>
                <Input
                  value={createNumberLabelController.values.name}
                  onChange={createNumberLabelController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام برچسب سیمکارت را وارد کنید"
                  invalid={
                    createNumberLabelController.touched.name
                      ? createNumberLabelController.errors.name
                      : null
                  }
                />
                {createNumberLabelController.touched.name &&
                createNumberLabelController.errors.name ? (
                  <FormFeedback>
                    {createNumberLabelController.errors.name}
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
                      checked={createNumberLabelController.values.active}
                      onChange={(e) => {
                        createNumberLabelController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      فعال باشد
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
              loading={loadings.createNumberLabel}
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
export default CreateNumberLabel;
