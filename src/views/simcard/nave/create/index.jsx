import { Fragment, useEffect, useState } from "react";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../../components/button";
import useSimcardNave from "../../../../hooks/use_simcard_nave";

const CreateSimcardNave = () => {
  const {
    getOperators,
    createSimcardNaveController,
    createMultiSimcardNaveController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useSimcardNave();

  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getOperators();
  }, []);

  useEffect(() => {
    if (activeTab === "1") {
      createMultiSimcardNaveController.resetForm();
    } else {
      createSimcardNaveController.resetForm();
    }
  }, [activeTab]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد سیمکارت خام جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد سیمکارت خام جدید" }]}
      />
      {/* tabs */}
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink
            style={{ paddingRight: 8, paddingLeft: 8, marginLeft: 5 }}
            active={activeTab === "1"}
            onClick={() => {
              toggleTab("1");
            }}
          >
            <span className="fw-bold">ایجاد تکی</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ paddingRight: 8, paddingLeft: 8, marginLeft: 5 }}
            active={activeTab === "2"}
            onClick={() => {
              toggleTab("2");
            }}
          >
            <span className="fw-bold">ایجاد دسته ای</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* single */}
        <TabPane tabId="1">
          <Form onSubmit={createSimcardNaveController.handleSubmit}>
            <Card className="w-100 card">
              {/* card header */}
              <CardHeader className="border-bottom">
                <CardTitle>فرم ایجاد سیمکارت خام جدید</CardTitle>
              </CardHeader>
              <CardBody className="pt-2">
                {/* form fields */}
                <Row>
                  {/* operatorId */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="operatorId">
                      اپراتور
                    </Label>
                    <Select
                      value={createSimcardNaveController.values.operatorId}
                      onChange={(value) =>
                        createSimcardNaveController.setFieldValue(
                          "operatorId",
                          value
                        )
                      }
                      options={operatorsList}
                      isDisabled={getOperatorsLoading}
                      isLoading={getOperatorsLoading}
                      closeMenuOnSelect={true}
                      theme={selectThemeColors}
                      isClearable={false}
                      placeholder="انتخاب کنید"
                      className={`react-select ${
                        createSimcardNaveController.touched.operatorId &&
                        createSimcardNaveController.errors.operatorId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="operatorId"
                      name="operatorId"
                    />
                    {createSimcardNaveController.touched.operatorId &&
                    createSimcardNaveController.errors.operatorId ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد اپراتور اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* serial */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="serial">
                      سریال سیمکارت
                    </Label>
                    <Input
                      value={createSimcardNaveController.values.serial}
                      onChange={createSimcardNaveController.handleChange}
                      type="text"
                      id="serial"
                      name="serial"
                      placeholder="سریال سیمکارت را وارد کنید"
                      invalid={
                        createSimcardNaveController.touched.serial
                          ? createSimcardNaveController.errors.serial
                          : null
                      }
                    />
                    {createSimcardNaveController.touched.serial &&
                    createSimcardNaveController.errors.serial ? (
                      <FormFeedback>
                        {createSimcardNaveController.errors.serial}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* price */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="price">
                      قیمت
                    </Label>
                    <Input
                      value={createSimcardNaveController.values.price}
                      onChange={createSimcardNaveController.handleChange}
                      type="number"
                      id="price"
                      name="price"
                      placeholder="قیمت را وارد کنید"
                      invalid={
                        createSimcardNaveController.touched.price
                          ? createSimcardNaveController.errors.price
                          : null
                      }
                    />
                    {createSimcardNaveController.touched.price &&
                    createSimcardNaveController.errors.price ? (
                      <FormFeedback>
                        {createSimcardNaveController.errors.price}
                      </FormFeedback>
                    ) : null}
                  </Col>
                </Row>
              </CardBody>
              {/* card footer */}
              <CardFooter className="border-top d-flex justify-content-center">
                {/* submit button */}
                <CustomButton
                  loading={loadings.createSimcardNave}
                  type="submit"
                  color="primary"
                  style={{ minWidth: 150 }}
                >
                  ثبت
                </CustomButton>
              </CardFooter>
            </Card>
          </Form>
        </TabPane>
        {/* multi */}
        <TabPane tabId="2">
          <Form onSubmit={createMultiSimcardNaveController.handleSubmit}>
            <Card className="w-100 card">
              {/* card header */}
              <CardHeader className="border-bottom">
                <CardTitle>
                  فرم ایجاد سیمکارت خام جدید به صورت دسته ای
                </CardTitle>
              </CardHeader>
              <CardBody className="pt-2">
                {/* form fields */}
                <Row>
                  {/* operatorId */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="operatorId">
                      اپراتور
                    </Label>
                    <Select
                      value={createMultiSimcardNaveController.values.operatorId}
                      onChange={(value) =>
                        createMultiSimcardNaveController.setFieldValue(
                          "operatorId",
                          value
                        )
                      }
                      options={operatorsList}
                      isDisabled={getOperatorsLoading}
                      isLoading={getOperatorsLoading}
                      closeMenuOnSelect={true}
                      theme={selectThemeColors}
                      isClearable={false}
                      placeholder="انتخاب کنید"
                      className={`react-select ${
                        createMultiSimcardNaveController.touched.operatorId &&
                        createMultiSimcardNaveController.errors.operatorId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="operatorId"
                      name="operatorId"
                    />
                    {createMultiSimcardNaveController.touched.operatorId &&
                    createMultiSimcardNaveController.errors.operatorId ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد اپراتور اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* startNumberSerial */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="startNumberSerial">
                      سریال شروع
                    </Label>
                    <Input
                      value={
                        createMultiSimcardNaveController.values
                          .startNumberSerial
                      }
                      onChange={createMultiSimcardNaveController.handleChange}
                      type="text"
                      id="startNumberSerial"
                      name="startNumberSerial"
                      placeholder="سریال شروع را وارد کنید"
                      invalid={
                        createMultiSimcardNaveController.touched
                          .startNumberSerial
                          ? createMultiSimcardNaveController.errors
                              .startNumberSerial
                          : null
                      }
                    />
                    {createMultiSimcardNaveController.touched
                      .startNumberSerial &&
                    createMultiSimcardNaveController.errors
                      .startNumberSerial ? (
                      <FormFeedback>
                        {
                          createMultiSimcardNaveController.errors
                            .startNumberSerial
                        }
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* endNumberSerial */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="endNumberSerial">
                      سریال پایان
                    </Label>
                    <Input
                      value={
                        createMultiSimcardNaveController.values.endNumberSerial
                      }
                      onChange={createMultiSimcardNaveController.handleChange}
                      type="text"
                      id="endNumberSerial"
                      name="endNumberSerial"
                      placeholder="سریال پایان را وارد کنید"
                      invalid={
                        createMultiSimcardNaveController.touched.endNumberSerial
                          ? createMultiSimcardNaveController.errors
                              .endNumberSerial
                          : null
                      }
                    />
                    {createMultiSimcardNaveController.touched.endNumberSerial &&
                    createMultiSimcardNaveController.errors.endNumberSerial ? (
                      <FormFeedback>
                        {
                          createMultiSimcardNaveController.errors
                            .endNumberSerial
                        }
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* price */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="price">
                      قیمت
                    </Label>
                    <Input
                      value={createMultiSimcardNaveController.values.price}
                      onChange={createMultiSimcardNaveController.handleChange}
                      type="number"
                      id="price"
                      name="price"
                      placeholder="قیمت را وارد کنید"
                      invalid={
                        createMultiSimcardNaveController.touched.price
                          ? createMultiSimcardNaveController.errors.price
                          : null
                      }
                    />
                    {createMultiSimcardNaveController.touched.price &&
                    createMultiSimcardNaveController.errors.price ? (
                      <FormFeedback>
                        {createMultiSimcardNaveController.errors.price}
                      </FormFeedback>
                    ) : null}
                  </Col>
                </Row>
              </CardBody>
              {/* card footer */}
              <CardFooter className="border-top d-flex justify-content-center">
                {/* submit button */}
                <CustomButton
                  loading={loadings.createSimcardNave}
                  type="submit"
                  color="primary"
                  style={{ minWidth: 150 }}
                >
                  ثبت
                </CustomButton>
              </CardFooter>
            </Card>
          </Form>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CreateSimcardNave;
