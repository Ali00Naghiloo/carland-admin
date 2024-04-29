import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import {
  createCommisionSchema,
  updateCommisionSchema,
} from "../utility/schemas/index";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommisionList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
} from "../redux/commision_slice";
import moment from "jalali-moment";

const useCommision = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getCommisions: false,
    createCommision: false,
    updateCommision: false,
    deleteCommision: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getOperatorsLoading, setGeOperatorsLoading] = useState(false);

  const [filters, setFilters] = useState({
    GradeId: null,
    OperatorId: null,
    ProductId: null,
    ServiceId: null,
    Price: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    Active: true,
  });

  const [operatorsList, setOperatorsList] = useState([]);
  const [viewCommisionData, setViewCommisionData] = useState(null);

  const currentPage = useSelector((state) => state.commision.currentPage);
  const perPage = useSelector((state) => state.commision.perPage);

  const getCommisions = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      GradeId: null,
      OperatorId: null,
      ProductId: null,
      ServiceId: null,
      Price: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      Active: "",
    };
    if (filters?.GradeId && !without_filter) {
      paramsData.GradeId = filters.GradeId.value;
    }
    if (filters?.OperatorId && !without_filter) {
      paramsData.OperatorId = filters.OperatorId.value;
    }
    if (filters?.ProductId && !without_filter) {
      paramsData.ProductId = filters.ProductId.value;
    }
    if (filters?.ServiceId && !without_filter) {
      paramsData.ServiceId = filters.ServiceId.value;
    }
    if (filters?.Price?.length > 0 && !without_filter) {
      paramsData.Price = filters.Price;
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
      paramsData.Active = filters.Active;
    }
    try {
      setLoadings({ ...loadings, getCommisions: true });
      const response = await httpService.get("/GetAllCommision", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getCommisions: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setCommisionList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getCommisions: false });
    }
  };

  const getCommisionById = async (commision_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetAllCommision`, {
        params: {
          Id: commision_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewCommisionData(response.data.data[0]);
      } else {
        navigate("/commision/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/commision/all");
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

  const getSelectGrade = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetGrade`, {
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

  const getSelectProduct = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetProductOprators`, {
        params: {
          PageNumber: page,
          OperatorId:
            location.pathname === "/commision/update"
              ? updateCommisionController.values.operatorId.value
              : createCommisionController.values.operatorId.value,
        },
      });
      if (response.data.data) {
        response.data.data.map((item) => {
          array.push({ label: item.name, value: item.id });
        });
      }
      return {
        options: array,
        hasMore: response.data.totalPages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch ({ err, response }) {}
  };

  const getFilterSelectProduct = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetProductOprators`, {
        params: {
          PageNumber: page,
          OperatorId: filters.OperatorId.value,
        },
      });
      if (response.data.data) {
        response.data.data.map((item) => {
          array.push({ label: item.name, value: item.id });
        });
      }
      return {
        options: array,
        hasMore: response.data.totalPages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch ({ err, response }) {}
  };

  const getSelectService = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetService`, {
        params: {
          PageNumber: page,
          OpratorTableId:
            location.pathname === "/commision/update"
              ? updateCommisionController.values.operatorId.value
              : createCommisionController.values.operatorId.value,
        },
      });
      if (response.data.data) {
        response.data.data.map((item) => {
          array.push({ label: item.name, value: item.id });
        });
      }
      return {
        options: array,
        hasMore: response.data.totalPages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch ({ err, response }) {}
  };

  const getFilterSelectService = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetService`, {
        params: {
          PageNumber: page,
          OpratorTableId: filters.OperatorId.value,
        },
      });
      if (response.data.data) {
        response.data.data.map((item) => {
          array.push({ label: item.name, value: item.id });
        });
      }
      return {
        options: array,
        hasMore: response.data.totalPages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch ({ err, response }) {}
  };

  const createCommisionController = useFormik({
    initialValues: {
      gradeId: null,
      operatorId: null,
      productId: [],
      serviceId: [],
      price: "",
      active: true,
    },
    validationSchema: createCommisionSchema,
    onSubmit: (values) => {
      if (values.productId.length === 0 && values.serviceId.length === 0) {
        toast.error("حداقل یک محصول یا خدمت انتخاب کنید");
      } else {
        createCommision(values);
      }
    },
  });

  const createCommision = async (values) => {
    let postData = {
      gradeId: null,
      operatorId: null,
      productId: [],
      serviceId: [],
      price: values.price,
      active: values.active,
    };
    if (values.gradeId) {
      postData.gradeId = values.gradeId.value;
    }
    if (values.operatorId) {
      postData.operatorId = values.operatorId.value;
    }
    if (postData.parentId) {
      postData.parentId = postData.parentId.value;
    }
    values.productId?.map((item) => {
      postData.productId.push(item.value);
    });
    values.serviceId?.map((item) => {
      postData.serviceId.push(item.value);
    });
    try {
      setLoadings({ ...loadings, createCommision: true });
      const response = await httpService.post("/AddCommision", postData);
      setLoadings({ ...loadings, createCommision: false });
      if (response.status === 200) {
        navigate("/commision/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createCommision: false });
    }
  };

  const updateCommisionController = useFormik({
    initialValues: {
      id: "",
      gradeId: null,
      operatorId: null,
      productId: null,
      serviceId: null,
      price: "",
      active: true,
    },
    validationSchema: updateCommisionSchema,
    onSubmit: (values) => {
      if (!values.productId && !values.serviceId) {
        toast.error("حداقل یک محصول یا خدمت انتخاب کنید");
      } else {
        updateCommision(values);
      }
    },
  });

  const updateCommision = async (values) => {
    let postData = {
      id: values.id,
      gradeId: null,
      operatorId: null,
      productId: null,
      serviceId: null,
      price: values.price,
      active: values.active,
    };
    if (values.gradeId) {
      postData.gradeId = values.gradeId.value;
    }
    if (values.operatorId) {
      postData.operatorId = values.operatorId.value;
    }
    if (values.productId) {
      postData.productId = values.productId.value;
    }
    if (values.serviceId) {
      postData.serviceId = values.serviceId.value;
    }
    try {
      setLoadings({ ...loadings, updateCommision: true });
      const response = await httpService.put("/UpdateCommision", postData);
      setLoadings({ ...loadings, updateCommision: false });
      if (response.status === 200) {
        navigate("/commision/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateCommision: false });
    }
  };

  const deleteCommision = async (commision_id) => {
    try {
      setLoadings({ ...loadings, deleteCommision: true });
      const response = await httpService.delete("/DeleteCommision", {
        params: {
          id: commision_id,
        },
      });
      setLoadings({ ...loadings, deleteCommision: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getCommisions(1, perPage, "without_filter");
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteCommision: false });
    }
  };

  const patchActive = async (commision) => {
    let postData = {
      id: commision.id,
      gradeId: commision.gradeId,
      operatorId: commision.operatorId,
      productId: commision.productId,
      serviceId: commision.serviceId,
      price: commision.price,
      active: !commision.active,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put("/UpdateCommision", postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getCommisions(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getCommisions,
    getCommisionById,
    getSelectGrade,
    getOperators,
    getSelectProduct,
    getFilterSelectProduct,
    getSelectService,
    getFilterSelectService,
    createCommisionController,
    updateCommisionController,
    deleteCommision,
    patchActive,
    viewCommisionData,
    operatorsList,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  };
  return exports;
};
export default useCommision;
