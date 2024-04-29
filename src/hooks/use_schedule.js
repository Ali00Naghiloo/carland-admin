import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createScheduleSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
  setScheduleList,
} from "../redux/schedule_slice";
import moment from "jalali-moment";

const useSchedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getSchedules: false,
    createSchedule: false,
    updateSchedule: false,
    deleteSchedule: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    Monthnumber: null,
    SatrtTime: null,
    EndTime: null,
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    IsActive: true,
  });

  const [viewScheduleData, setViewScheduleData] = useState(null);

  const currentPage = useSelector((state) => state.schedule.currentPage);
  const perPage = useSelector((state) => state.schedule.perPage);

  const getSchedules = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Monthnumber: "",
      SatrtTime: "",
      EndTime: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      IsActive: "",
    };
    if (filters.Monthnumber && !without_filter) {
      paramsData.Monthnumber = filters.Monthnumber.value;
    }
    if (filters.SatrtTime && !without_filter) {
      paramsData.SatrtTime = filters.SatrtTime.value;
    }
    if (filters.EndTime && !without_filter) {
      paramsData.EndTime = filters.EndTime.value;
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
      setLoadings({ ...loadings, getSchedules: true });
      const response = await httpService.get("/GetReserviation", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getSchedules: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setScheduleList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getSchedules: false });
    }
  };

  const getScheduleById = async (schedule_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetReserviation`, {
        params: {
          Id: schedule_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewScheduleData(response.data.data[0]);
      } else {
        navigate("/schedule/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/schedule/all");
      setGetByIdLoading(false);
    }
  };

  const createScheduleController = useFormik({
    initialValues: {
      monthnumber: null,
      satrtTime: null,
      endTime: null,
      description: "",
      isActive: true,
    },
    validationSchema: createScheduleSchema,
    onSubmit: (values) => {
      createSchedule(values);
    },
  });

  const createSchedule = async (values) => {
    let postData = {
      satrtTime: null,
      endTime: null,
      description: values.description,
      monthnumber: null,
      isActive: values.isActive,
    };
    if (values.satrtTime) {
      postData.satrtTime = values?.satrtTime?.value;
    }
    if (values.endTime) {
      postData.endTime = values?.endTime?.value;
    }
    if (values.monthnumber) {
      postData.monthnumber = values?.monthnumber?.value;
    }
    try {
      setLoadings({ ...loadings, createSchedule: true });
      const response = await httpService.post("/AddReservation", postData);
      setLoadings({ ...loadings, createSchedule: false });
      if (response.status === 200) {
        navigate("/schedule/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createSchedule: false });
    }
  };

  const updateScheduleController = useFormik({
    initialValues: {
      id: "",
      satrtTime: "",
      endTime: "",
      description: "",
      monthnumber: null,
      isActive: true,
    },
    enableReinitialize: true,
    validationSchema: createScheduleSchema,
    onSubmit: (values) => {
      updateService(values);
    },
  });

  const updateService = async (values) => {
    let postData = {
      id: values.id,
      satrtTime: null,
      endTime: null,
      description: values.description,
      monthnumber: null,
      isActive: values.isActive,
    };
    if (values.satrtTime) {
      postData.satrtTime = values?.satrtTime?.value;
    }
    if (values.endTime) {
      postData.endTime = values?.endTime?.value;
    }
    if (values.monthnumber) {
      postData.monthnumber = values?.monthnumber?.value;
    }
    try {
      setLoadings({ ...loadings, updateSchedule: true });
      const response = await httpService.put("/EditReservation", postData);
      setLoadings({ ...loadings, updateSchedule: false });
      if (response.status === 200) {
        navigate("/schedule/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateSchedule: false });
    }
  };

  const deleteSchedule = async (schedule_id) => {
    try {
      setLoadings({ ...loadings, deleteSchedule: true });
      const response = await httpService.delete(`/DeleteReservation`, {
        params: {
          id: schedule_id,
        },
      });
      setLoadings({ ...loadings, deleteSchedule: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getSchedules(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteSchedule: false });
    }
  };

  const patchActive = async (schedule) => {
    let postData = {
      id: schedule.id,
      satrtTime: schedule.satrtTime,
      endTime: schedule.endTime,
      description: schedule.description,
      monthnumber: schedule.monthnumber,
      isActive: !schedule.isActive,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put("/EditReservation", postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getSchedules(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getSchedules,
    getScheduleById,
    viewScheduleData,
    createScheduleController,
    updateScheduleController,
    deleteSchedule,
    patchActive,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
  };
  return exports;
};
export default useSchedule;
