import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import CustomLoading from "../../../components/loading";

const UpdateGrade = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getOperators,
    getGradeById,
    updateGradeController,
    viewGradeData,
    operatorsList,
    loadings,
    getOperatorsLoading,
    getByIdLoading,
  } = useGrade();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getGradeById(entity_id);
      getOperators();
      updateGradeController.setFieldValue("grade_id", entity_id);
    } else {
      navigate("/grade/all");
    }
  }, []);

  useEffect(() => {
    if (viewGradeData) {
      updateGradeController.setFieldValue("name", viewGradeData?.name);
      updateGradeController.setFieldValue("operatorId", {
        label: viewGradeData?.operator?.name,
        value: viewGradeData?.operator?.id,
      });
      updateGradeController.setFieldValue("score", viewGradeData?.score);
      updateGradeController.setFieldValue("active", viewGradeData?.active);
    }
  }, [viewGradeData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش گرید"
        data={[{ title: "داشبورد" }, { title: "ویرایش گرید" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateGradeController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش گرید</CardTitle>
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
                    value={updateGradeController.values.name}
                    onChange={updateGradeController.handleChange}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام گرید را وارد کنید"
                    invalid={
                      updateGradeController.touched.name
                        ? updateGradeController.errors.name
                        : null
                    }
                  />
                  {updateGradeController.touched.name &&
                  updateGradeController.errors.name ? (
                    <FormFeedback>
                      {updateGradeController.errors.name}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* operatorId */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="operatorId">
                    اپراتور
                  </Label>
                  <Select
                    value={updateGradeController.values.operatorId}
                    onChange={(value) =>
                      updateGradeController.setFieldValue("operatorId", value)
                    }
                    isLoading={getOperatorsLoading}
                    noOptionsMessage={() => " اپراتوری یافت نشد."}
                    theme={selectThemeColors}
                    closeMenuOnSelect={true}
                    isDisabled={getOperatorsLoading}
                    placeholder="اپراتور را انتخاب کنید"
                    options={operatorsList}
                    className={`react-select ${
                      updateGradeController.touched.operatorId &&
                      updateGradeController.errors.operatorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="operatorId"
                    name="operatorId"
                  />
                  {updateGradeController.touched.operatorId &&
                  updateGradeController.errors.operatorId ? (
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
                    value={updateGradeController.values.score}
                    onChange={updateGradeController.handleChange}
                    type="number"
                    id="score"
                    name="score"
                    placeholder="امتیاز را وارد کنید"
                    invalid={
                      updateGradeController.touched.score
                        ? updateGradeController.errors.score
                        : null
                    }
                  />
                  {updateGradeController.touched.score &&
                  updateGradeController.errors.score ? (
                    <FormFeedback>
                      {updateGradeController.errors.score}
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
                        checked={updateGradeController.values.active}
                        onChange={(e) => {
                          updateGradeController.setFieldValue(
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
                loading={loadings.updateGrade}
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
export default UpdateGrade;
