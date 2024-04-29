import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createProductSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
  setOfferModal,
  setScoreModal,
} from "../redux/product_slice";
import moment from "jalali-moment";

const useProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getProducts: false,
    createProduct: false,
    updateProduct: false,
    deleteProduct: false,
    assignOffer: false,
    addScore: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getOperatorsLoading, setGetOperatorsLoading] = useState(false);

  const [filters, setFilters] = useState({
    Name: "",
    StockSite: "",
    StockAgent: "",
    CategoryId: null,
    OperatorId: null,
    Priceseller: "",
    PriceBuy: "",
    Brand: "",
    Serial: "",
    OfferId: null,
    Score: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    Active: true,
  });

  const [viewProductData, setViewProductData] = useState(null);
  const [operatorsList, setOperatorsList] = useState([]);

  const currentPage = useSelector((state) => state.product.currentPage);
  const perPage = useSelector((state) => state.product.perPage);

  const getProducts = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Name: "",
      StockSite: "",
      StockAgent: "",
      CategoryId: null,
      OperatorId: null,
      Priceseller: "",
      PriceBuy: "",
      Brand: "",
      Serial: "",
      OfferId: "",
      Score: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      Active: "",
    };
    if (filters?.Name?.length > 0 && !without_filter) {
      paramsData.Name = filters.Name;
    }
    if (filters?.StockSite?.length > 0 && !without_filter) {
      paramsData.StockSite = filters.StockSite;
    }
    if (filters?.StockAgent?.length > 0 && !without_filter) {
      paramsData.StockAgent = filters.StockAgent;
    }
    if (filters?.CategoryId && !without_filter) {
      paramsData.CategoryId = filters.CategoryId.value;
    }
    if (filters?.OperatorId && !without_filter) {
      paramsData.OperatorId = filters.OperatorId.value;
    }
    if (filters?.Priceseller?.length > 0 && !without_filter) {
      paramsData.Priceseller = filters.Priceseller;
    }
    if (filters?.PriceBuy?.length > 0 && !without_filter) {
      paramsData.PriceBuy = filters.PriceBuy;
    }
    if (filters?.Brand?.length > 0 && !without_filter) {
      paramsData.Brand = filters.Brand;
    }
    if (filters?.Serial?.length > 0 && !without_filter) {
      paramsData.Serial = filters.Serial;
    }
    if (filters.OfferId && !without_filter) {
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
      paramsData.Active = filters.Active;
    }
    try {
      setLoadings({ ...loadings, getProducts: true });
      const response = await httpService.get("/GetProductOprators", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getProducts: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setProductList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getProducts: false });
    }
  };

  const getProductById = async (product_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetProductOprators`, {
        params: {
          Id: product_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewProductData(response.data.data[0]);
      } else {
        navigate("/product/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/product/all");
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

  const createProductController = useFormik({
    initialValues: {
      name: "",
      image: "",
      summary: "",
      description: "",
      stockSite: "",
      stockAgent: "",
      categoryId: null,
      operatorId: null,
      review: "",
      help: "",
      coverdArea: "",
      brandName: "",
      priceseller: "",
      priceBuy: "",
      serial: "",
      active: true,
    },
    validationSchema: createProductSchema,
    onSubmit: (values) => {
      createProduct(values);
    },
  });

  const createProduct = async (values) => {
    let postData = {
      name: values.name,
      image: values.image,
      summary: values.summary,
      description: values.description,
      stockSite: values.stockSite,
      stockAgent: values.stockAgent,
      categoryId: null,
      operatorId: null,
      review: values.review,
      help: values.help,
      coverdArea: values.coverdArea,
      brandName: values.brandName,
      priceseller: values.priceseller,
      priceBuy: values.priceBuy,
      serial: values.serial,
      active: values.active,
    };
    if (values.categoryId) {
      postData.categoryId = values?.categoryId?.value;
    }
    if (values.operatorId) {
      postData.operatorId = values?.operatorId?.value;
    }
    try {
      setLoadings({ ...loadings, createProduct: true });
      const response = await httpService.post("/AddProductOprators", postData);
      setLoadings({ ...loadings, createProduct: false });
      if (response.status === 200) {
        navigate("/product/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createProduct: false });
    }
  };

  const updateProductController = useFormik({
    initialValues: {
      id: "",
      name: "",
      image: "",
      summary: "",
      description: "",
      stockSite: "",
      stockAgent: "",
      categoryId: null,
      operatorId: null,
      review: "",
      help: "",
      coverdArea: "",
      brandName: "",
      priceseller: "",
      priceBuy: "",
      serial: "",
      active: true,
    },
    enableReinitialize: true,
    validationSchema: createProductSchema,
    onSubmit: (values) => {
      updateProduct(values);
    },
  });

  const updateProduct = async (values) => {
    let postData = {
      id: values.id,
      name: values.name,
      image: values.image,
      summary: values.summary,
      description: values.description,
      stockSite: values.stockSite,
      stockAgent: values.stockAgent,
      categoryId: null,
      operatorId: null,
      review: values.review,
      help: values.help,
      coverdArea: values.coverdArea,
      brandName: values.brandName,
      priceseller: values.priceseller,
      priceBuy: values.priceBuy,
      serial: values.serial,
      active: values.active,
    };
    if (values.categoryId) {
      postData.categoryId = values.categoryId.value;
    }
    if (values.operatorId) {
      postData.operatorId = values.operatorId.value;
    }
    try {
      setLoadings({ ...loadings, updateProduct: true });
      const response = await httpService.put(
        `/UpdateProductOprators/${postData.id}`,
        postData,
        {
          params: {
            id: postData.id,
          },
        }
      );
      setLoadings({ ...loadings, updateProduct: false });
      if (response.status === 200) {
        navigate("/product/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateProduct: false });
    }
  };

  const deleteProduct = async (product_id) => {
    try {
      setLoadings({ ...loadings, deleteProduct: true });
      const response = await httpService.delete(
        `/DeleteProductOprators/${product_id}`
      );
      setLoadings({ ...loadings, deleteProduct: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getProducts(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteProduct: false });
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

  const patchActive = async (product) => {
    let postData = {
      id: product.id,
      name: product.name,
      image: product.image,
      summary: product.summary,
      description: product.description,
      stockSite: product.stockSite,
      stockAgent: product.stockAgent,
      categoryId: product.category.id,
      operatorId: product.operator.id,
      review: product.review,
      help: product.help,
      coverdArea: product.coverdArea,
      brandName: product.brandName,
      priceseller: product.priceseller,
      priceBuy: product.priceBuy,
      serial: product.serial,
      active: !product.active,
    };
    if (product.image) {
      imageUrlToBase64(process.env.REACT_APP_BASE_URL + product.image).then(
        (item) => {
          postData["image"] = item;
        }
      );
    }
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(
        `/UpdateProductOprators/${product.id}`,
        postData
      );
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getProducts(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const assignOffer = async (product_id, offer_id) => {
    let postData = {
      offerId: offer_id ? offer_id : null,
      productId: [product_id],
      serviceId: [],
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
        getProducts(1, perPage);
        dispatch(setOfferModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, assignOffer: false });
    }
  };

  const addScore = async (product_id, score) => {
    let postData = {
      productId: [product_id],
      serviceId: [],
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
        getProducts(1, perPage);
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
    getProducts,
    getSelectCategories,
    getSelectOffers,
    getOperators,
    getProductById,
    viewProductData,
    operatorsList,
    createProductController,
    updateProductController,
    deleteProduct,
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
export default useProduct;
