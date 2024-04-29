import { useState } from "react";
import useHttp from "./use_http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createOperatorSchema } from "../utility/schemas/index";
import toast from "react-hot-toast";
import {
  setDeleteModal,
  setOperatorList,
  setPatchLoading,
} from "../redux/operator_slice";

const useOperator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getOperators: false,
    createOperator: false,
    updateOperator: false,
    deleteOperator: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [viewOperatorData, setViewOperatorData] = useState(null);

  const getOperators = async () => {
    let dataArray = [];
    try {
      setLoadings({ ...loadings, getOperators: true });
      const response = await httpService.get("/GetOprator");
      setLoadings({ ...loadings, getOperators: false });
      if (response.status === 200) {
        response.data.oprator.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        dispatch(setOperatorList(dataArray));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getOperators: false });
    }
  };

  const getOperatorById = async (operator_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetOprator`, {
        params: {
          id: operator_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.oprator) {
        setViewOperatorData(response.data.oprator);
      } else {
        navigate("/operator/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/operator/all");
      setGetByIdLoading(false);
    }
  };

  const createOperatorController = useFormik({
    initialValues: {
      name: "",
      digit: "",
      active: true,
    },
    validationSchema: createOperatorSchema,
    onSubmit: (values) => {
      createOperator(values);
    },
  });

  const createOperator = async (values) => {
    try {
      setLoadings({ ...loadings, createOperator: true });
      const response = await httpService.post("/AddOperator", {
        name: values.name,
        digit: values.digit,
        active: values.active,
      });
      setLoadings({ ...loadings, createOperator: false });
      if (response.status === 200) {
        navigate("/operator/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createOperator: false });
    }
  };

  const updateOperatorController = useFormik({
    initialValues: {
      id: "",
      name: "",
      digit: "",
      active: true,
    },
    validationSchema: createOperatorSchema,
    onSubmit: (values) => {
      updateOperator(values);
    },
  });

  const updateOperator = async (values) => {
    try {
      setLoadings({ ...loadings, updateOperator: true });
      const response = await httpService.put(`/UpdateOprator/${values.id}`, {
        id: values.id,
        name: values.name,
        digit: values.digit,
        active: values.active,
      });
      setLoadings({ ...loadings, updateOperator: false });
      if (response.status === 200) {
        navigate("/operator/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateOperator: false });
    }
  };

  const deleteOperator = async (entity_id) => {
    try {
      setLoadings({ ...loadings, deleteOperator: true });
      const response = await httpService.delete(`/DeleteOprator/${entity_id}`);
      setLoadings({ ...loadings, deleteOperator: false });
      if (response.status === 200) {
        dispatch(setDeleteModal(null));
        getOperators();
        toast.success(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteOperator: false });
    }
  };

  const patchActive = async (operator) => {
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(`/UpdateOprator/${operator.id}`, {
        id: operator.id,
        name: operator.name,
        digit: operator.digit,
        active: !operator.active,
      });
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getOperators();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getOperators,
    getOperatorById,
    createOperatorController,
    updateOperatorController,
    viewOperatorData,
    deleteOperator,
    patchActive,
    loadings,
    getByIdLoading,
  };
  return exports;
};
export default useOperator;
