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
  Button,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useAdmin from "../../../hooks/use_admin";
import InputPasswordToggle from "@components/input-password-toggle";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";

const CreateAdmin = () => {
  const {
    getRoles,
    createAdminController,
    roleData,
    loadings,
    getRolesLoading,
  } = useAdmin();

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        createAdminController.setFieldValue("avatar", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد ادمین جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد ادمین جدید" }]}
      />
      <Form onSubmit={createAdminController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد ادمین جدید</CardTitle>
          </CardHeader>
          {/* form fields */}
          <CardBody className="pt-2">
            {/* avatar */}
            <div className="d-flex flex-column align-items-center mb-3">
              <div className="mb-1">
                <img
                  style={{
                    objectFit: "cover",
                    border: "1px solid rgba(226, 226, 226, 0.366)",
                  }}
                  className="rounded"
                  src={
                    createAdminController.values.avatar.length > 0
                      ? createAdminController.values.avatar
                      : avatarBlank
                  }
                  alt="admin avatar"
                  height="100"
                  width="100"
                />
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <Button tag={Label} size="sm" color="primary">
                    انتخاب تصویر
                    <Input
                      type="file"
                      onChange={handleUploadImage}
                      hidden
                      accept="image/*"
                    />
                  </Button>
                </div>
              </div>
            </div>
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام
                </Label>
                <Input
                  value={createAdminController.values.name}
                  onChange={createAdminController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام را وارد کنید"
                  invalid={
                    createAdminController.touched.name
                      ? createAdminController.errors.name
                      : null
                  }
                />
                {createAdminController.touched.name &&
                createAdminController.errors.name ? (
                  <FormFeedback>
                    {createAdminController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* family */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="family">
                  نام خانوادگی
                </Label>
                <Input
                  value={createAdminController.values.family}
                  onChange={createAdminController.handleChange}
                  type="text"
                  id="family"
                  name="family"
                  placeholder="نام خانوادگی را وارد کنید"
                  invalid={
                    createAdminController.touched.family
                      ? createAdminController.errors.family
                      : null
                  }
                />
                {createAdminController.touched.family &&
                createAdminController.errors.family ? (
                  <FormFeedback>
                    {createAdminController.errors.family}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* phoneNumber */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="phoneNumber">
                  شماره موبایل
                </Label>
                <Input
                  value={createAdminController.values.phoneNumber}
                  onChange={createAdminController.handleChange}
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="شماره موبایل را وارد کنید"
                  invalid={
                    createAdminController.touched.phoneNumber
                      ? createAdminController.errors.phoneNumber
                      : null
                  }
                />
                {createAdminController.touched.phoneNumber &&
                createAdminController.errors.phoneNumber ? (
                  <FormFeedback>
                    {createAdminController.errors.phoneNumber}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* roleId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="roleId">
                  نقش
                </Label>
                <Select
                  value={createAdminController.values.roleId}
                  onChange={(value) =>
                    createAdminController.setFieldValue("roleId", value)
                  }
                  isLoading={getRolesLoading}
                  noOptionsMessage={() => " نقشی یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getRolesLoading}
                  placeholder="نقش را انتخاب کنید"
                  options={roleData}
                  className={`react-select ${
                    createAdminController.touched.roleId &&
                    createAdminController.errors.roleId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="roleId"
                  name="roleId"
                />
                {createAdminController.touched.roleId &&
                createAdminController.errors.roleId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد نقش اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* email */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="email">
                  ایمیل
                </Label>
                <Input
                  value={createAdminController.values.email}
                  onChange={createAdminController.handleChange}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ایمیل را وارد کنید"
                  invalid={
                    createAdminController.touched.email
                      ? createAdminController.errors.email
                      : null
                  }
                />
                {createAdminController.touched.email &&
                createAdminController.errors.email ? (
                  <FormFeedback>
                    {createAdminController.errors.email}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* password */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="password">
                  رمز عبور
                </Label>
                <InputPasswordToggle
                  id="password"
                  name="password"
                  className="input-group-merge"
                  direction="rtl"
                  value={createAdminController.values.password}
                  onChange={createAdminController.handleChange}
                  invalid={
                    createAdminController.touched.password &&
                    createAdminController.errors.password
                  }
                />
                {createAdminController.touched.password &&
                createAdminController.errors.password ? (
                  <FormFeedback>
                    {createAdminController.errors.password}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* confirmPassword */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="confirmPassword">
                  تکرار رمز عبور
                </Label>
                <InputPasswordToggle
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input-group-merge"
                  direction="rtl"
                  value={createAdminController.values.confirmPassword}
                  onChange={createAdminController.handleChange}
                  invalid={
                    createAdminController.touched.confirmPassword &&
                    createAdminController.errors.confirmPassword
                  }
                />
                {createAdminController.touched.confirmPassword &&
                createAdminController.errors.confirmPassword ? (
                  <FormFeedback>
                    {createAdminController.errors.confirmPassword}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* isActive */}
              <Col
                xs="12"
                sm="6"
                md="4"
                className="mb-2 mt-1 d-flex align-items-center"
              >
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={
                        createAdminController.values.isActive === true
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        createAdminController.setFieldValue(
                          "isActive",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      ادمین فعال باشد
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
              loading={loadings.createAdmin}
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
export default CreateAdmin;
