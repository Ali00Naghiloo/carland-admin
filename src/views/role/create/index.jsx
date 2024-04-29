import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useRole from "../../../hooks/use_role";
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

const CreateRole = () => {
  const { createRoleController, loadings } = useRole();

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد نقش جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد نقش جدید" }]}
      />
      {/* form */}
      <Form onSubmit={createRoleController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد نقش جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام نقش
                </Label>
                <Input
                  // disabled={loadings.submit}
                  value={createRoleController.values.name}
                  onChange={createRoleController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام نقش را وارد کنید"
                  invalid={
                    createRoleController.touched.name
                      ? createRoleController.errors.name
                      : null
                  }
                />
                {createRoleController.touched.name &&
                createRoleController.errors.name ? (
                  <FormFeedback>
                    {createRoleController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* isActive */}
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
                      checked={
                        createRoleController.values.isActive === true
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        createRoleController.setFieldValue(
                          "isActive",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      نقش فعال باشد
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
              loading={loadings.createRole}
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
export default CreateRole;
