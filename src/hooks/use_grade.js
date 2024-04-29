import { useState } from "react";
import useHttp from "./use_http";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createGradeSchema } from "../utility/schemas/index";
import toast from "react-hot-toast";
import {
  setCurrentPage,
  setDeleteModal,
  setGradeList,
  setTotalPage,
  setPatchLoading,
} from "../redux/grade_slice";
import moment from "jalali-moment";

const useGrade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getGrades: false,
    createGrade: false,
    updateGrade: false,
    deleteGrade: false,
  });
  const [getOperatorsLoading, setGeOperatorsLoading] = useState([]);
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    operatorId: "",
    score: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    active: true,
  });

  const [operatorsList, setOperatorsList] = useState([]);

  const [viewGradeData, setViewGradeData] = useState(null);

  const currentPage = useSelector((state) => state.grade.currentPage);
  const perPage = useSelector((state) => state.grade.perPage);

  const getGrades = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      name: "",
      operatorId: "",
      score: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      active: "",
    };
    if (filters?.name?.length > 0 && !without_filter) {
      paramsData.name = filters.name;
    }
    if (filters?.operatorId && !without_filter) {
      paramsData.operatorId = filters.operatorId?.value;
    }
    if (filters?.score?.length > 0 && !without_filter) {
      paramsData.score = filters.score;
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
    if (!without_filter) {
      paramsData.active = filters.active;
    }
    try {
      setLoadings({ ...loadings, getGrades: true });
      const response = await httpService.get("/GetGrade", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getGrades: false });
      if (response.data.data) {
        response.data.data.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        dispatch(setGradeList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getGrades: false });
    }
  };

  const getGradeById = async (grade_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetGrade`, {
        params: {
          Id: grade_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewGradeData(response.data.data[0]);
      } else {
        navigate("/grade/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/grade/all");
      setGetByIdLoading(false);
    }
  };

  const getOperators = async () => {
    let array = [];
    try {
      setGeOperatorsLoading(true);
      const response = await httpService.get("/GetOprator");
      setGeOperatorsLoading(false);
      response.data.oprator.map((item) => {
        array.push({
          label: item.name,
          value: item.id,
        });
      });
      setOperatorsList(array);
    } catch ({ err, response }) {
      setGeOperatorsLoading(false);
    }
  };

  const createGradeController = useFormik({
    initialValues: {
      name: "",
      operatorId: null,
      score: "",
      active: true,
    },
    validationSchema: createGradeSchema,
    onSubmit: (values) => {
      createGrade(values);
    },
  });

  const createGrade = async (values) => {
    let postData = {
      name: values.name,
      operatorId: values?.operatorId?.value,
      score: values?.score,
      active: values?.active,
    };
    try {
      setLoadings({ ...loadings, createGrade: true });
      const response = await httpService.post("/AddGrade", postData);
      setLoadings({ ...loadings, createGrade: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/grade/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createGrade: false });
    }
  };

  const updateGradeController = useFormik({
    initialValues: {
      grade_id: "",
      name: "",
      operatorId: null,
      score: "",
      CreateDate: null,
      UpdateDate: null,
      UserName: "",
      active: true,
    },
    validationSchema: createGradeSchema,
    onSubmit: (values) => {
      updateGrade(values);
    },
  });

  const updateGrade = async (values) => {
    let postData = {
      id: values.grade_id,
      name: values.name,
      operatorId: values?.operatorId?.value,
      score: values?.score,
      active: values?.active,
    };
    try {
      setLoadings({ ...loadings, updateGrade: true });
      const response = await httpService.put("/UpdateGrade", postData);
      setLoadings({ ...loadings, updateGrade: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/grade/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateGrade: false });
    }
  };

  const deleteGrade = async (grade_id) => {
    try {
      setLoadings({ ...loadings, deleteGrade: true });
      const response = await httpService.delete(`/DeleteGrade`, {
        data: {
          id: grade_id,
        },
      });
      setLoadings({ ...loadings, deleteGrade: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getGrades(1, perPage);
        dispatch(setDeleteModal(null));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteGrade: false });
    }
  };

  const patchActive = async (grade) => {
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(`/UpdateGrade`, {
        id: grade.id,
        name: grade.name,
        operatorId: grade?.operator?.id,
        score: grade.score,
        active: !grade.active,
      });
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        toast.success(response.data.message);
        getGrades(currentPage, perPage, "without_filter");
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getGrades,
    getGradeById,
    getOperators,
    createGradeController,
    updateGradeController,
    viewGradeData,
    operatorsList,
    deleteGrade,
    patchActive,
    filters,
    setFilters,
    loadings,
    getOperatorsLoading,
    getByIdLoading,
  };
  return exports;
};
export default useGrade;
