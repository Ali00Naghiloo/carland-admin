import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createServiceSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setServiceList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
  setOfferModal,
  setScoreModal,
} from "../redux/service_slice";
import moment from "jalali-moment";

const useService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getServices: false,
    createService: false,
    updateService: false,
    deleteService: false,
    assignOffer: false,
    addScore: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getOperatorsLoading, setGetOperatorsLoading] = useState(false);

  const [filters, setFilters] = useState({
    Name: "",
    OpratorTableId: null,
    CategoryId: null,
    CreditPrice: "",
    FixedPrice: "",
    OfferId: null,
    Score: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    IsActive: true,
  });

  const [viewServiceData, setViewServiceData] = useState(null);
  const [operatorsList, setOperatorsList] = useState([]);

  const currentPage = useSelector((state) => state.service.currentPage);
  const perPage = useSelector((state) => state.service.perPage);

  const getServices = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Name: "",
      OpratorTableId: null,
      CategoryId: null,
      CreditPrice: "",
      FixedPrice: "",
      OfferId: "",
      Score: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      IsActive: "",
    };
    if (filters?.Name?.length > 0 && !without_filter) {
      paramsData.Name = filters.Name;
    }
    if (filters?.OpratorTableId && !without_filter) {
      paramsData.OpratorTableId = filters.OpratorTableId.value;
    }
    if (filters?.CategoryId && !without_filter) {
      paramsData.CategoryId = filters.CategoryId.value;
    }
    if (filters?.CreditPrice?.length > 0 && !without_filter) {
      paramsData.CreditPrice = filters.CreditPrice;
    }
    if (filters?.FixedPrice?.length > 0 && !without_filter) {
      paramsData.FixedPrice = filters.FixedPrice;
    }
    if (filters?.OfferId && !without_filter) {
      paramsData.OfferId = filters.OfferId.value;
    }
    if (filters?.Score?.length > 0 && !without_filter) {
      paramsData.Score = filters.Score;
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
      paramsData.IsActive = filters.IsActive;
    }
    try {
      setLoadings({ ...loadings, getServices: true });
      const response = await httpService.get("/GetService", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getServices: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setServiceList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getServices: false });
    }
  };

  const getServiceById = async (service_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetService`, {
        params: {
          Id: service_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewServiceData(response.data.data[0]);
      } else {
        navigate("/service/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/service/all");
      setGetByIdLoading(false);
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
      console.log(response.data.totalPages, page);
      return {
        options: array,
        hasMore: response.data.totalPages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch ({ err, response }) {}
  };

  const getSelectOffers = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetAllOffer`, {
        params: {
          PageNumber: page,
        },
      });
      response.data.data.map((item) => {
        array.push({ label: item.offerName, value: item.id });
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

  const getOperators = async () => {
    let array = [];
    try {
      setGetOperatorsLoading(true);
      const response = await httpService.get("/GetOprator");
      setGetOperatorsLoading(false);
      response.data.oprator.map((item) => {
        array.push({
          label: item.name,
          value: item.id,
        });
      });
      setOperatorsList(array);
    } catch ({ err, response }) {
      setGetOperatorsLoading(false);
    }
  };

  const createServiceController = useFormik({
    initialValues: {
      image: "",
      name: "",
      opratorTableId: null,
      categoryId: null,
      creditPrice: "",
      fixedPrice: "",
      summary: "",
      isActive: true,
    },
    validationSchema: createServiceSchema,
    onSubmit: (values) => {
      createService(values);
    },
  });

  const createService = async (values) => {
    let postData = {
      image: values.image,
      name: values.name,
      opratorTableId: null,
      categoryId: null,
      creditPrice: values.creditPrice,
      fixedPrice: values.fixedPrice,
      summary: values.summary,
      isActive: values.isActive,
    };
    if (values.opratorTableId) {
      postData.opratorTableId = values?.opratorTableId?.value;
    }
    if (values.categoryId) {
      postData.categoryId = values?.categoryId?.value;
    }
    try {
      setLoadings({ ...loadings, createService: true });
      const response = await httpService.post("/AddService", postData);
      setLoadings({ ...loadings, createService: false });
      if (response.status === 200) {
        navigate("/service/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createService: false });
    }
  };

  const updateServiceController = useFormik({
    initialValues: {
      id: "",
      name: "",
      image: "",
      opratorTableId: null,
      categoryId: null,
      creditPrice: "",
      fixedPrice: "",
      summary: "",
      isActive: true,
    },
    enableReinitialize: true,
    validationSchema: createServiceSchema,
    onSubmit: (values) => {
      updateService(values);
    },
  });

  const updateService = async (values) => {
    let postData = {
      id: values.id,
      image: values.image,
      name: values.name,
      opratorTableId: null,
      categoryId: null,
      creditPrice: values.creditPrice,
      fixedPrice: values.fixedPrice,
      summary: values.summary,
      isActive: values.isActive,
    };
    if (values.opratorTableId) {
      postData.opratorTableId = values.opratorTableId.value;
    }
    if (values.categoryId) {
      postData.categoryId = values.categoryId.value;
    }
    try {
      setLoadings({ ...loadings, updateService: true });
      const response = await httpService.put(`/EditService`, postData, {
        params: {
          id: postData.id,
        },
      });
      setLoadings({ ...loadings, updateService: false });
      if (response.status === 200) {
        navigate("/service/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateService: false });
    }
  };

  const deleteService = async (service_id) => {
    try {
      setLoadings({ ...loadings, deleteService: true });
      const response = await httpService.delete(`/DeleteService`, {
        params: {
          id: service_id,
        },
      });
      setLoadings({ ...loadings, deleteService: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getServices(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteService: false });
    }
  };

  const imageUrlToBase64 = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  const patchActive = async (service) => {
    let postData = {
      id: service.id,
      image: null,
      name: service.name,
      opratorTableId: service.opratorTable.id,
      categoryId: service.category.id,
      creditPrice: service.creditPrice,
      fixedPrice: service.fixedPrice,
      summary: service.summary,
      isActive: !service.isActive,
    };
    if (service.image) {
      await imageUrlToBase64(
        process.env.REACT_APP_BASE_URL + service.image
      ).then((item) => {
        postData["image"] = item;
      });
    }
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(`/EditService`, postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getServices(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const assignOffer = async (service_id, offer_id) => {
    let postData = {
      offerId: offer_id ? offer_id : null,
      productId: [],
      serviceId: [service_id],
    };
    try {
      setLoadings({ ...loadings, assignOffer: true });
      const response = await httpService.post(
        "/Addofferserviceproduct",
        postData
      );
      setLoadings({ ...loadings, assignOffer: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getServices(1, perPage);
        dispatch(setOfferModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, assignOffer: false });
    }
  };

  const addScore = async (service_id, score) => {
    let postData = {
      productId: [],
      serviceId: [service_id],
      score: score.length === 0 ? null : score,
      active: true,
    };
    try {
      setLoadings({ ...loadings, addScore: true });
      const response = await httpService.put(
        "/UpdateScoreServiceProduct",
        postData
      );
      setLoadings({ ...loadings, addScore: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getServices(1, perPage);
        dispatch(setScoreModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, addScore: false });
    }
  };

  const exports = {
    getServices,
    getSelectCategories,
    getSelectOffers,
    getOperators,
    getServiceById,
    viewServiceData,
    operatorsList,
    createServiceController,
    updateServiceController,
    deleteService,
    patchActive,
    assignOffer,
    addScore,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  };
  return exports;
};
export default useService;
