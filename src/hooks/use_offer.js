import { useState } from "react";
import useHttp from "./use_http";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createOfferSchema, assignOfferSchema } from "../utility/schemas/index";
import moment from "jalali-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setOfferList,
  setCurrentPage,
  setTotalPage,
  setDeleteModal,
} from "../redux/offer_slice";

const useOffer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getOffers: false,
    createOffer: false,
    updateOffer: false,
    deleteOffer: false,
    assignOffer: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getOperatorsLoading, setGeOperatorsLoading] = useState(false);

  const [filters, setFilters] = useState({
    OfferName: "",
    OfferCode: "",
    Price: "",
    Percent: "",
    StartDate: null,
    EndDate: null,
    OperatorId: null,
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [operatorsList, setOperatorsList] = useState([]);
  const [viewOfferData, setViewOfferData] = useState(null);

  const perPage = useSelector((state) => state.offer.perPage);

  const getOffers = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      OfferName: "",
      OfferCode: "",
      Price: "",
      Percent: "",
      StartDate: "",
      EndDate: "",
      OperatorId: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
    };
    if (filters?.OfferName?.length > 0 && !without_filter) {
      paramsData.OfferName = filters.OfferName;
    }
    if (filters?.OfferCode?.length > 0 && !without_filter) {
      paramsData.OfferCode = filters.OfferCode;
    }
    if (filters?.Price?.length > 0 && !without_filter) {
      paramsData.Price = filters.Price;
    }
    if (filters?.Percent?.length > 0 && !without_filter) {
      paramsData.Percent = filters.Percent;
    }
    if (filters?.OperatorId && !without_filter) {
      paramsData.OperatorId = filters.OperatorId.value;
    }
    if (filters?.StartDate && !without_filter) {
      paramsData.StartDate = moment
        .from(
          filters?.StartDate?.year +
            "-" +
            filters?.StartDate?.month +
            "-" +
            filters?.StartDate?.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (filters?.EndDate && !without_filter) {
      paramsData.EndDate = moment
        .from(
          filters?.EndDate?.year +
            "-" +
            filters?.EndDate?.month +
            "-" +
            filters?.EndDate?.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
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
      setLoadings({ ...loadings, getOffers: true });
      const response = await httpService.get("/GetAllOffer", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getOffers: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setOfferList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getOffers: false });
    }
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

  const getSelectProduct = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetProductOprators`, {
        params: {
          PageNumber: page,
          OperatorId: assignOfferController.values.OperatorId.value,
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
          OperatorId: assignOfferController.values.OperatorId.value,
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

  const getOfferById = async (offer_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetAllOffer`, {
        params: {
          Id: offer_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewOfferData(response.data.data[0]);
      } else {
        navigate("/offer/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/offer/all");
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

  const createOfferController = useFormik({
    initialValues: {
      offerName: "",
      offerCode: "",
      type: 0,
      offerValue: "",
      operatorId: null,
      startDate: null,
      endDate: null,
    },
    validationSchema: createOfferSchema,
    onSubmit: (values) => {
      createOffer(values);
    },
  });

  const createOffer = async (values) => {
    let postData = {
      offerName: values.offerName,
      offerCode: values.offerCode,
      price: 0,
      percent: 0,
      operatorId: null,
      startDate: null,
      endDate: null,
    };
    if (values.operatorId) {
      postData.operatorId = values.operatorId.value;
    }
    if (values?.startDate) {
      postData.startDate = moment
        .from(
          values?.startDate?.year +
            "-" +
            values?.startDate?.month +
            "-" +
            values?.startDate?.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (values?.endDate) {
      postData.endDate = moment
        .from(
          values?.endDate?.year +
            "-" +
            values?.endDate?.month +
            "-" +
            values?.endDate?.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (values.type === 0) {
      postData.price = parseFloat(values.offerValue);
    } else {
      postData.percent = parseFloat(values.offerValue);
    }
    try {
      setLoadings({ ...loadings, createOffer: true });
      const response = await httpService.post("/AddOffer", postData);
      setLoadings({ ...loadings, createOffer: false });
      if (response.status === 200) {
        navigate("/offer/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createOffer: false });
    }
  };

  const updateOfferController = useFormik({
    initialValues: {
      offer_id: "",
      offerName: "",
      offerCode: "",
      type: 0,
      offerValue: "",
      operatorId: null,
      startDate: null,
      endDate: null,
    },
    validationSchema: createOfferSchema,
    onSubmit: (values) => {
      updateOffer(values);
    },
  });

  const updateOffer = async (values) => {
    let postData = {
      id: parseFloat(values.offer_id),
      offerName: values.offerName,
      offerCode: values.offerCode,
      price: "",
      percent: "",
      operatorId: null,
      startDate: null,
      endDate: null,
    };
    if (values.operatorId) {
      postData.operatorId = values.operatorId.value;
    }
    if (values?.startDate) {
      postData.startDate = moment
        .from(
          values?.startDate?.year +
            "-" +
            values?.startDate?.month +
            "-" +
            values?.startDate?.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (values?.endDate) {
      postData.endDate = moment
        .from(
          values?.endDate?.year +
            "-" +
            values?.endDate?.month +
            "-" +
            values?.endDate?.day,
          "fa",
          "YYYY-MM-DD"
        )
        .locale("en")
        .format("YYYY-MM-DD");
    }
    if (values.type === 0) {
      postData.price = parseFloat(values.offerValue);
    } else {
      postData.percent = parseFloat(values.offerValue);
    }
    try {
      setLoadings({ ...loadings, updateOffer: true });
      const response = await httpService.put("/UpdateOffer", postData);
      setLoadings({ ...loadings, updateOffer: false });
      if (response.status === 200) {
        navigate("/offer/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateOffer: false });
    }
  };

  const deleteOffer = async (offer_id) => {
    try {
      setLoadings({ ...loadings, deleteOffer: true });
      const response = await httpService.delete("/DeleteOffer", {
        params: {
          id: offer_id,
        },
      });
      setLoadings({ ...loadings, deleteOffer: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getOffers(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteOffer: false });
    }
  };

  const assignOfferController = useFormik({
    initialValues: {
      offerId: null,
      OperatorId: null,
      productId: [],
      serviceId: [],
    },
    validationSchema: assignOfferSchema,
    onSubmit: (values) => {
      if (values.productId.length === 0 && values.serviceId.length === 0) {
        toast.error("حداقل یک محصول یا خدمت انتخاب کنید");
      } else {
        assignOffer(values);
      }
    },
  });

  const assignOffer = async (values) => {
    let postData = {
      offerId: values.offerId.value,
      productId: [],
      serviceId: [],
    };
    values.productId.map((item) => {
      postData.productId.push(item.value);
    });
    values.serviceId.map((item) => {
      postData.serviceId.push(item.value);
    });
    try {
      setLoadings({ ...loadings, assignOffer: true });
      const response = await httpService.post(
        "/Addofferserviceproduct",
        postData
      );
      setLoadings({ ...loadings, assignOffer: false });
      if (response.status === 200) {
        assignOfferController.resetForm();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, assignOffer: false });
    }
  };

  const exports = {
    getOffers,
    getSelectOffers,
    getOfferById,
    getOperators,
    getSelectProduct,
    getSelectService,
    createOfferController,
    updateOfferController,
    deleteOffer,
    assignOfferController,
    operatorsList,
    viewOfferData,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  };
  return exports;
};

export default useOffer;
