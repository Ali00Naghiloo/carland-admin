import { Fragment, useEffect } from "react";
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
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/button";
import CustomLoading from "../../../components/loading";
import useOperator from "../../../hooks/use_operator";

const UpdateOperator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getOperatorById,
    updateOperatorController,
    viewOperatorData,
    loadings,
    getByIdLoading,
  } = useOperator();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getOperatorById(entity_id);
      updateOperatorController.setFieldValue("id", entity_id);
    } else {
      navigate("/operator/all");
    }
  }, []);

  useEffect(() => {
    if (viewOperatorData) {
      updateOperatorController.setFieldValue("name", viewOperatorData?.name);
      updateOperatorController.setFieldValue("digit", viewOperatorData?.digit);
      updateOperatorController.setFieldValue(
        "active",
        viewOperatorData?.active
      );
    }
  }, [viewOperatorData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش اپراتور"
        data={[{ title: "داشبورد" }, { title: "ویرایش اپراتور" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateOperatorController.handleSubmit}>
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
                    value={updateOperatorController.values.name}
                    onChange={updateOperatorController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام اپراتور را وارد کنید"
                    invalid={
                      updateOperatorController.touched.name
                        ? updateOperatorController.errors.name
                        : null
                    }
                  />
                  {updateOperatorController.touched.name &&
                  updateOperatorController.errors.name ? (
                    <FormFeedback>
                      {updateOperatorController.errors.name}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* digit */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="digit">
                    تعداد ارقام سریال سیمکارت
                  </Label>
                  <Input
                    value={updateOperatorController.values.digit}
                    onChange={updateOperatorController.handleChange}
                    type="number"
                    id="digit"
                    name="digit"
                    placeholder="تعداد ارقام سریال سیمکارت را وارد کنید"
                    invalid={
                      updateOperatorController.touched.digit
                        ? updateOperatorController.errors.digit
                        : null
                    }
                  />
                  {updateOperatorController.touched.digit &&
                  updateOperatorController.errors.digit ? (
                    <FormFeedback>
                      {updateOperatorController.errors.digit}
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
                        checked={updateOperatorController.values.active}
                        onChange={(e) => {
                          updateOperatorController.setFieldValue(
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
                loading={loadings.updateOperator}
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
export default UpdateOperator;
