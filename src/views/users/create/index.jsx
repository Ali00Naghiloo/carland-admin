import { Fragment, useEffect, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useUsers from "../../../hooks/use_users";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
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
import { setVerifyModal } from "../../../redux/users_slice";
import CustomButton from "../../../components/button";
import Confirm from "../../../components/confirm";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "../../../components/datepicker";
import PinCodeInput from "../../../components/pin_input";

const CreateUser = () => {
  const dispatch = useDispatch();
  const {
    getRoles,
    getNationalities,
    createUserController,
    verifyUserMobileController,
    createUserWithoutMobileController,
    roleData,
    nationalityData,
    loadings,
    getRolesLoading,
    getNationalityLoading,
  } = useUsers();

  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const today = useSelector((state) => state.app.today);
  const verifyModal = useSelector((state) => state.users.verifyModal);

  useEffect(() => {
    getRoles();
    // getNationalities();
  }, []);

  useEffect(() => {
    if (activeTab === "1") {
      createUserWithoutMobileController.resetForm();
    } else if (activeTab === "2") {
      createUserController.resetForm();
    }
  }, [activeTab]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد کاربر جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد کاربر جدید" }]}
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
            <span className="fw-bold">کاربر با شماره موبایل</span>
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
            <span className="fw-bold">کاربر بدون شماره موبایل</span>
          </NavLink>
        </NavItem>
      </Nav>
      {/* forms */}
      <TabContent activeTab={activeTab}>
        {/* with mobile form */}
        <TabPane tabId="1">
          <Form onSubmit={createUserController.handleSubmit}>
            <Card className="w-100 card">
              {/* card header */}
              <CardHeader className="border-bottom">
                <CardTitle>فرم ایجاد کاربر جدید</CardTitle>
              </CardHeader>
              {/* form fields */}
              <CardBody className="pt-2">
                <Row>
                  {/* RoleId */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="RoleId">
                      نقش کاربر
                    </Label>
                    <Select
                      value={createUserController.values.RoleId}
                      onChange={(value) =>
                        createUserController.setFieldValue("RoleId", value)
                      }
                      isLoading={getRolesLoading}
                      noOptionsMessage={() => " نقشی یافت نشد."}
                      theme={selectThemeColors}
                      closeMenuOnSelect={true}
                      isDisabled={getRolesLoading}
                      placeholder="نقش کاربر را انتخاب کنید"
                      options={roleData}
                      className={`react-select ${
                        createUserController.touched.RoleId &&
                        createUserController.errors.RoleId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="RoleId"
                      name="RoleId"
                    />
                    {createUserController.touched.RoleId &&
                    createUserController.errors.RoleId ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد نقش کاربر اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* NationalityId */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="NationalityId">
                      ملیت کاربر
                    </Label>
                    <Select
                      value={createUserController.values.NationalityId}
                      onChange={(value) =>
                        createUserController.setFieldValue(
                          "NationalityId",
                          value
                        )
                      }
                      isLoading={getNationalityLoading}
                      noOptionsMessage={() => " ملیتی یافت نشد."}
                      theme={selectThemeColors}
                      closeMenuOnSelect={true}
                      isDisabled={getNationalityLoading}
                      placeholder="ملیت کاربر را انتخاب کنید"
                      options={nationalityData}
                      className={`react-select ${
                        createUserController.touched.NationalityId &&
                        createUserController.errors.NationalityId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="NationalityId"
                      name="NationalityId"
                    />
                    {createUserController.touched.NationalityId &&
                    createUserController.errors.NationalityId ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد ملیت کاربر اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* NationalCode */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="NationalCode">
                      کد ملی
                    </Label>
                    <Input
                      value={createUserController.values.NationalCode}
                      onChange={(e) => {
                        createUserController.setFieldValue(
                          "NationalCode",
                          e.target.value
                        );
                      }}
                      type="number"
                      id="NationalCode"
                      name="NationalCode"
                      placeholder="کد ملی را وارد کنید"
                      invalid={
                        createUserController.touched.NationalCode
                          ? createUserController.errors.NationalCode
                          : null
                      }
                    />
                    {createUserController.touched.NationalCode &&
                    createUserController.errors.NationalCode ? (
                      <FormFeedback>
                        {createUserController.errors.NationalCode}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* PhoneNumber */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="PhoneNumber">
                      شماره موبایل
                    </Label>
                    <Input
                      value={createUserController.values.PhoneNumber}
                      onChange={createUserController.handleChange}
                      type="number"
                      id="PhoneNumber"
                      name="PhoneNumber"
                      placeholder="شماره موبایل را وارد کنید"
                      invalid={
                        createUserController.touched.PhoneNumber
                          ? createUserController.errors.PhoneNumber
                          : null
                      }
                    />
                    {createUserController.touched.PhoneNumber &&
                    createUserController.errors.PhoneNumber ? (
                      <FormFeedback>
                        {createUserController.errors.PhoneNumber}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* Birthdate */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="Birthdate">
                      تاریخ تولد
                    </Label>
                    <CustomDatePicker
                      calendarPopperPosition="bottom"
                      inputName="Birthdate"
                      maximumDate={today}
                      inputClassName={
                        createUserController.touched.Birthdate &&
                        createUserController.errors.Birthdate
                          ? "form_error"
                          : ""
                      }
                      value={createUserController.values.Birthdate}
                      onChange={(value) => {
                        createUserController.setFieldValue("Birthdate", value);
                      }}
                      onClear={() =>
                        createUserController.setFieldValue("Birthdate", null)
                      }
                      inputPlaceholder="انتخاب تاریخ"
                    />
                    {createUserController.touched.Birthdate &&
                    createUserController.errors.Birthdate ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد تاریخ تولد اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                </Row>
              </CardBody>
              {/* card footer */}
              <CardFooter className="border-top d-flex justify-content-center">
                {/* submit button */}
                <CustomButton
                  loading={loadings.verifyUser}
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
        {/* with mobile form */}
        <TabPane tabId="2">
          <Form onSubmit={createUserWithoutMobileController.handleSubmit}>
            <Card className="w-100 card">
              {/* card header */}
              <CardHeader className="border-bottom">
                <CardTitle>فرم ایجاد کاربر جدید</CardTitle>
              </CardHeader>
              {/* form fields */}
              <CardBody className="pt-2">
                <Row>
                  {/* RoleId */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="RoleId">
                      نقش کاربر
                    </Label>
                    <Select
                      value={createUserWithoutMobileController.values.RoleId}
                      onChange={(value) =>
                        createUserWithoutMobileController.setFieldValue(
                          "RoleId",
                          value
                        )
                      }
                      isLoading={getRolesLoading}
                      noOptionsMessage={() => " نقشی یافت نشد."}
                      theme={selectThemeColors}
                      closeMenuOnSelect={true}
                      isDisabled={getRolesLoading}
                      placeholder="نقش کاربر را انتخاب کنید"
                      options={roleData}
                      className={`react-select ${
                        createUserWithoutMobileController.touched.RoleId &&
                        createUserWithoutMobileController.errors.RoleId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="RoleId"
                      name="RoleId"
                    />
                    {createUserWithoutMobileController.touched.RoleId &&
                    createUserWithoutMobileController.errors.RoleId ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد نقش کاربر اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* NationalityId */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="NationalityId">
                      ملیت کاربر
                    </Label>
                    <Select
                      value={
                        createUserWithoutMobileController.values.NationalityId
                      }
                      onChange={(value) =>
                        createUserWithoutMobileController.setFieldValue(
                          "NationalityId",
                          value
                        )
                      }
                      isLoading={getNationalityLoading}
                      noOptionsMessage={() => " ملیتی یافت نشد."}
                      theme={selectThemeColors}
                      closeMenuOnSelect={true}
                      isDisabled={getNationalityLoading}
                      placeholder="ملیت کاربر را انتخاب کنید"
                      options={nationalityData}
                      className={`react-select ${
                        createUserWithoutMobileController.touched
                          .NationalityId &&
                        createUserWithoutMobileController.errors.NationalityId
                          ? "form_error"
                          : ""
                      }`}
                      classNamePrefix="select"
                      id="NationalityId"
                      name="NationalityId"
                    />
                    {createUserWithoutMobileController.touched.NationalityId &&
                    createUserWithoutMobileController.errors.NationalityId ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد ملیت کاربر اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* NationalCode */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="NationalCode">
                      کد ملی
                    </Label>
                    <Input
                      value={
                        createUserWithoutMobileController.values.NationalCode
                      }
                      onChange={(e) => {
                        createUserWithoutMobileController.setFieldValue(
                          "NationalCode",
                          e.target.value
                        );
                      }}
                      type="number"
                      id="NationalCode"
                      name="NationalCode"
                      placeholder="کد ملی را وارد کنید"
                      invalid={
                        createUserWithoutMobileController.touched.NationalCode
                          ? createUserWithoutMobileController.errors
                              .NationalCode
                          : null
                      }
                    />
                    {createUserWithoutMobileController.touched.NationalCode &&
                    createUserWithoutMobileController.errors.NationalCode ? (
                      <FormFeedback>
                        {createUserWithoutMobileController.errors.NationalCode}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* Birthdate */}
                  <Col xs="12" sm="6" md="4" className="mb-1">
                    <Label className="form-label" for="Birthdate">
                      تاریخ تولد
                    </Label>
                    <CustomDatePicker
                      calendarPopperPosition="bottom"
                      inputName="Birthdate"
                      maximumDate={today}
                      inputClassName={
                        createUserWithoutMobileController.touched.Birthdate &&
                        createUserWithoutMobileController.errors.Birthdate
                          ? "form_error"
                          : ""
                      }
                      value={createUserWithoutMobileController.values.Birthdate}
                      onChange={(value) => {
                        createUserWithoutMobileController.setFieldValue(
                          "Birthdate",
                          value
                        );
                      }}
                      onClear={() =>
                        createUserWithoutMobileController.setFieldValue(
                          "Birthdate",
                          null
                        )
                      }
                      inputPlaceholder="انتخاب تاریخ"
                    />
                    {createUserWithoutMobileController.touched.Birthdate &&
                    createUserWithoutMobileController.errors.Birthdate ? (
                      <FormFeedback style={{ display: "block" }}>
                        فیلد تاریخ تولد اجباری است.
                      </FormFeedback>
                    ) : null}
                  </Col>
                </Row>
              </CardBody>
              {/* card footer */}
              <CardFooter className="border-top d-flex justify-content-center">
                {/* submit button */}
                <CustomButton
                  loading={loadings.createUserWithoutMobile}
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
      {/* verify confirm */}
      <Confirm
        visible={verifyModal}
        setVisible={setVerifyModal}
        title={"لطفا کد ارسال شده به شماره موبایل کاربر را وارد کنید"}
        noAction={() => dispatch(setVerifyModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.verifyUserMobile}
        yesAction={() => verifyUserMobileController.handleSubmit()}
        yesColor={"success"}
        yesTitle={"تایید کاربر"}
        type={"global"}
      >
        <div style={{ width: 300 }} className="mx-auto">
          <PinCodeInput
            onChange={(value) => {
              verifyUserMobileController.setFieldValue("SmsCode", value);
            }}
            error={
              verifyUserMobileController.touched.SmsCode &&
              verifyUserMobileController.errors.SmsCode
            }
            disabled={loadings.verifyUserMobile}
          />
        </div>
      </Confirm>
    </Fragment>
  );
};
export default CreateUser;
