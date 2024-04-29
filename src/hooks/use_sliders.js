import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createSliderSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSlidersList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
} from "../redux/sliders_slice";
import moment from "jalali-moment";

const useSliders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getSliders: false,
    createSlider: false,
    updateSlider: false,
    deleteSlider: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    Name: "",
    Link: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    Active: true,
  });

  const [viewSliderData, setViewSliderData] = useState(null);

  const currentPage = useSelector((state) => state.sliders.currentPage);
  const perPage = useSelector((state) => state.sliders.perPage);

  const getSliders = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage?.id,
      Name: "",
      Link: "",
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
    if (filters?.Link?.length > 0 && !without_filter) {
      paramsData.Link = filters.Link;
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
      setLoadings({ ...loadings, getSliders: true });
      const response = await httpService.get("/GetSlider", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getSliders: false });
      if (response.data.data) {
        response.data.data.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        dispatch(setSlidersList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getSliders: false });
    }
  };

  const getSliderById = async (slider_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get("/GetSlider", {
        params: {
          Id: slider_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewSliderData(response.data.data[0]);
      } else {
        navigate("/sliders/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/sliders/all");
      setGetByIdLoading(false);
    }
  };

  const createSliderController = useFormik({
    initialValues: {
      name: "",
      image: "",
      mobileImage: "",
      link: "",
      active: true,
    },
    validationSchema: createSliderSchema,
    onSubmit: (values) => {
      createSlider(values);
    },
  });

  const createSlider = async (values) => {
    try {
      setLoadings({ ...loadings, createSlider: true });
      const response = await httpService.post("/AddSlider", values);
      setLoadings({ ...loadings, createSlider: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/sliders/all");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createSlider: false });
    }
  };

  const updateSliderController = useFormik({
    initialValues: {
      name: "",
      image: "",
      mobileImage: "",
      link: "",
      active: true,
    },
    validationSchema: createSliderSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateSlider(values);
    },
  });

  const updateSlider = async (values) => {
    let postData = {
      name: values.name,
      image: values.image,
      mobileImage: values.mobileImage,
      link: values.link,
      active: values.active,
    };
    try {
      setLoadings({ ...loadings, updateSlider: true });
      const response = await httpService.put(
        `/UpdateSlider/${values.slider_id}`,
        postData
      );
      setLoadings({ ...loadings, updateSlider: false });
      if (response.status === 200) {
        navigate("/sliders/all");
        toast.success(response.data.metaData.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateSlider: false });
    }
  };

  const deleteSlider = async (slider_id) => {
    try {
      setLoadings({ ...loadings, deleteSlider: true });
      const response = await httpService.delete(`/DeleteSlider/${slider_id}`);
      setLoadings({ ...loadings, deleteSlider: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getSliders(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteSlider: false });
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

  const patchActive = async (slider) => {
    let postData = {
      name: slider.name,
      link: slider.link,
      active: !slider.active,
    };
    if (slider.image) {
      imageUrlToBase64(process.env.REACT_APP_BASE_URL + slider.image).then(
        (item) => {
          postData["image"] = item;
        }
      );
    }
    if (slider.mobileImage) {
      imageUrlToBase64(
        process.env.REACT_APP_BASE_URL + slider.mobileImage
      ).then((item) => {
        postData["mobileImage"] = item;
      });
    }
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(
        `/UpdateSlider/${slider.id}`,
        postData
      );
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getSliders(currentPage, perPage, "without_filter");
        toast.success(response.data.metaData.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getSliders,
    deleteSlider,
    getSliderById,
    createSliderController,
    updateSliderController,
    patchActive,
    viewSliderData,
    loadings,
    getByIdLoading,
    filters,
    setFilters,
  };
  return exports;
};
export default useSliders;
