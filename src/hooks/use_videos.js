import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createVideoSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideosList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
} from "../redux/videos_slice";
import moment from "jalali-moment";

const useVideos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getVideos: false,
    createVideo: false,
    updateVideo: false,
    deleteVideo: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    Title: "",
    Description: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [viewVideoData, setViewVideoData] = useState(null);

  const currentPage = useSelector((state) => state.videos.currentPage);
  const perPage = useSelector((state) => state.videos.perPage);

  const getVideos = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage?.id,
      Title: "",
      Description: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
    };
    if (filters?.Title?.length > 0 && !without_filter) {
      paramsData.Title = filters.Title;
    }
    if (filters?.Description?.length > 0 && !without_filter) {
      paramsData.Description = filters.Description;
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
      setLoadings({ ...loadings, getVideos: true });
      const response = await httpService.get("/GetVideo", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getVideos: false });
      if (response.data.data) {
        response.data.data.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        dispatch(setVideosList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getVideos: false });
    }
  };

  const getVideoById = async (video_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get("/GetVideo", {
        params: {
          Id: video_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewVideoData(response.data.data[0]);
      } else {
        navigate("/videos/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/videos/all");
      setGetByIdLoading(false);
    }
  };

  const createVideoController = useFormik({
    initialValues: {
      title: "",
      link: "",
      description: "",
    },
    validationSchema: createVideoSchema,
    onSubmit: (values) => {
      createVideo(values);
    },
  });

  const createVideo = async (values) => {
    try {
      setLoadings({ ...loadings, createVideo: true });
      const response = await httpService.post("/AddVideo", values);
      setLoadings({ ...loadings, createVideo: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/videos/all");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createVideo: false });
    }
  };

  const updateVideoController = useFormik({
    initialValues: {
      id: "",
      title: "",
      link: "",
      description: "",
    },
    validationSchema: createVideoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateVideo(values);
    },
  });

  const updateVideo = async (values) => {
    let postData = {
      id: values.id,
      title: values.title,
      link: values.link,
      description: values.description,
    };
    try {
      setLoadings({ ...loadings, updateVideo: true });
      const response = await httpService.put(
        `/UpdateVideo/${values.slider_id}`,
        postData
      );
      setLoadings({ ...loadings, updateVideo: false });
      if (response.status === 200) {
        navigate("/videos/all");
        toast.success(response.data.metaData.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateVideo: false });
    }
  };

  const deleteVideo = async (video_id) => {
    try {
      setLoadings({ ...loadings, deleteVideo: true });
      const response = await httpService.delete(`/DeleteVideo`, {
        params: {
          id: video_id,
        },
      });
      setLoadings({ ...loadings, deleteVideo: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getVideos(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteVideo: false });
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

  const exports = {
    getVideos,
    deleteVideo,
    getVideoById,
    createVideoController,
    updateVideoController,
    viewVideoData,
    loadings,
    getByIdLoading,
    filters,
    setFilters,
  };
  return exports;
};
export default useVideos;
