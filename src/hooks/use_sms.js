import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { updateSmsSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSmsList, setTotalPage, setPatchLoading } from "../redux/sms_slice";
import moment from "jalali-moment";

const useSms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getSmsList: false,
    updateSms: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [viewSmsData, setViewSmsData] = useState(null);

  const currentPage = useSelector((state) => state.sms.currentPage);
  const perPage = useSelector((state) => state.sms.perPage);

  const getSmsList = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage?.id,
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
    };
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
      setLoadings({ ...loadings, getSmsList: true });
      const response = await httpService.get("/GetSms", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getSmsList: false });
      if (response.data.data) {
        response.data.data.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        dispatch(setSmsList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getSmsList: false });
    }
  };

  const getSmsById = async (sms_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get("/GetSms", {
        params: {
          Id: sms_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewSmsData(response.data.data[0]);
      } else {
        navigate("/sms/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/sms/all");
      setGetByIdLoading(false);
    }
  };

  const updateSmsController = useFormik({
    initialValues: {
      id: "",
      title: "",
      contextBody: "",
      isActive: true,
    },
    validationSchema: updateSmsSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateSms(values);
    },
  });

  const updateSms = async (values) => {
    let postData = {
      id: values.id,
      title: values.title,
      contextBody: values.contextBody,
      isActive: values.isActive,
    };
    try {
      setLoadings({ ...loadings, updateSms: true });
      const response = await httpService.put(`/UpdateSms`, postData);
      setLoadings({ ...loadings, updateSms: false });
      if (response.status === 200) {
        navigate("/sms/all");
        toast.success(response.data.metaData.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateSms: false });
    }
  };

  const patchActive = async (sms) => {
    let postData = {
      id: sms.id,
      title: sms.title,
      contextBody: sms.contextBody,
      isActive: !sms.isActive,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(`/UpdateSms`, postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getSmsList(currentPage, perPage, "without_filter");
        toast.success(response.data.metaData.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getSmsList,
    getSmsById,
    updateSmsController,
    patchActive,
    viewSmsData,
    loadings,
    getByIdLoading,
    filters,
    setFilters,
  };
  return exports;
};
export default useSms;
