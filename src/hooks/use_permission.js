import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createPermissionSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPermissionList } from "../redux/permission_slice";
import groupBy from "lodash/groupBy";

const usePermission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getPermissions: false,
    createPermission: false,
    updatePermission: false,
    deletePermission: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getRolesLoading, setGetRolesLoading] = useState(false);
  const [getActionPermissionsLoading, setGetActionPermissionsLoading] =
    useState(false);

  const [filters, setFilters] = useState({
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [roleTab, setRoleTab] = useState(null);

  const [viewPermissionData, setViewPermissionData] = useState(null);
  const [roleData, setRoleData] = useState([]);
  const [actionPermissions, setActionPermissions] = useState([]);

  const getPermissions = async () => {
    let dataArray = [];
    let paramsData = {
      roleId: roleTab,
    };
    try {
      setLoadings({ ...loadings, getPermissions: true });
      const response = await httpService.get("/GetPermissionForRole", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getPermissions: false });

      Object.keys(response.data).map((item) => {
        dataArray.push({
          open: true,
          label: item,
          value: response.data[item],
        });
      });
      dispatch(setPermissionList(dataArray));
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getPermissions: false });
    }
  };

  const getPermissionById = async (permission_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetPermissionForRole`, {
        params: {
          Id: permission_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewPermissionData(response.data.data[0]);
      } else {
        navigate("/permission/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/permission/all");
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
        response.data.data.map((dataItem, index) => {
          dataArray.push({ label: dataItem.name, value: dataItem.id });
        });
        setRoleTab(response.data.data[0].id);
        setRoleData(dataArray);
      }
    } catch ({ err, response }) {
      setGetRolesLoading(false);
    }
  };

  const getActionPermissions = async () => {
    let dataArray = [];
    try {
      setGetActionPermissionsLoading(true);
      const response = await httpService.get("/GetAllControllerActions");
      setGetActionPermissionsLoading(false);
      if (response.data) {
        Object.keys(response.data).map((item) => {
          dataArray.push({
            open: true,
            label: item,
            value: response.data[item],
          });
        });
        setActionPermissions(dataArray);
      }
    } catch ({ err, response }) {
      setGetActionPermissionsLoading(false);
    }
  };

  const createPermissionController = useFormik({
    initialValues: {
      roleId: null,
      permissionDatas: [],
    },
    validationSchema: createPermissionSchema,
    onSubmit: (values) => {
      createPermission(values);
    },
  });

  const createPermission = async (values) => {
    let postData = {
      roleId: values.roleId.value.toString(),
      permissionDatas: [],
    };
    values.permissionDatas.map((item) => {
      postData.permissionDatas.push({
        controllerName: item.entityName,
        actionName: item.actionName,
        isActive: true,
      });
    });
    try {
      setLoadings({ ...loadings, createPermission: true });
      const response = await httpService.post(
        "/SetPermissionForRole",
        postData
      );
      setLoadings({ ...loadings, createPermission: false });
      if (response.status === 200) {
        navigate("/permission/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createPermission: false });
    }
  };

  const updatePermissionController = useFormik({
    initialValues: {
      id: "",
      roleId: null,
      permissionDatas: [],
      isActive: true,
    },
    enableReinitialize: true,
    validationSchema: createPermissionSchema,
    onSubmit: (values) => {
      updatePermission(values);
    },
  });

  const updatePermission = async (values) => {
    let postData = {
      id: values.id,
      roleId: values.roleId.value,
      permissionDatas: [],
      isActive: values.isActive,
    };
    values.permissionDatas.map((item) => {
      postData.permissionDatas.push({
        controllerName: item.label,
        actionName: item.value,
      });
    });
    try {
      setLoadings({ ...loadings, updatePermission: true });
      const response = await httpService.put("/SetPermissionForRole", postData);
      setLoadings({ ...loadings, updatePermission: false });
      if (response.status === 200) {
        navigate("/permission/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updatePermission: false });
    }
  };

  const exports = {
    getPermissions,
    getPermissionById,
    getRoles,
    getActionPermissions,
    viewPermissionData,
    roleData,
    actionPermissions,
    setActionPermissions,
    createPermissionController,
    updatePermissionController,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
    getRolesLoading,
    roleTab,
    setRoleTab,
  };
  return exports;
};
export default usePermission;
