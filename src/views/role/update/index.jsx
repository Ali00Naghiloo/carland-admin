import { Fragment, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import CustomLoading from "../../../components/loading";

const UpdateRole = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getRoleById,
    updateRoleController,
    viewRoleData,
    getByIdLoading,
    loadings,
  } = useRole();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getRoleById(entity_id);
      updateRoleController.setFieldValue("role_id", entity_id);
    } else {
      navigate("/role/all");
    }
  }, []);

  useEffect(() => {
    if (viewRoleData) {
      updateRoleController.setFieldValue("name", viewRoleData?.name);
      updateRoleController.setFieldValue("isActive", viewRoleData?.isActive);
    }
  }, [viewRoleData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش نقش"
        data={[{ title: "داشبورد" }, { title: "ویرایش نقش" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateRoleController.handleSubmit}>
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
                    value={updateRoleController.values.name}
                    onChange={updateRoleController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام نقش را وارد کنید"
                    invalid={
                      updateRoleController.touched.name
                        ? updateRoleController.errors.name
                        : null
                    }
                  />
                  {updateRoleController.touched.name &&
                  updateRoleController.errors.name ? (
                    <FormFeedback>
                      {updateRoleController.errors.name}
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
                          updateRoleController.values.isActive === true
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          updateRoleController.setFieldValue(
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
                loading={loadings.UpdateRole}
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
export default UpdateRole;
