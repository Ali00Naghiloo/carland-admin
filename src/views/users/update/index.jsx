import { Fragment, useEffect, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useUsers from "../../../hooks/use_users";
import CustomLoading from "../../../components/loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import Skeleton from "../../../components/skeleton/index";
import toast from "react-hot-toast";
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
import moment from "jalali-moment";
import { selectThemeColors } from "@utils";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/button";
import CustomDatePicker from "../../../components/datepicker";
import CustomModal from "../../../components/modal/index";
import Confirm from "../../../components/confirm/index";
import { FaRegTrashAlt } from "react-icons/fa";

const UpdateUser = () => {
  const array = [1, 1, 1, 1, 1, 1];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getUserById,
    getNationalityLoading,
    getNationalities,
    nationalityData,
    getRoles,
    roleData,
    updateUserController,
    viewUserData,
    loadings,
    getRolesLoading,
    getByIdLoading,
    getUserAddressLoading,
    getUserAddress,
    addressModal,
    setAddressModal,
    userAddressData,
    newAddressModal,
    setNewAddressModal,
    addNewAddressLoading,
    newAddressZipCode,
    setNewAddressZipCode,
    addNewAddress,
    deleteAddress,
    deleteAddressLoading,
  } = useUsers();

  const today = useSelector((state) => state.app.today);

  const nationalCardImageHandleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateUserController.setFieldValue("nationalCardImage", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  const nationalCardSelfieImageHandleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateUserController.setFieldValue(
          "nationalCardSelfieImage",
          reader.result
        );
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  const videoHandleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateUserController.setFieldValue("video", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  const birthCertificateImageHandleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      var reader = new FileReader();
      reader.onloadend = function () {
        updateUserController.setFieldValue(
          "birthCertificateImage",
          reader.result
        );
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
      getUserById(entity_id);
      getUserAddress(entity_id);
      getNationalities();
      getRoles();
      updateUserController.setFieldValue("id", entity_id);
    } else {
      navigate("/users/all");
    }
  }, []);

  useEffect(() => {
    if (viewUserData) {
      if (viewUserData?.phoneNumber) {
        updateUserController.setFieldValue(
          "phoneNumber",
          viewUserData?.phoneNumber
        );
      }
      if (viewUserData?.nationalCode) {
        updateUserController.setFieldValue(
          "nationalCode",
          viewUserData?.nationalCode
        );
      }
      if (viewUserData?.nationalityId) {
        updateUserController.setFieldValue("nationalityId", {
          label: viewUserData.nationality.nationalityName,
          value: viewUserData.nationality.id,
        });
      }
      if (viewUserData?.roleId) {
        updateUserController.setFieldValue("roleId", {
          label: viewUserData.role.name,
          value: viewUserData.role.id,
        });
      }
      if (viewUserData?.birthDate) {
        updateUserController.setFieldValue("birthDate", {
          year: parseFloat(moment(viewUserData?.birthDate).format("YYYY")),
          month: parseFloat(moment(viewUserData?.birthDate).format("MM")),
          day: parseFloat(moment(viewUserData?.birthDate).format("DD")),
        });
      }
      if (viewUserData?.firstName) {
        updateUserController.setFieldValue(
          "firstName",
          viewUserData?.firstName
        );
      }
      if (viewUserData?.lastName) {
        updateUserController.setFieldValue("lastName", viewUserData?.lastName);
      }
      if (viewUserData?.fatherName) {
        updateUserController.setFieldValue(
          "fatherName",
          viewUserData?.fatherName
        );
      }
      if (viewUserData?.gender) {
        updateUserController.setFieldValue("gender", {
          label: viewUserData?.gender,
          value: viewUserData?.gender,
        });
      }
      if (viewUserData?.birthCertificateNumber) {
        updateUserController.setFieldValue(
          "birthCertificateNumber",
          viewUserData?.birthCertificateNumber
        );
      }
      if (viewUserData?.birthCertificatePlace) {
        updateUserController.setFieldValue(
          "birthCertificatePlace",
          viewUserData?.birthCertificatePlace
        );
      }
      if (viewUserData?.isDead) {
        updateUserController.setFieldValue("isDead", viewUserData?.isDead);
      }
      if (viewUserData?.job) {
        updateUserController.setFieldValue("job", viewUserData?.job);
      }
      if (viewUserData?.education) {
        updateUserController.setFieldValue(
          "education",
          viewUserData?.education
        );
      }
      if (viewUserData?.homePhoneNumber) {
        updateUserController.setFieldValue(
          "homePhoneNumber",
          viewUserData?.homePhoneNumber
        );
      }
      if (viewUserData?.email) {
        updateUserController.setFieldValue("email", viewUserData?.email);
      }
      if (viewUserData?.referralCode) {
        updateUserController.setFieldValue(
          "referralCode",
          viewUserData?.referralCode
        );
      }
      if (viewUserData?.addressId) {
        updateUserController.setFieldValue(
          "addressId",
          viewUserData?.addressId
        );
      }
      if (viewUserData?.nationalCardImage) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewUserData?.nationalCardImage
        ).then((item) => {
          updateUserController.setFieldValue("nationalCardImage", item);
        });
      }
      if (viewUserData?.nationalCardSelfieImage) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewUserData?.nationalCardSelfieImage
        ).then((item) => {
          updateUserController.setFieldValue("nationalCardSelfieImage", item);
        });
      }
      if (viewUserData?.video) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewUserData?.video
        ).then((item) => {
          updateUserController.setFieldValue("video", item);
        });
      }
      if (viewUserData?.birthCertificateImage) {
        imageUrlToBase64(
          process.env.REACT_APP_BASE_URL + viewUserData?.nationalCardSelfieImage
        ).then((item) => {
          updateUserController.setFieldValue("birthCertificateImage", item);
        });
      }
    }
  }, [viewUserData]);

  useEffect(() => {
    if (addressModal) {
      getUserAddress(viewUserData?.id);
    }
  }, [addressModal]);

  useEffect(() => {
    if (!newAddressModal) {
      setNewAddressZipCode("");
    }
  }, [newAddressModal]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش کاربر"
        data={[{ title: "داشبورد" }, { title: "ویرایش کاربر" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateUserController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش کاربر</CardTitle>
            </CardHeader>
            {/* form fields */}
            <CardBody className="pt-2">
              <Row>
                {/* phoneNumber */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="phoneNumber">
                    شماره موبایل
                  </Label>
                  <Input
                    disabled={viewUserData?.phoneNumber}
                    value={updateUserController.values.phoneNumber}
                    onChange={(e) => {
                      updateUserController.setFieldValue(
                        "phoneNumber",
                        `${e.target.value}`
                      );
                    }}
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="شماره موبایل را وارد کنید"
                    invalid={
                      updateUserController.touched.phoneNumber
                        ? updateUserController.errors.phoneNumber
                        : null
                    }
                  />
                  {updateUserController.touched.phoneNumber &&
                  updateUserController.errors.phoneNumber ? (
                    <FormFeedback>
                      {updateUserController.errors.phoneNumber}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* nationalCode */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="nationalCode">
                    کد ملی
                  </Label>
                  <Input
                    disabled
                    value={updateUserController.values.nationalCode}
                    onChange={updateUserController.handleChange}
                    type="number"
                    id="nationalCode"
                    name="nationalCode"
                    placeholder="کد ملی را وارد کنید"
                    invalid={
                      updateUserController.touched.nationalCode
                        ? updateUserController.errors.nationalCode
                        : null
                    }
                  />
                  {updateUserController.touched.nationalCode &&
                  updateUserController.errors.nationalCode ? (
                    <FormFeedback>
                      {updateUserController.errors.nationalCode}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* nationalityId */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="nationalityId">
                    ملیت کاربر
                  </Label>
                  <Select
                    value={updateUserController.values.nationalityId}
                    onChange={(value) =>
                      updateUserController.setFieldValue("nationalityId", value)
                    }
                    isLoading={getNationalityLoading}
                    noOptionsMessage={() => " ملیتی یافت نشد."}
                    theme={selectThemeColors}
                    closeMenuOnSelect={true}
                    isDisabled={true}
                    placeholder="ملیت کاربر را انتخاب کنید"
                    options={nationalityData}
                    className={`react-select ${
                      updateUserController.touched.nationalityId &&
                      updateUserController.errors.nationalityId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="nationalityId"
                    name="nationalityId"
                  />
                  {updateUserController.touched.nationalityId &&
                  updateUserController.errors.nationalityId ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد ملیت کاربر اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* roleId */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="roleId">
                    نقش کاربر
                  </Label>
                  <Select
                    value={updateUserController.values.roleId}
                    onChange={(value) =>
                      updateUserController.setFieldValue("roleId", value)
                    }
                    isLoading={getRolesLoading}
                    noOptionsMessage={() => " نقشی یافت نشد."}
                    theme={selectThemeColors}
                    closeMenuOnSelect={true}
                    isDisabled={getRolesLoading}
                    placeholder="نقش کاربر را انتخاب کنید"
                    options={roleData}
                    className={`react-select ${
                      updateUserController.touched.roleId &&
                      updateUserController.errors.roleId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="roleId"
                    name="roleId"
                  />
                  {updateUserController.touched.roleId &&
                  updateUserController.errors.roleId ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد نقش کاربر اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* birthDate */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="birthDate">
                    تاریخ تولد
                  </Label>
                  <CustomDatePicker
                    calendarPopperPosition="bottom"
                    inputName="birthDate"
                    maximumDate={today}
                    inputClassName={
                      updateUserController.touched.birthDate &&
                      updateUserController.errors.birthDate
                        ? "form_error"
                        : ""
                    }
                    value={updateUserController.values.birthDate}
                    onChange={(value) => {
                      updateUserController.setFieldValue("birthDate", value);
                    }}
                    inputPlaceholder="انتخاب تاریخ"
                  />
                  {updateUserController.touched.birthDate &&
                  updateUserController.errors.birthDate ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد تاریخ تولد اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* firstName */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="firstName">
                    نام
                  </Label>
                  <Input
                    value={updateUserController.values.firstName}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="نام را وارد کنید"
                    invalid={
                      updateUserController.touched.firstName
                        ? updateUserController.errors.firstName
                        : null
                    }
                  />
                  {updateUserController.touched.firstName &&
                  updateUserController.errors.firstName ? (
                    <FormFeedback>
                      {updateUserController.errors.firstName}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* lastName */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="lastName">
                    نام خانوادگی
                  </Label>
                  <Input
                    value={updateUserController.values.lastName}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="نام خانوادگی را وارد کنید"
                    invalid={
                      updateUserController.touched.lastName
                        ? updateUserController.errors.lastName
                        : null
                    }
                  />
                  {updateUserController.touched.lastName &&
                  updateUserController.errors.lastName ? (
                    <FormFeedback>
                      {updateUserController.errors.lastName}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* fatherName */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="fatherName">
                    نام پدر
                  </Label>
                  <Input
                    value={updateUserController.values.fatherName}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    placeholder="نام پدر را وارد کنید"
                  />
                </Col>
                {/* gender */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="gender">
                    جنسیت
                  </Label>
                  <Select
                    value={updateUserController.values.gender}
                    onChange={(value) =>
                      updateUserController.setFieldValue("gender", value)
                    }
                    noOptionsMessage={() => " جنسیتی یافت نشد."}
                    theme={selectThemeColors}
                    closeMenuOnSelect={true}
                    placeholder="جنسیت را انتخاب کنید"
                    options={[
                      { label: "مرد", value: "مرد" },
                      { label: "زن", value: "زن" },
                    ]}
                    className={"react-select"}
                    classNamePrefix="select"
                    id="gender"
                    name="gender"
                  />
                </Col>
                {/* birthCertificateNumber */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="birthCertificateNumber">
                    شماره شناسنامه
                  </Label>
                  <Input
                    value={updateUserController.values.birthCertificateNumber}
                    onChange={updateUserController.handleChange}
                    type="number"
                    id="birthCertificateNumber"
                    name="birthCertificateNumber"
                    placeholder="شماره شناسنامه را وارد کنید"
                  />
                </Col>
                {/* birthCertificatePlace */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="birthCertificatePlace">
                    محل صدور شناسنامه
                  </Label>
                  <Input
                    value={updateUserController.values.birthCertificatePlace}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="birthCertificatePlace"
                    name="birthCertificatePlace"
                    placeholder="محل صدور شناسنامه را وارد کنید"
                  />
                </Col>
                {/* job */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="job">
                    شغل
                  </Label>
                  <Input
                    value={updateUserController.values.job}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="job"
                    name="job"
                    placeholder="شغل را وارد کنید"
                  />
                </Col>
                {/* education */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="education">
                    تحصیلات
                  </Label>
                  <Input
                    value={updateUserController.values.education}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="education"
                    name="education"
                    placeholder="تحصیلات را وارد کنید"
                  />
                </Col>
                {/* homePhoneNumber */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="homePhoneNumber">
                    تلفن ثابت
                  </Label>
                  <Input
                    value={updateUserController.values.homePhoneNumber}
                    onChange={updateUserController.handleChange}
                    id="homePhoneNumber"
                    name="homePhoneNumber"
                    placeholder="تلفن ثابت را وارد کنید"
                  />
                </Col>
                {/* email */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="email">
                    ایمیل
                  </Label>
                  <Input
                    value={updateUserController.values.email}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="email"
                    name="email"
                    placeholder="ایمیل را وارد کنید"
                  />
                </Col>
                {/* referralCode */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="referralCode">
                    شماره معرف
                  </Label>
                  <Input
                    value={updateUserController.values.referralCode}
                    onChange={updateUserController.handleChange}
                    type="text"
                    id="referralCode"
                    name="referralCode"
                    placeholder="شماره معرف را وارد کنید"
                  />
                </Col>
                {/* address */}
                <Col xs="12" className="mb-1" style={{ cursor: "pointer" }}>
                  <Label>آدرس</Label>
                  <div
                    onClick={() => setAddressModal(1)}
                    className="mb-1 border rounded-3"
                  >
                    {updateUserController.values?.addressId ? (
                      <div className="p-3 d-flex justify-content-center">
                        {userAddressData.map((add) => {
                          if (
                            add.id === updateUserController.values.addressId
                          ) {
                            return (
                              <>
                                {add.province ? `${add.province} - ` : null}
                                {add.street ? `خیابان ${add.street} - ` : null}
                                {add.street2 ? `${add.street2} - ` : null}
                                {add.houseNumber
                                  ? `پلاک ${add.houseNumber} - `
                                  : null}
                                {add.floor ? `طبقه ${add.floor}` : null}
                              </>
                            );
                          }
                        })}
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center p-3">
                        آدرسی انتخاب نشده
                      </div>
                    )}
                  </div>
                </Col>
                {/* nationalCardImage */}
                <Col xs="12" sm="6" className="mb-1 d-flex flex-column">
                  <Label>تصویر کارت ملی</Label>
                  <div
                    className="border rounded-3 position-relative"
                    style={{ cursor: "pointer", height: 300 }}
                  >
                    {!updateUserController.values.nationalCardImage ? (
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        بارگذاری نشده
                      </div>
                    ) : (
                      <img
                        style={{
                          objectFit: "cover",
                        }}
                        src={updateUserController.values.nationalCardImage}
                        alt="Uploaded file"
                        className="rounded-3 w-100 h-100"
                      />
                    )}
                    <div className="position-absolute top-0 left-0 h-100 w-100 opacity-0 hover_cover d-flex justify-content-center align-items-center">
                      <label
                        style={{
                          width: 130,
                          height: 38,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                        className="bg-primary text-white d-flex justify-content-center align-items-center"
                      >
                        انتخاب تصویر
                        <Input
                          type="file"
                          onChange={nationalCardImageHandleUploadImage}
                          hidden
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </Col>
                {/* nationalCardSelfieImage */}
                <Col xs="12" sm="6" className="mb-1 d-flex flex-column">
                  <Label>تصویر سلفی با کارت ملی</Label>
                  <label
                    className="border rounded-3 position-relative"
                    style={{ cursor: "pointer", height: 300 }}
                  >
                    {!updateUserController.values.nationalCardSelfieImage ? (
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        بارگذاری نشده
                      </div>
                    ) : (
                      <img
                        style={{
                          objectFit: "cover",
                        }}
                        src={
                          updateUserController.values.nationalCardSelfieImage
                        }
                        alt="Uploaded file"
                        className="rounded-3 w-100 h-100"
                      />
                    )}
                    <div className="position-absolute top-0 left-0 h-100 w-100 opacity-0 hover_cover d-flex justify-content-center align-items-center">
                      <label
                        style={{
                          width: 130,
                          height: 38,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                        className="bg-primary text-white d-flex justify-content-center align-items-center"
                      >
                        انتخاب تصویر
                        <Input
                          type="file"
                          onChange={nationalCardSelfieImageHandleUploadImage}
                          hidden
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </label>
                </Col>
                {/* video */}
                <Col xs="12" sm="6" className="mb-1 d-flex flex-column">
                  <Label>ویدیو سلفی</Label>
                  <label
                    className="border rounded-3 position-relative"
                    style={{ cursor: "pointer", height: 300 }}
                  >
                    {!updateUserController.values.video ? (
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        بارگذاری نشده
                      </div>
                    ) : (
                      <video controls className="rounded-3 w-100 h-100">
                        <source src={updateUserController.values.video} />
                      </video>
                    )}
                    <div className="position-absolute top-0 left-0 h-100 w-100 opacity-0 hover_cover d-flex justify-content-center align-items-center">
                      <label
                        style={{
                          width: 130,
                          height: 38,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                        className="bg-primary text-white d-flex justify-content-center align-items-center"
                      >
                        انتخاب ویدیو
                        <Input
                          type="file"
                          onChange={videoHandleUploadImage}
                          hidden
                          accept="video/mp4,video/x-m4v,video/*"
                        />
                      </label>
                    </div>
                  </label>
                </Col>
                {/* birthCertificateImage */}
                <Col xs="12" sm="6" className="mb-1 d-flex flex-column">
                  <Label>تصویر شناسنامه</Label>
                  <label
                    className="border rounded-3 position-relative"
                    style={{ cursor: "pointer", height: 300 }}
                  >
                    {!updateUserController.values.birthCertificateImage ? (
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        بارگذاری نشده
                      </div>
                    ) : (
                      <img
                        style={{
                          objectFit: "cover",
                        }}
                        src={updateUserController.values.birthCertificateImage}
                        alt="Uploaded file"
                        className="rounded-3 w-100 h-100"
                      />
                    )}
                    <div className="position-absolute top-0 left-0 h-100 w-100 opacity-0 hover_cover d-flex justify-content-center align-items-center">
                      <label
                        style={{
                          width: 130,
                          height: 38,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                        className="bg-primary text-white d-flex justify-content-center align-items-center"
                      >
                        انتخاب تصویر
                        <Input
                          type="file"
                          onChange={birthCertificateImageHandleUploadImage}
                          hidden
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </label>
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateUser}
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
      {/* address modal */}
      <CustomModal
        visible={addressModal}
        setVisible={setAddressModal}
        title={"آدرس های کاربر"}
        yesLoading={false}
        actionTitle={"افزودن آدرس جدید"}
        actionColor={"primary"}
        actionHandler={() => setNewAddressModal(1)}
        type={"local"}
        size={"lg"}
      >
        {!getUserAddressLoading && userAddressData.length === 0 ? (
          <div className="p-2 text-center">آدرسی یافت نشد.</div>
        ) : null}
        {getUserAddressLoading
          ? array.map((item, index) => (
              <Fragment key={index}>
                <Skeleton
                  style={{ height: 48, borderRadius: 8, marginBottom: 8 }}
                />
              </Fragment>
            ))
          : userAddressData?.map((address, index) => (
              <div
                className="d-flex align-items-center justify-content-between mb-1"
                key={index}
              >
                <div
                  className={`border p-1 rounded-3 ${
                    address.id === updateUserController.values.addressId
                      ? "bg-warning text-white"
                      : ""
                  }`}
                  style={{ cursor: "pointer", width: "90%" }}
                  onClick={() =>
                    updateUserController.setFieldValue("addressId", address.id)
                  }
                >
                  {index + 1} -{" "}
                  {address.province ? `${address.province} - ` : null}
                  {address.street ? `خیابان ${address.street} - ` : null}
                  {address.street2 ? `${address.street2} - ` : null}
                  {address.houseNumber
                    ? `پلاک ${address.houseNumber} - `
                    : null}
                  {address.floor ? `طبقه ${address.floor}` : null}
                </div>
                {address.id !== updateUserController.values.addressId ? (
                  <CustomButton
                    size="small"
                    color="danger"
                    loading={deleteAddressLoading}
                    onClick={() => deleteAddress(address.id)}
                    style={{ padding: 8, cursor: "pointer", marginRight: 8 }}
                  >
                    <FaRegTrashAlt fontSize={18} />
                  </CustomButton>
                ) : (
                  <div style={{ width: 36, height: 36, marginRight: 8 }}></div>
                )}
              </div>
            ))}
      </CustomModal>
      {/* new address modal */}
      <Confirm
        visible={newAddressModal}
        setVisible={setNewAddressModal}
        title={"افزودن آدرس جدید"}
        noAction={() => setNewAddressModal(null)}
        noColor={"secondary"}
        noTitle={"بستن"}
        yesLoading={addNewAddressLoading}
        yesAction={() => {
          if (newAddressZipCode.length === 0) {
            toast.error("لطفا کدپستی را وارد کنید");
          } else {
            addNewAddress(newAddressZipCode, viewUserData?.id);
          }
        }}
        yesColor={"success"}
        yesTitle={"افزودن"}
        type={"local"}
      >
        {/* ZipCode */}
        <Col xs="12">
          <Label className="form-label" for="ZipCode">
            کدپستی
          </Label>
          <Input
            value={newAddressZipCode}
            onChange={(e) => setNewAddressZipCode(e.target.value)}
            type="number"
            id="ZipCode"
            name="ZipCode"
            placeholder="کد پستی را وارد کنید"
          />
        </Col>
      </Confirm>
    </Fragment>
  );
};
export default UpdateUser;
