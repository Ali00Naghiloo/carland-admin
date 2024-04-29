import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useNationality from "../../../hooks/use_nationality";
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

const CreateNationality = () => {
  const { createNationalityController, loadings } = useNationality();

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد ملیت جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد ملیت جدید" }]}
      />
      {/* form */}
      <Form onSubmit={createNationalityController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد ملیت جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* nationalityName */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="nationalityName">
                  نام ملیت
                </Label>
                <Input
                  value={createNationalityController.values.nationalityName}
                  onChange={createNationalityController.handleChange}
                  type="text"
                  id="nationalityName"
                  name="nationalityName"
                  placeholder="نام ملیت را وارد کنید"
                  invalid={
                    createNationalityController.touched.nationalityName
                      ? createNationalityController.errors.nationalityName
                      : null
                  }
                />
                {createNationalityController.touched.nationalityName &&
                createNationalityController.errors.nationalityName ? (
                  <FormFeedback>
                    {createNationalityController.errors.nationalityName}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createNationality}
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
export default CreateNationality;
