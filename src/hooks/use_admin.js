import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createAdminSchema, updateAdminSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminList,
  setTotalPage,
  setPatchLoading,
  setCurrentPage,
  setDeleteModal,
} from "../redux/admin_slice";
import moment from "jalali-moment";

const useAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getAdmins: false,
    createAdmin: false,
    updateAdmin: false,
    deleteAdmin: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getRolesLoading, setGetRolesLoading] = useState(false);

  const [filters, setFilters] = useState({
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [viewAdminData, setViewAdminData] = useState(null);
  const [roleData, setRoleData] = useState([]);

  const currentPage = useSelector((state) => state.admin.currentPage);
  const perPage = useSelector((state) => state.admin.perPage);

  const getAdmins = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      isActive: "",
    };
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
      setLoadings({ ...loadings, getAdmins: true });
      const response = await httpService.get("/GetAllListUser", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getAdmins: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setAdminList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getAdmins: false });
    }
  };

  const getAdminById = async (admin_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetAllListUser`, {
        params: {
          Id: admin_id,
          // isActive: "",
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewAdminData(response.data.data[0]);
      } else {
        navigate("/admin/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/admin/all");
      setGetByIdLoading(false);
    }
  };

  const getRoles = async () => {
    let dataArray = [];
    try {
      setGetRolesLoading(true);
      const response = await httpService.get("/GetAllRole");
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

  const createAdminController = useFormik({
    initialValues: {
      phoneNumber: "",
      roleId: null,
      password: "",
      confirmPassword: "",
      email: "",
      family: "",
      name: "",
      myProperty: 0,
      avatar: "",
      isActive: true,
    },
    validationSchema: createAdminSchema,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("رمز و رمزعبور باید یکسان باشد.");
      } else {
        createAdmin(values);
      }
    },
  });

  const createAdmin = async (values) => {
    let postData = {
      phoneNumber: values.phoneNumber,
      roleId: values.roleId.value,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
      family: values.family,
      name: values.name,
      myProperty: 0,
      avatar: values.avatar,
      isActive: values.isActive,
    };
    try {
      setLoadings({ ...loadings, createAdmin: true });
      const response = await httpService.post(
        "/Auth/Register/register",
        postData
      );
      setLoadings({ ...loadings, createAdmin: false });
      if (response.status === 200) {
        navigate("/admin/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createAdmin: false });
    }
  };

  const updateAdminController = useFormik({
    initialValues: {
      id: "",
      phoneNumber: "",
      roleId: null,
      oldpassword: "",
      newpassword: "",
      confirmPassword: "",
      email: "",
      family: "",
      name: "",
      myProperty: 0,
      avatar: "",
      isActive: true,
    },
    enableReinitialize: true,
    validationSchema: updateAdminSchema,
    onSubmit: (values) => {
      updateAdmin(values);
    },
  });

  const updateAdmin = async (values) => {
    let postData = {
      id: values.id,
      phoneNumber: values.phoneNumber,
      roleId: values.roleId.value,
      email: values.email,
      family: values.family,
      name: values.name,
      myProperty: values.myProperty,
      avatar: values.avatar,
      isActive: values.isActive,
    };
    if (values.oldpassword.length > 0) {
      postData["oldpassword"] = values.oldpassword;
    }
    if (values.newpassword.length > 0) {
      postData["newpassword"] = values.newpassword;
    }
    if (values.confirmPassword.length > 0) {
      postData["confirmPassword"] = values.confirmPassword;
    }
    try {
      setLoadings({ ...loadings, updateAdmin: true });
      const response = await httpService.post(
        "/Auth/UpdateUser/updateUser",
        postData
      );
      setLoadings({ ...loadings, updateAdmin: false });
      if (response.status === 200) {
        navigate("/admin/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateAdmin: false });
    }
  };

  const deleteAdmin = async (admin_id) => {
    try {
      setLoadings({ ...loadings, deleteAdmin: true });
      const response = await httpService.delete(`/DeleteUser`, {
        params: {
          id: admin_id,
        },
      });
      setLoadings({ ...loadings, deleteAdmin: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getAdmins(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteAdmin: false });
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

  const patchActive = async (admin) => {
    let postData = {
      id: admin.id,
      phoneNumber: admin.phoneNumber,
      roleId: admin.roleId,
      email: admin.email,
      family: admin.family,
      name: admin.name,
      myProperty: admin.myProperty,
      avatar: "",
      isActive: !admin.isActive,
    };
    if (admin.avatar) {
      await imageUrlToBase64(
        process.env.REACT_APP_BASE_URL + admin.avatar
      ).then((item) => {
        postData["avatar"] = item;
      });
    }
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.post(
        "/Auth/UpdateUser/updateUser",
        postData
      );
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getAdmins(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getAdmins,
    getAdminById,
    getRoles,
    viewAdminData,
    roleData,
    createAdminController,
    updateAdminController,
    deleteAdmin,
    patchActive,
    getByIdLoading,
    filters,
    setFilters,
    loadings,
    getRolesLoading,
  };
  return exports;
};
export default useAdmin;
