import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useGrade from "../../../hooks/use_grade";
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
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";

const CreateGrade = () => {
  const {
    getOperators,
    createGradeController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useGrade();

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد گرید جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد گرید جدید" }]}
      />
      {/* form */}
      <Form onSubmit={createGradeController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد گرید جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام گرید
                </Label>
                <Input
                  value={createGradeController.values.name}
                  onChange={createGradeController.handleChange}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام گرید را وارد کنید"
                  invalid={
                    createGradeController.touched.name
                      ? createGradeController.errors.name
                      : null
                  }
                />
                {createGradeController.touched.name &&
                createGradeController.errors.name ? (
                  <FormFeedback>
                    {createGradeController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* operatorId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="operatorId">
                  اپراتور
                </Label>
                <Select
                  value={createGradeController.values.operatorId}
                  onChange={(value) =>
                    createGradeController.setFieldValue("operatorId", value)
                  }
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    createGradeController.touched.operatorId &&
                    createGradeController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createGradeController.touched.operatorId &&
                createGradeController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* score */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="score">
                  امتیاز
                </Label>
                <Input
                  value={createGradeController.values.score}
                  onChange={createGradeController.handleChange}
                  type="number"
                  id="score"
                  name="score"
                  placeholder="امتیاز را وارد کنید"
                  invalid={
                    createGradeController.touched.score
                      ? createGradeController.errors.score
                      : null
                  }
                />
                {createGradeController.touched.score &&
                createGradeController.errors.score ? (
                  <FormFeedback>
                    {createGradeController.errors.score}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* active */}
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
                      checked={createGradeController.values.active}
                      onChange={(e) => {
                        createGradeController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      گرید فعال باشد
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
              loading={loadings.createGrade}
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
export default CreateGrade;
