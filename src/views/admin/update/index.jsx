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
import { useSearchParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useAdmin from "../../../hooks/use_admin";
import InputPasswordToggle from "@components/input-password-toggle";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";
import CustomLoading from "../../../components/loading";

const UpdateAdmin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getRoles,
    getAdminById,
    viewAdminData,
    updateAdminController,
    roleData,
    loadings,
    getByIdLoading,
    getRolesLoading,
  } = useAdmin();

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateAdminController.setFieldValue("avatar", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  const imageUrlToBase64 = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getAdminById(entity_id);
      getRoles();
      updateAdminController.setFieldValue("id", entity_id);
    } else {
      navigate("/admin/all");
    }
  }, []);

  useEffect(() => {
    if (viewAdminData) {
      updateAdminController.setFieldValue("name", viewAdminData?.name);
      updateAdminController.setFieldValue("family", viewAdminData?.family);
      updateAdminController.setFieldValue(
        "phoneNumber",
        viewAdminData?.phoneNumber
      );
      updateAdminController.setFieldValue("roleId", {
        label: viewAdminData.roleName,
        value: viewAdminData.roleId,
      });
      updateAdminController.setFieldValue("email", viewAdminData?.email);
      updateAdminController.setFieldValue("isActive", viewAdminData?.isActive);
      if (viewAdminData?.avatar) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewAdminData?.avatar
        ).then((item) => {
          updateAdminController.setFieldValue("avatar", item);
        });
      }
    }
  }, [viewAdminData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش ادمین"
        data={[{ title: "داشبورد" }, { title: "ویرایش ادمین" }]}
      />
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateAdminController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش ادمین</CardTitle>
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
                      updateAdminController.values.avatar.length > 0
                        ? updateAdminController.values.avatar
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
                    value={updateAdminController.values.name}
                    onChange={updateAdminController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام را وارد کنید"
                    invalid={
                      updateAdminController.touched.name
                        ? updateAdminController.errors.name
                        : null
                    }
                  />
                  {updateAdminController.touched.name &&
                  updateAdminController.errors.name ? (
                    <FormFeedback>
                      {updateAdminController.errors.name}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* family */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="family">
                    نام خانوادگی
                  </Label>
                  <Input
                    value={updateAdminController.values.family}
                    onChange={updateAdminController.handleChange}
                    type="text"
                    id="family"
                    name="family"
                    placeholder="نام خانوادگی را وارد کنید"
                    invalid={
                      updateAdminController.touched.family
                        ? updateAdminController.errors.family
                        : null
                    }
                  />
                  {updateAdminController.touched.family &&
                  updateAdminController.errors.family ? (
                    <FormFeedback>
                      {updateAdminController.errors.family}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* phoneNumber */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="phoneNumber">
                    شماره موبایل
                  </Label>
                  <Input
                    value={updateAdminController.values.phoneNumber}
                    onChange={updateAdminController.handleChange}
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="شماره موبایل را وارد کنید"
                    invalid={
                      updateAdminController.touched.phoneNumber
                        ? updateAdminController.errors.phoneNumber
                        : null
                    }
                  />
                  {updateAdminController.touched.phoneNumber &&
                  updateAdminController.errors.phoneNumber ? (
                    <FormFeedback>
                      {updateAdminController.errors.phoneNumber}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* roleId */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="roleId">
                    نقش
                  </Label>
                  <Select
                    value={updateAdminController.values.roleId}
                    onChange={(value) =>
                      updateAdminController.setFieldValue("roleId", value)
                    }
                    isLoading={getRolesLoading}
                    noOptionsMessage={() => " نقشی یافت نشد."}
                    theme={selectThemeColors}
                    closeMenuOnSelect={true}
                    isDisabled={getRolesLoading}
                    placeholder="نقش را انتخاب کنید"
                    options={roleData}
                    className={`react-select ${
                      updateAdminController.touched.roleId &&
                      updateAdminController.errors.roleId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="roleId"
                    name="roleId"
                  />
                  {updateAdminController.touched.roleId &&
                  updateAdminController.errors.roleId ? (
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
                    value={updateAdminController.values.email}
                    onChange={updateAdminController.handleChange}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ایمیل را وارد کنید"
                    invalid={
                      updateAdminController.touched.email
                        ? updateAdminController.errors.email
                        : null
                    }
                  />
                  {updateAdminController.touched.email &&
                  updateAdminController.errors.email ? (
                    <FormFeedback>
                      {updateAdminController.errors.email}
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
                          updateAdminController.values.isActive === true
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          updateAdminController.setFieldValue(
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
                {/* oldpassword */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="oldpassword">
                    رمز عبور فعلی
                  </Label>
                  <InputPasswordToggle
                    id="oldpassword"
                    name="oldpassword"
                    className="input-group-merge"
                    direction="rtl"
                    value={updateAdminController.values.oldpassword}
                    onChange={updateAdminController.handleChange}
                    invalid={
                      updateAdminController.touched.oldpassword &&
                      updateAdminController.errors.oldpassword
                    }
                  />
                  {updateAdminController.touched.oldpassword &&
                  updateAdminController.errors.oldpassword ? (
                    <FormFeedback>
                      {updateAdminController.errors.oldpassword}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* newpassword */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="newpassword">
                    رمز عبور جدید
                  </Label>
                  <InputPasswordToggle
                    id="newpassword"
                    name="newpassword"
                    className="input-group-merge"
                    direction="rtl"
                    value={updateAdminController.values.newpassword}
                    onChange={updateAdminController.handleChange}
                    invalid={
                      updateAdminController.touched.newpassword &&
                      updateAdminController.errors.newpassword
                    }
                  />
                  {updateAdminController.touched.newpassword &&
                  updateAdminController.errors.newpassword ? (
                    <FormFeedback>
                      {updateAdminController.errors.newpassword}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* confirmPassword */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="confirmPassword">
                    تکرار رمز عبور جدید
                  </Label>
                  <InputPasswordToggle
                    id="confirmPassword"
                    name="confirmPassword"
                    className="input-group-merge"
                    direction="rtl"
                    value={updateAdminController.values.confirmPassword}
                    onChange={updateAdminController.handleChange}
                    invalid={
                      updateAdminController.touched.confirmPassword &&
                      updateAdminController.errors.confirmPassword
                    }
                  />
                  {updateAdminController.touched.confirmPassword &&
                  updateAdminController.errors.confirmPassword ? (
                    <FormFeedback>
                      {updateAdminController.errors.confirmPassword}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateAdmin}
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
export default UpdateAdmin;
