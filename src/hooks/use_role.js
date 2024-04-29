import { useState } from "react";
import useHttp from "./use_http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createRoleSchema } from "../utility/schemas/index";
import toast from "react-hot-toast";
import {
  setDeleteModal,
  setRoleList,
  setPatchLoading,
} from "../redux/role_slice";

const useRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getRoles: false,
    createRole: false,
    updateRole: false,
    deleteRole: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [viewRoleData, setViewRoleData] = useState(null);

  const getRoles = async () => {
    let dataArray = [];
    try {
      setLoadings({ ...loadings, getRoles: true });
      const response = await httpService.get("/GetAllRole");
      setLoadings({ ...loadings, getRoles: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setRoleList(dataArray));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getRoles: false });
    }
  };

  const getRoleById = async (role_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get("/GetAllRole", {
        params: {
          id: role_id,
        },
      });
      setGetByIdLoading(false);
      if (response.data.data) {
        setViewRoleData(response.data.data[0]);
      }
    } catch ({ err, response }) {
      setGetByIdLoading(false);
    }
  };

  const createRoleController = useFormik({
    initialValues: {
      name: "",
      isActive: true,
    },
    validationSchema: createRoleSchema,
    onSubmit: (values) => {
      createRole(values);
    },
  });

  const createRole = async (values) => {
    let postData = {
      name: values.name,
      isActive: values.isActive,
    };
    try {
      setLoadings({ ...loadings, createRole: true });
      const response = await httpService.post("/AddRole", postData);
      setLoadings({ ...loadings, createRole: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/role/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createRole: false });
    }
  };

  const updateRoleController = useFormik({
    initialValues: {
      role_id: "",
      name: "",
      isActive: true,
    },
    validationSchema: createRoleSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateRole(values);
    },
  });

  const updateRole = async (values) => {
    let postData = {
      id: values.role_id,
      name: values.name,
      isActive: values.isActive,
    };
    try {
      setLoadings({ ...loadings, updateRole: true });
      const response = await httpService.put("/EditRole", postData);
      setLoadings({ ...loadings, updateRole: false });
      if (response.status === 200) {
        toast.success("با موفقیت ویرایش شد.");
        navigate("/role/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateRole: false });
    }
  };

  const deleteRole = async (role_id) => {
    try {
      setLoadings({ ...loadings, deleteRole: true });
      const response = await httpService.delete(`/DeleteRole`, {
        params: {
          id: role_id,
        },
      });
      setLoadings({ ...loadings, deleteRole: false });
      if (response.status === 200) {
        getRoles();
        dispatch(setDeleteModal(null));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteRole: false });
    }
  };

  const patchActive = async (role) => {
    let postData = {
      id: role.id,
      name: role.name,
      isActive: !role.isActive,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put("/EditRole", postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getRoles();
        toast.success("با موفقیت ویرایش شد.");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getRoles,
    getRoleById,
    createRoleController,
    updateRoleController,
    deleteRole,
    patchActive,
    viewRoleData,
    loadings,
    getByIdLoading,
  };
  return exports;
};
export default useRole;
