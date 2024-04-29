import { useState } from "react";
import useHttp from "./use_http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNumberLabelSchema } from "../utility/schemas/index";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { setDeleteModal } from "../redux/number_type_slice";

const useNumberType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getNumberTypes: false,
    createNumberType: false,
    deleteNumberType: false,
  });

  const [numberTypesList, setNumberTypesList] = useState([]);

  const getNumberTypes = async () => {
    let dataArray = [];
    try {
      setLoadings({ ...loadings, getNumberTypes: true });
      const response = await httpService.get("/GetAllTypeNumber");
      setLoadings({ ...loadings, getNumberTypes: false });
      if (response.status === 200) {
        response.data.typeNumber.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        setNumberTypesList(dataArray);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getNumberTypes: false });
    }
  };

  const createNumberTypeController = useFormik({
    initialValues: {
      name: "",
      active: true,
    },
    validationSchema: createNumberLabelSchema,
    onSubmit: (values) => {
      createNumberType(values);
    },
  });

  const createNumberType = async (values) => {
    try {
      setLoadings({ ...loadings, createNumberType: true });
      const response = await httpService.post("/AddTypeNumber", {
        name: values.name,
        active: values.active,
      });
      setLoadings({ ...loadings, createNumberType: false });
      if (response.status === 200) {
        navigate("/number_type/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createNumberType: false });
    }
  };

  const deleteNumberType = async (entity_id) => {
    try {
      setLoadings({ ...loadings, deleteNumberType: true });
      const response = await httpService.delete(`/DeleteTypeNumber`, {
        params: {
          id: entity_id,
        },
      });
      setLoadings({ ...loadings, deleteNumberType: false });
      if (response.status === 200) {
        dispatch(setDeleteModal(null));
        getNumberTypes();
        toast.success(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteNumberType: false });
    }
  };

  const exports = {
    getNumberTypes,
    createNumberTypeController,
    deleteNumberType,
    numberTypesList,
    loadings,
  };
  return exports;
};

export default useNumberType;
