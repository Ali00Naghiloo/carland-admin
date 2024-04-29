import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createDeliverySchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeliveryList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
} from "../redux/delivery_slice";
import moment from "jalali-moment";

const useDelivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getDeliveries: false,
    createDelivery: false,
    updateDelivery: false,
    deleteDelivery: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    ProvincesId: null,
    CitiesId: null,
    Price: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    is_active: true,
  });

  const [viewDeliveryData, setViewDeliveryData] = useState(null);

  const currentPage = useSelector((state) => state.delivery.currentPage);
  const perPage = useSelector((state) => state.delivery.perPage);

  const getDeliveries = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      ProvincesId: "",
      CitiesId: "",
      Price: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      is_active: "",
    };
    if (filters.ProvincesId && !without_filter) {
      paramsData.ProvincesId = filters.ProvincesId.value;
    }
    if (filters.CitiesId && !without_filter) {
      paramsData.CitiesId = filters.CitiesId.value;
    }
    if (filters.Price.length > 0 && !without_filter) {
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
      paramsData.is_active = filters.is_active;
    }
    try {
      setLoadings({ ...loadings, getDeliveries: true });
      const response = await httpService.get("/GetDelivery", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getDeliveries: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setDeliveryList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getDeliveries: false });
    }
  };

  const getDeliveryById = async (delivery_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetDelivery`, {
        params: {
          Id: delivery_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewDeliveryData(response.data.data[0]);
      } else {
        navigate("/delivery/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/delivery/all");
      setGetByIdLoading(false);
    }
  };

  const getProvinces = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetProvince`, {
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

  const getCities = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetCities`, {
        params: {
          PageNumber: page,
          Provinceid: createDeliveryController.values.provincesId.value,
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

  const getFilterCities = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetCities`, {
        params: {
          PageNumber: page,
          Provinceid: filters.ProvincesId.value,
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

  const getUpdateCities = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetCities`, {
        params: {
          PageNumber: page,
          Provinceid: updateDeliveryController.values.provincesId.value,
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

  const createDeliveryController = useFormik({
    initialValues: {
      provincesId: null,
      citiesId: null,
      price: "",
      is_active: true,
    },
    validationSchema: createDeliverySchema,
    onSubmit: (values) => {
      createDelivery(values);
    },
  });

  const createDelivery = async (values) => {
    let postData = {
      provincesId: null,
      citiesId: null,
      price: values.price,
      is_active: values.is_active,
    };
    if (values.provincesId) {
      postData.provincesId = values.provincesId.value;
    }
    if (values.citiesId) {
      postData.citiesId = values.citiesId.value;
    }
    try {
      setLoadings({ ...loadings, createDelivery: true });
      const response = await httpService.post("/AddDelivery", postData);
      setLoadings({ ...loadings, createDelivery: false });
      if (response.status === 200) {
        navigate("/delivery/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createDelivery: false });
    }
  };

  const updateDeliveryController = useFormik({
    initialValues: {
      id: "",
      provincesId: null,
      citiesId: null,
      price: "",
      is_active: true,
    },
    validationSchema: createDeliverySchema,
    onSubmit: (values) => {
      updateDelivery(values);
    },
  });

  const updateDelivery = async (values) => {
    let postData = {
      id: values.id,
      provincesId: null,
      citiesId: null,
      price: values.price,
      is_active: values.is_active,
    };
    if (values.provincesId) {
      postData.provincesId = values.provincesId.value;
    }
    if (values.citiesId) {
      postData.citiesId = values.citiesId.value;
    }
    try {
      setLoadings({ ...loadings, updateDelivery: true });
      const response = await httpService.put("/UpdateDelivery", postData);
      setLoadings({ ...loadings, updateDelivery: false });
      if (response.status === 200) {
        navigate("/delivery/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateDelivery: false });
    }
  };

  const deleteDelivery = async (delivery_id) => {
    try {
      setLoadings({ ...loadings, deleteDelivery: true });
      const response = await httpService.delete("/DeleteDelivery", {
        params: {
          id: delivery_id,
        },
      });
      setLoadings({ ...loadings, deleteDelivery: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getDeliveries(1, perPage, "without_filter");
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteDelivery: false });
    }
  };

  const patchActive = async (delivery) => {
    let postData = {
      id: delivery.id,
      provincesId: delivery.provincesId,
      citiesId: delivery.citiesId,
      price: delivery.price,
      is_active: !delivery.is_active,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put("/UpdateDelivery", postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getDeliveries(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getDeliveries,
    getDeliveryById,
    getProvinces,
    getCities,
    getFilterCities,
    getUpdateCities,
    createDeliveryController,
    updateDeliveryController,
    deleteDelivery,
    patchActive,
    viewDeliveryData,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
  };
  return exports;
};
export default useDelivery;
