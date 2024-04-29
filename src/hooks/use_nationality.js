import { useState } from "react";
import useHttp from "./use_http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createNationalitySchema } from "../utility/schemas/index";
import toast from "react-hot-toast";
import { setDeleteModal, setNationalityList } from "../redux/nationality_slice";

const useNationality = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getNationalities: false,
    createNationality: false,
    updateNationality: false,
    deleteNationality: false,
  });

  const getNationalities = async () => {
    let dataArray = [];
    try {
      setLoadings({ ...loadings, getNationalities: true });
      const response = await httpService.get("/GetAllNationality");
      setLoadings({ ...loadings, getNationalities: false });
      if (response.data.nationality) {
        response.data.nationality.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setNationalityList(dataArray));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getNationalities: false });
    }
  };

  const createNationalityController = useFormik({
    initialValues: {
      nationalityName: "",
    },
    validationSchema: createNationalitySchema,
    onSubmit: (values) => {
      createNationality(values);
    },
  });

  const createNationality = async (values) => {
    let postData = {
      nationalityName: values.nationalityName,
    };
    try {
      setLoadings({ ...loadings, createNationality: true });
      const response = await httpService.post("/AddNationality", postData);
      setLoadings({ ...loadings, createNationality: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/nationality/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createNationality: false });
    }
  };

  const updateGradeController = useFormik({
    initialValues: {
      nationality_id: "",
      nationalityName: "",
    },
    validationSchema: createNationalitySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateNationality(values);
    },
  });

  const updateNationality = async (values) => {
    let postData = {
      id: values.nationality_id,
      nationalityName: values.nationalityName,
    };
    try {
      setLoadings({ ...loadings, updateNationality: true });
      const response = await httpService.put("/EditNationality", postData);
      setLoadings({ ...loadings, updateNationality: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/nationality/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateNationality: false });
    }
  };

  const deleteNationality = async (nationality_id) => {
    try {
      setLoadings({ ...loadings, deleteNationality: true });
      const response = await httpService.delete(`/DeleteNationality`, {
        params: {
          id: nationality_id,
        },
      });
      setLoadings({ ...loadings, deleteNationality: false });
      if (response.status === 200) {
        getNationalities();
        dispatch(setDeleteModal(null));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteNationality: false });
    }
  };

  const exports = {
    getNationalities,
    createNationalityController,
    updateGradeController,
    deleteNationality,
    loadings,
  };
  return exports;
};
export default useNationality;
