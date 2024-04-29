import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createCategorySchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
} from "../redux/category_slice";
import moment from "jalali-moment";

const useCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getCategories: false,
    createCategory: false,
    updateCategory: false,
    deleteCategory: false,
    patchActive: false,
    downloadExcel: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    Name: "",
    ParentId: null,
    ParentName: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    Active: true,
  });

  const [viewCategoryData, setViewCategoryData] = useState(null);

  const currentPage = useSelector((state) => state.category.currentPage);
  const perPage = useSelector((state) => state.category.perPage);

  const getCategories = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Name: "",
      ParentId: "",
      ParentName: "",
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
    if (filters?.ParentId && !without_filter) {
      paramsData.ParentId = filters.ParentId.value;
    }
    if (filters?.ParentName?.length > 0 && !without_filter) {
      paramsData.ParentName = filters.ParentName;
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
      setLoadings({ ...loadings, getCategories: true });
      const response = await httpService.get("/GetCategory", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getCategories: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setCategoryList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getCategories: false });
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

  const getCategoryById = async (category_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetCategory`, {
        params: {
          Id: category_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewCategoryData(response.data.data[0]);
      } else {
        navigate("/category/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/category/all");
      setGetByIdLoading(false);
    }
  };

  const createCategoryController = useFormik({
    initialValues: {
      name: "",
      images: "",
      parentId: null,
      active: true,
    },
    validationSchema: createCategorySchema,
    onSubmit: (values) => {
      createCategory(values);
    },
  });

  const createCategory = async (values) => {
    let postData = { ...values };
    if (postData.parentId) {
      postData.parentId = postData.parentId.value;
    }
    try {
      setLoadings({ ...loadings, createCategory: true });
      const response = await httpService.post("/AddCategory", postData);
      setLoadings({ ...loadings, createCategory: false });
      if (response.status === 200) {
        navigate("/category/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createCategory: false });
    }
  };

  const updateCategoryController = useFormik({
    initialValues: {
      name: "",
      images: "",
      parentId: null,
      active: true,
    },
    enableReinitialize: true,
    validationSchema: createCategorySchema,
    onSubmit: (values) => {
      updateCategory(values);
    },
  });

  const updateCategory = async (values) => {
    let postData = {
      name: values.name,
      parentId: "",
      active: values.active,
    };
    if (values?.parentId) {
      postData.parentId = values.parentId.value;
    }
    if (values?.images?.length > 0) {
      postData["images"] = values.images;
    }
    try {
      setLoadings({ ...loadings, updateCategory: true });
      const response = await httpService.put(
        `/UpdateCategory/${values.category_id}`,
        postData
      );
      setLoadings({ ...loadings, updateCategory: false });
      if (response.status === 200) {
        navigate("/category/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateCategory: false });
    }
  };

  const deleteCategory = async (category_id) => {
    try {
      setLoadings({ ...loadings, deleteCategory: true });
      const response = await httpService.delete(
        `/DeleteCategory/${category_id}`
      );
      setLoadings({ ...loadings, deleteCategory: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getCategories(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteCategory: false });
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

  const patchActive = async (category) => {
    let postData = {
      name: category.name,
      parentId: category.parentId,
      active: !category.active,
    };
    if (category.images) {
      imageUrlToBase64(process.env.REACT_APP_BASE_URL + category.images).then(
        (item) => {
          postData["images"] = item;
        }
      );
    }
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(
        `/UpdateCategory/${category.id}`,
        postData
      );
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getCategories(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const downloadExcel = async (currentPage, perPage, isAll) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Name: "",
      ParentId: "",
      ParentName: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      Active: "",
    };
    if (filters?.Name?.length > 0 && !isAll) {
      paramsData.Name = filters.Name;
    }
    if (filters?.ParentId && !isAll) {
      paramsData.ParentId = filters.ParentId.value;
    }
    if (filters?.ParentName?.length > 0 && !isAll) {
      paramsData.ParentName = filters.ParentName;
    }
    if (filters?.CreateDate?.from && !isAll) {
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
    if (filters?.CreateDate?.to && !isAll) {
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
    if (filters?.UserName?.length > 0 && !isAll) {
      paramsData.UserName = filters.UserName;
    }
    if (filters?.UpdateDate?.from && !isAll) {
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
    if (filters?.UpdateDate?.to && !isAll) {
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
    if (filters?.UserNameUpdate?.length > 0 && !isAll) {
      paramsData.UserNameUpdate = filters.UserNameUpdate;
    }
    if (!isAll) {
      paramsData.Active = filters.Active;
    }
    try {
      setLoadings({ ...loadings, downloadExcel: true });
      const response = await httpService.get("/GetCategoryExcel", {
        params: paramsData,
      });
      setLoadings({ ...loadings, downloadExcel: false });
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `category_report_${Date.now()}.xlsx`); //or any other extension

        document.body.appendChild(link);
        link.click();
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, downloadExcel: false });
    }
  };

  const exports = {
    getCategories,
    getSelectCategories,
    getCategoryById,
    viewCategoryData,
    createCategoryController,
    updateCategoryController,
    deleteCategory,
    patchActive,
    loadings,
    getByIdLoading,
    filters,
    setFilters,
    downloadExcel,
  };
  return exports;
};
export default useCategory;
