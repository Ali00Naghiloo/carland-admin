import { useState } from "react";
import useHttp from "./use_http";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  createUserSchema,
  verifyUserMobileSchema,
  createUserWithoutMobileSchema,
  updateUserSchema,
} from "../utility/schemas/index";
import {
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setUsersList,
  setVerifyModal,
} from "../redux/users_slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "jalali-moment";

const useUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getUsers: false,
    verifyUser: false,
    verifyUserMobile: false,
    createUserWithoutMobile: false,
    updateUser: false,
    deleteUser: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getRolesLoading, setGetRolesLoading] = useState(false);
  const [getNationalityLoading, setGetNationalityLoading] = useState(false);
  const [getUserAddressLoading, setGetUserAddressLoading] = useState(false);

  const [filters, setFilters] = useState({
    PhoneNumber: "",
    NationalCode: "",
    FirstName: "",
    LastName: "",
    BirthDate: null,
    FatherName: "",
    Gender: null,
    NationalityId: null,
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [roleData, setRoleData] = useState([]);
  const [nationalityData, setNationalityData] = useState([]);

  const [viewUserData, setViewUserData] = useState(null);

  const [addressModal, setAddressModal] = useState(null);
  const [userAddressData, setUserAddressData] = useState([]);
  const [newAddressModal, setNewAddressModal] = useState(null);
  const [addNewAddressLoading, setAddNewAddressLoading] = useState(false);
  const [newAddressZipCode, setNewAddressZipCode] = useState("");
  const [deleteAddressLoading, setDeleteAddressLoading] = useState(false);

  const [roleTab, setRoleTab] = useState("0");

  const perPage = useSelector((state) => state.users.perPage);

  const getUsers = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      PhoneNumber: "",
      NationalCode: "",
      FirstName: "",
      LastName: "",
      BirthDate: "",
      FatherName: "",
      Gender: "",
      NationalityId: "",
      RoleId: roleTab == "0" ? "" : roleTab,
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
    };
    if (filters?.PhoneNumber?.length > 0 && !without_filter) {
      paramsData.PhoneNumber = filters.PhoneNumber;
    }
    if (filters?.NationalCode?.length > 0 && !without_filter) {
      paramsData.NationalCode = filters.NationalCode;
    }
    if (filters?.FirstName?.length > 0 && !without_filter) {
      paramsData.FirstName = filters.FirstName;
    }
    if (filters?.LastName?.length > 0 && !without_filter) {
      paramsData.LastName = filters.LastName;
    }
    if (filters?.BirthDate && !without_filter) {
      let insideYear = filters.BirthDate.year;
      let insideMonth =
        filters.BirthDate.month < 10
          ? `0${filters.BirthDate.month}`
          : filters.BirthDate.month;
      let insideDay =
        filters.BirthDate.day < 10
          ? `0${filters.BirthDate.day}`
          : filters.BirthDate.day;
      paramsData.BirthDate = `${insideYear}/${insideMonth}/${insideDay}`;
    }
    if (filters?.FatherName?.length > 0 && !without_filter) {
      paramsData.FatherName = filters.FatherName;
    }
    if (filters?.Gender && !without_filter) {
      paramsData.Gender = filters.Gender.value;
    }
    if (filters?.NationalityId && !without_filter) {
      paramsData.NationalityId = filters.NationalityId.value;
    }
    if (filters?.CreateDate?.from && !without_filter) {
      paramsData.CreateDate = moment
        .from(
          filters?.CreateDate?.from.year +
            "-" +
            filters?.CreateDate?.from.month +
            "-" +
            filters?.CreateDate?.from.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (filters?.CreateDate?.to && !without_filter) {
      paramsData.CreateDateEndSearch = moment
        .from(
          filters?.CreateDate?.to.year +
            "-" +
            filters?.CreateDate?.to.month +
            "-" +
            filters?.CreateDate?.to.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (filters?.UserName?.length > 0 && !without_filter) {
      paramsData.UserName = filters.UserName;
    }
    if (filters?.UpdateDate?.from && !without_filter) {
      paramsData.UpdateDate = moment
        .from(
          filters?.UpdateDate?.from.year +
            "-" +
            filters?.UpdateDate?.from.month +
            "-" +
            filters?.UpdateDate?.from.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (filters?.UpdateDate?.to && !without_filter) {
      paramsData.UpdateDateEndSearch = moment
        .from(
          filters?.UpdateDate?.to.year +
            "-" +
            filters?.UpdateDate?.to.month +
            "-" +
            filters?.UpdateDate?.to.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (filters?.UserNameUpdate?.length > 0 && !without_filter) {
      paramsData.UserNameUpdate = filters.UserNameUpdate;
    }
    try {
      setLoadings({ ...loadings, getUsers: true });
      const response = await httpService.get("admin/users", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getUsers: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setUsersList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getUsers: false });
    }
  };

  const getUserById = async (user_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get("admin/users", {
        params: {
          id: user_id,
        },
      });
      setGetByIdLoading(false);
      if (response.status === 200) {
        setViewUserData(response.data.data[0]);
      } else {
        navigate("/users/all");
      }
    } catch ({ err, response }) {
      setGetByIdLoading(false);
      navigate("/users/all");
    }
  };

  const getRoles = async () => {
    let dataArray = [];
    try {
      setGetRolesLoading(true);
      const response = await httpService.get("/admin/users");
      setGetRolesLoading(false);
      if (response.data.data) {
        response.data.data.map((dataItem) => {
          dataArray.push({ label: dataItem.name, value: dataItem.id });
        });
        setRoleData(dataArray);
      }
    } catch ({ err, response }) {
      setGetRolesLoading(false);
    }
  };

  const getNationalities = async () => {
    let dataArray = [];
    try {
      setGetNationalityLoading(true);
      const response = await httpService.get("/GetAllNationality");
      setGetNationalityLoading(false);
      if (response.data.nationality) {
        response.data.nationality.map((dataItem) => {
          dataArray.push({
            label: dataItem.nationalityName,
            value: dataItem.id,
          });
        });
        setNationalityData(dataArray);
      }
    } catch ({ err, response }) {
      setGetNationalityLoading(false);
    }
  };

  const createUserController = useFormik({
    initialValues: {
      RoleId: null,
      NationalityId: null,
      NationalCode: "",
      PhoneNumber: "",
      Birthdate: null,
    },
    validationSchema: createUserSchema,
    onSubmit: (values) => {
      verifyUser(values);
    },
  });

  const verifyUser = async (values) => {
    let insideYear = values.Birthdate.year;
    let insideMonth =
      values.Birthdate.month < 10
        ? `0${values.Birthdate.month}`
        : values.Birthdate.month;
    let insideDay =
      values.Birthdate.day < 10
        ? `0${values.Birthdate.day}`
        : values.Birthdate.day;
    const postData = {
      RoleId: values.RoleId.value,
      NationalityId: values.NationalityId.value,
      NationalCode: values.NationalCode.toString(),
      PhoneNumber: `0${values.PhoneNumber}`,
      Birthdate: "",
    };
    if (values.Birthdate) {
      postData.Birthdate = `${insideYear}/${insideMonth}/${insideDay}`;
    }
    try {
      setLoadings({ ...loadings, verifyUser: true });
      const response = await httpService.post(
        "/Register_VerifyNationlatity_PhoneNumber",
        {},
        {
          params: postData,
        }
      );
      setLoadings({ ...loadings, verifyUser: false });
      if (response.status === 200) {
        dispatch(setVerifyModal(1));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, verifyUser: false });
    }
  };

  const verifyUserMobileController = useFormik({
    initialValues: {
      PhoneNumber: "",
      SmsCode: "",
    },
    validationSchema: verifyUserMobileSchema,
    onSubmit: (values) => {
      verifyUserMobile(values);
    },
  });

  const verifyUserMobile = async (values) => {
    try {
      setLoadings({ ...loadings, verifyUserMobile: true });
      const response = await httpService.post(
        "/Register_VerifySmsCode",
        {},
        {
          params: {
            PhoneNumber: `0${createUserController.values.PhoneNumber}`,
            SmsCode: values.SmsCode,
          },
        }
      );
      setLoadings({ ...loadings, verifyUserMobile: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setVerifyModal(null));
        navigate("/users/all");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, verifyUserMobile: false });
    }
  };

  const createUserWithoutMobileController = useFormik({
    initialValues: {
      RoleId: null,
      NationalityId: null,
      NationalCode: "",
      Birthdate: null,
    },
    validationSchema: createUserWithoutMobileSchema,
    onSubmit: (values) => {
      createUserWithoutMobile(values);
    },
  });

  const createUserWithoutMobile = async (values) => {
    let insideYear = values.Birthdate.year;
    let insideMonth =
      values.Birthdate.month < 10
        ? `0${values.Birthdate.month}`
        : values.Birthdate.month;
    let insideDay =
      values.Birthdate.day < 10
        ? `0${values.Birthdate.day}`
        : values.Birthdate.day;
    const postData = {
      RoleId: values.RoleId.value,
      NationalityId: values.NationalityId.value,
      NationalCode: values.NationalCode.toString(),
      Birthdate: "",
    };
    if (values.Birthdate) {
      postData.Birthdate = `${insideYear}/${insideMonth}/${insideDay}`;
    }
    try {
      setLoadings({ ...loadings, createUserWithoutMobile: true });
      const response = await httpService.post(
        "/Register_UserWithout_PhoneNumber",
        {},
        {
          params: postData,
        }
      );
      setLoadings({ ...loadings, createUserWithoutMobile: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/users/all");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createUserWithoutMobile: false });
    }
  };

  const updateUserController = useFormik({
    initialValues: {
      id: "",
      phoneNumber: "",
      nationalCode: "",
      nationalityId: null,
      roleId: null,
      birthDate: null,
      firstName: "",
      lastName: "",
      fatherName: "",
      gender: "",
      birthCertificateNumber: "",
      birthCertificatePlace: "",
      isDead: "",
      job: "",
      education: "",
      homePhoneNumber: "",
      addressId: null,
      postalCode: "",
      email: "",
      referralCode: "",
      nationalCardImage: null,
      nationalCardSelfieImage: null,
      video: null,
      birthCertificateImage: null,
    },
    validationSchema: updateUserSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  const updateUser = async (values) => {
    let insideYear = values.birthDate.year;
    let insideMonth =
      values.birthDate.month < 10
        ? `0${values.birthDate.month}`
        : values.birthDate.month;
    let insideDay =
      values.birthDate.day < 10
        ? `0${values.birthDate.day}`
        : values.birthDate.day;
    let postData = {
      id: values.id,
      phoneNumber: values.phoneNumber,
      nationalCode: values.nationalCode,
      nationalityId: values.nationalityId.value,
      roleId: values.roleId.value,
      birthDate: `${insideYear}/${insideMonth}/${insideDay}`,
      firstName: values.firstName,
      lastName: values.lastName,
      fatherName: values.fatherName,
      gender: values.gender.value,
      birthCertificateNumber: values.birthCertificateNumber.toString(),
      birthCertificatePlace: values.birthCertificatePlace,
      isDead: values.isDead,
      job: values.job,
      education: values.education,
      homePhoneNumber: values.homePhoneNumber,
      addressId: null,
      postalCode: values.postalCode,
      email: values.email,
      referralCode: values.referralCode,
      nationalCardImage: values.nationalCardImage,
      nationalCardSelfieImage: values.nationalCardSelfieImage,
      video: values.video,
      birthCertificateImage: values.birthCertificateImage,
    };
    if (values.addressId) {
      postData.addressId = values.addressId;
    }
    try {
      setLoadings({ ...loadings, updateUser: true });
      const response = await httpService.put(
        `/UpdateUserApp/${values.id}`,
        postData
      );
      setLoadings({ ...loadings, updateUser: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/users/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateUser: false });
    }
  };

  const deleteUser = async (user_id) => {
    try {
      setLoadings({ ...loadings, deleteUser: true });
      const response = await httpService.delete("/Register_DeleteUser", {
        params: {
          id: user_id,
        },
      });
      setLoadings({ ...loadings, deleteUser: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setDeleteModal(null));
        dispatch(setCurrentPage(1));
        getUsers(1, perPage);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteUser: false });
    }
  };

  const getUserAddress = async (user_id) => {
    try {
      setGetUserAddressLoading(true);
      const response = await httpService.get("GetAllAddress", {
        params: {
          PageNumber: 1,
          PageSize: 100,
          UserAppsId: user_id,
        },
      });
      setGetUserAddressLoading(false);
      if (response.status === 200) {
        setUserAddressData(response.data.data);
      }
    } catch ({ err, response }) {
      setGetUserAddressLoading(false);
    }
  };

  const addNewAddress = async (zip_code, user_id) => {
    try {
      setAddNewAddressLoading(true);
      const response = await httpService.post(
        "AddAdress",
        {},
        {
          params: {
            ZipCode: zip_code,
            UserId: user_id,
          },
        }
      );
      setAddNewAddressLoading(false);
      if (response.status === 200) {
        toast.success(response.data.message);
        setNewAddressModal(null);
        getUserAddress(user_id);
      }
    } catch ({ err, response }) {
      setAddNewAddressLoading(false);
    }
  };

  const deleteAddress = async (address_id) => {
    try {
      setDeleteAddressLoading(true);
      const response = await httpService.delete("DeleteAddress", {
        params: {
          id: address_id,
        },
      });
      setDeleteAddressLoading(false);
      if (response.status === 200) {
        toast.success(response.data.message);
        getUserAddress(viewUserData?.id);
      }
    } catch ({ err, response }) {
      setDeleteAddressLoading(false);
    }
  };

  const exports = {
    getUsers,
    getUserById,
    getRoles,
    getNationalities,
    createUserController,
    verifyUserMobileController,
    createUserWithoutMobileController,
    updateUserController,
    deleteUser,
    roleData,
    nationalityData,
    viewUserData,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
    getRolesLoading,
    getNationalityLoading,
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
    roleTab,
    setRoleTab,
  };
  return exports;
};
export default useUsers;
