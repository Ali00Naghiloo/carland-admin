import { Fragment, useEffect } from "react";
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
import { useSearchParams, useNavigate } from "react-router-dom";

const UpdateNationality = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateGradeController, loadings } = useNationality();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    let entity_title = searchParams.get("entity_title");
    if (entity_id) {
      updateGradeController.setFieldValue("nationality_id", entity_id);
      updateGradeController.setFieldValue("nationalityName", entity_title);
    } else {
      navigate("/nationality/all");
    }
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش ملیت"
        data={[{ title: "داشبورد" }, { title: "ویرایش ملیت" }]}
      />
      {/* form */}
      <Form onSubmit={updateGradeController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ویرایش ملیت</CardTitle>
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
                  value={updateGradeController.values.nationalityName}
                  onChange={updateGradeController.handleChange}
                  type="text"
                  id="nationalityName"
                  name="nationalityName"
                  placeholder="نام ملیت را وارد کنید"
                  invalid={
                    updateGradeController.touched.nationalityName
                      ? updateGradeController.errors.nationalityName
                      : null
                  }
                />
                {updateGradeController.touched.nationalityName &&
                updateGradeController.errors.nationalityName ? (
                  <FormFeedback>
                    {updateGradeController.errors.nationalityName}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.updateNationality}
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
export default UpdateNationality;
