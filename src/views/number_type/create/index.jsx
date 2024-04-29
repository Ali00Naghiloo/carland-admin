import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useNumberType from "../../../hooks/use_number_type";
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

const CreateNumberType = () => {
  const { createNumberTypeController, loadings } = useNumberType();

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد نوع سیمکارت"
        data={[{ title: "داشبورد" }, { title: "ایجاد نوع سیمکارت" }]}
      />
      <Form onSubmit={createNumberTypeController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد نوع سیمکارت جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام نوع سیمکارت
                </Label>
                <Input
                  value={createNumberTypeController.values.name}
                  onChange={createNumberTypeController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام نوع سیمکارت را وارد کنید"
                  invalid={
                    createNumberTypeController.touched.name
                      ? createNumberTypeController.errors.name
                      : null
                  }
                />
                {createNumberTypeController.touched.name &&
                createNumberTypeController.errors.name ? (
                  <FormFeedback>فیلد نام نوع سیمکارت اجباری است.</FormFeedback>
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
                      checked={createNumberTypeController.values.active}
                      onChange={(e) => {
                        createNumberTypeController.setFieldValue(
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
              loading={loadings.createNumberType}
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

export default CreateNumberType;
