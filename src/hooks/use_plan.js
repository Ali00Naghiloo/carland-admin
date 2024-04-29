import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "./use_http";
import { useFormik } from "formik";
import { createPlanSchema } from "../utility/schemas/index";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setDeleteModal,
  setPlanList,
  setTotalPage,
} from "../redux/plan_slice";
import moment from "jalali-moment";

const usePlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getPlans: false,
    createPlan: false,
    updatePlan: false,
    deletePlan: false,
  });
  const [getOperatorsLoading, setGeOperatorsLoading] = useState(false);
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    Name: "",
    Summray: "",
    CountStar: "",
    Description: "",
    CategoryId: null,
    OpratorId: null,
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [operatorsList, setOperatorsList] = useState([]);
  const [viewPlanData, setViewPlanData] = useState(null);

  const perPage = useSelector((state) => state.plan.perPage);

  const getPlans = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Name: "",
      Summray: "",
      CountStar: "",
      Description: "",
      CategoryId: "",
      OpratorId: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
    };
    if (filters?.Name?.length > 0 && !without_filter) {
      paramsData.Name = filters.Name;
    }
    if (filters?.Summray?.length > 0 && !without_filter) {
      paramsData.Summray = filters.Summray;
    }
    if (filters?.CountStar?.length > 0 && !without_filter) {
      paramsData.CountStar = filters.CountStar;
    }
    if (filters?.Description?.length > 0 && !without_filter) {
      paramsData.Description = filters.Description;
    }
    if (filters?.CategoryId && !without_filter) {
      paramsData.CategoryId = filters.CategoryId.value;
    }
    if (filters?.OpratorId && !without_filter) {
      paramsData.OpratorId = filters.OpratorId.value;
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
      setLoadings({ ...loadings, getPlans: true });
      const response = await httpService.get("/GetAllPlane", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getPlans: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setPlanList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getPlans: false });
    }
  };

  const getPlanById = async (plan_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetAllPlane`, {
        params: {
          Id: plan_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewPlanData(response.data.data[0]);
      } else {
        navigate("/plan/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/plan/all");
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

  const getSelectCategories = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetCategory`, {
        params: {
          PageNumber: page,
        },
      });
      response.data.data.map((item) => {
        array.push({ label: item.name, value: item.id });
      });
      return {
        options: array,
        hasMore: response.data.totalPages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch ({ err, response }) {}
  };

  const createPlanController = useFormik({
    initialValues: {
      name: "",
      image: "",
      summray: "",
      description: "",
      categoryId: null,
      opratorId: null,
      countStar: 1,
    },
    validationSchema: createPlanSchema,
    onSubmit: (values) => {
      createPlan(values);
    },
  });

  const createPlan = async (values) => {
    let postData = { ...values };
    if (postData.categoryId) {
      postData.categoryId = postData.categoryId.value;
    }
    if (postData.opratorId) {
      postData.opratorId = postData.opratorId.value;
    }
    try {
      setLoadings({ ...loadings, createPlan: true });
      const response = await httpService.post("/AddPlane", postData);
      setLoadings({ ...loadings, createPlan: false });
      if (response.status === 200) {
        navigate("/plan/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createPlan: false });
    }
  };

  const updatePlanController = useFormik({
    initialValues: {
      id: "",
      name: "",
      image: "",
      summray: "",
      description: "",
      categoryId: null,
      opratorId: null,
      countStar: 1,
    },
    validationSchema: createPlanSchema,
    onSubmit: (values) => {
      updatePlan(values);
    },
  });

  const updatePlan = async (values) => {
    let postData = {
      id: values.id,
      name: values.name,
      summray: values.summray,
      description: values.description,
      countStar: values.countStar,
      categoryId: "",
      opratorId: "",
    };
    if (values?.categoryId) {
      postData.categoryId = values.categoryId.value;
    }
    if (values?.opratorId) {
      postData.opratorId = values.opratorId.value;
    }
    if (values?.image?.length > 0) {
      postData["image"] = values.image;
    }
    try {
      setLoadings({ ...loadings, updatePlan: true });
      const response = await httpService.put("/UpdatePlane", postData);
      setLoadings({ ...loadings, updatePlan: false });
      if (response.status === 200) {
        navigate("/plan/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updatePlan: false });
    }
  };

  const deletePlan = async (plan_id) => {
    try {
      setLoadings({ ...loadings, deletePlan: true });
      const response = await httpService.delete(`/DeletePlane/${plan_id}`);
      setLoadings({ ...loadings, deletePlan: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getPlans(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deletePlan: false });
    }
  };

  const exports = {
    getPlans,
    getPlanById,
    getOperators,
    getSelectCategories,
    createPlanController,
    updatePlanController,
    deletePlan,
    operatorsList,
    viewPlanData,
    filters,
    setFilters,
    loadings,
    getOperatorsLoading,
    getByIdLoading,
  };
  return exports;
};
export default usePlan;
