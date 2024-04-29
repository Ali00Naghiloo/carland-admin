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
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useScores from "../../../hooks/use_scores";

const CreateScore = () => {
  const {
    getOperators,
    getSelectProduct,
    getSelectService,
    createScoreController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useScores();

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد امتیاز جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد امتیاز جدید" }]}
      />
      <Form onSubmit={createScoreController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد امتیاز جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* operatorId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="operatorId">
                  اپراتور
                </Label>
                <Select
                  value={createScoreController.values.operatorId}
                  onChange={(value) => {
                    createScoreController.setFieldValue("operatorId", value);
                    createScoreController.setFieldValue("productId", []);
                    createScoreController.setFieldValue("serviceId", []);
                  }}
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    createScoreController.touched.operatorId &&
                    createScoreController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createScoreController.touched.operatorId &&
                createScoreController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* productId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="productId">
                  محصول
                </Label>
                <AsyncPaginate
                  isMulti={true}
                  value={createScoreController.values.productId}
                  loadOptions={getSelectProduct}
                  onChange={(value) =>
                    createScoreController.setFieldValue("productId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  isDisabled={!createScoreController.values.operatorId}
                  cacheUniqs={[createScoreController.values.operatorId]}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="محصول را انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="productId"
                  name="productId"
                />
              </Col>
              {/* serviceId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="serviceId">
                  خدمت
                </Label>
                <AsyncPaginate
                  isMulti={true}
                  value={createScoreController.values.serviceId}
                  loadOptions={getSelectService}
                  onChange={(value) =>
                    createScoreController.setFieldValue("serviceId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  isDisabled={!createScoreController.values.operatorId}
                  cacheUniqs={[createScoreController.values.operatorId]}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="خدمت را انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="serviceId"
                  name="serviceId"
                />
              </Col>
              {/* score */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="score">
                  امتیاز
                </Label>
                <Input
                  value={createScoreController.values.score}
                  onChange={createScoreController.handleChange}
                  type="number"
                  id="score"
                  name="score"
                  placeholder="امتیاز را وارد کنید"
                  invalid={
                    createScoreController.touched.score
                      ? createScoreController.errors.score
                      : null
                  }
                />
                {createScoreController.touched.score &&
                createScoreController.errors.score ? (
                  <FormFeedback>
                    {createScoreController.errors.score}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* active */}
              <Col
                xs="12"
                sm="6"
                md="3"
                className="mb-1 d-flex align-items-center"
              >
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={createScoreController.values.active}
                      onChange={(e) => {
                        createScoreController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      امتیاز فعال باشد
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
              loading={loadings.createScore}
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
export default CreateScore;
