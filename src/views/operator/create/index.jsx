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
import useOperator from "../../../hooks/use_operator";

const CreateOperator = () => {
  const { createOperatorController, loadings } = useOperator();

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد اپراتور جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد اپراتور جدید" }]}
      />
      <Form onSubmit={createOperatorController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد اپراتور جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام اپراتور
                </Label>
                <Input
                  // disabled={loadings.submit}
                  value={createOperatorController.values.name}
                  onChange={createOperatorController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام اپراتور را وارد کنید"
                  invalid={
                    createOperatorController.touched.name
                      ? createOperatorController.errors.name
                      : null
                  }
                />
                {createOperatorController.touched.name &&
                createOperatorController.errors.name ? (
                  <FormFeedback>
                    {createOperatorController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* digit */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="digit">
                  تعداد ارقام سریال سیمکارت
                </Label>
                <Input
                  value={createOperatorController.values.digit}
                  onChange={createOperatorController.handleChange}
                  type="number"
                  id="digit"
                  name="digit"
                  placeholder="تعداد ارقام سریال سیمکارت را وارد کنید"
                  invalid={
                    createOperatorController.touched.digit
                      ? createOperatorController.errors.digit
                      : null
                  }
                />
                {createOperatorController.touched.digit &&
                createOperatorController.errors.digit ? (
                  <FormFeedback>
                    {createOperatorController.errors.digit}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col
                xs="12"
                sm="6"
                md="4"
                className="mb-1 d-flex align-items-center"
              >
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={createOperatorController.values.active}
                      onChange={(e) => {
                        createOperatorController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      اپراتور فعال باشد
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
              loading={loadings.createOperator}
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
export default CreateOperator;
