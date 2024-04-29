import { useState } from "react";
import useHttp from "./use_http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createNumberLabelSchema } from "../utility/schemas/index";
import toast from "react-hot-toast";
import { setDeleteModal } from "../redux/number_label_slice";

const useNumberLabel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getNumberLabels: false,
    createNumberLabel: false,
    deleteNumberLabel: false,
  });

  const [numberLabelsList, setNumberLabelsList] = useState([]);

  const getNumberLabels = async () => {
    let dataArray = [];
    try {
      setLoadings({ ...loadings, getNumberLabels: true });
      const response = await httpService.get("/GetLabelNumber");
      setLoadings({ ...loadings, getNumberLabels: false });
      if (response.status === 200) {
        response.data.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        setNumberLabelsList(dataArray);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getNumberLabels: false });
    }
  };

  const createNumberLabelController = useFormik({
    initialValues: {
      name: "",
      active: true,
    },
    validationSchema: createNumberLabelSchema,
    onSubmit: (values) => {
      createNumberLabel(values);
    },
  });

  const createNumberLabel = async (values) => {
    try {
      setLoadings({ ...loadings, createNumberLabel: true });
      const response = await httpService.post("/AddLabelNumber", {
        name: values.name,
        active: values.active,
      });
      setLoadings({ ...loadings, createNumberLabel: false });
      if (response.status === 200) {
        navigate("/number_label/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createNumberLabel: false });
    }
  };

  const deleteNumberLabel = async (entity_id) => {
    try {
      setLoadings({ ...loadings, deleteNumberLabel: true });
      const response = await httpService.delete(
        `/DeleteLabelNumber/${entity_id}`
      );
      setLoadings({ ...loadings, deleteNumberLabel: false });
      if (response.status === 200) {
        dispatch(setDeleteModal(null));
        getNumberLabels();
        toast.success(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteNumberLabel: false });
    }
  };

  const exports = {
    getNumberLabels,
    createNumberLabelController,
    deleteNumberLabel,
    numberLabelsList,
    loadings,
  };
  return exports;
};
export default useNumberLabel;
