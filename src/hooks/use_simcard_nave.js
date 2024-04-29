import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import {
  createSimcardNaveSchema,
  createMultiSimcardNaveSchema,
} from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSimcardNaveList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setAssignModal,
} from "../redux/simcard_nave_slice";
import moment from "jalali-moment";
import formatHelper from "../helper/format_helper";

const useSimcardNave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getSimcardNaves: false,
    createSimcardNave: false,
    updateSimcardNave: false,
    deleteSimcardNave: false,
    assignSourceNumber: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getOperatorsLoading, setGetOperatorsLoading] = useState(false);

  const [filters, setFilters] = useState({
    OperatorId: null,
    Serial: "",
    Price: "",
    Status: null,
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [viewSimcardNaveData, setViewSimcardNaveData] = useState(null);
  const [operatorsList, setOperatorsList] = useState([]);

  const selectedEntity = useSelector(
    (state) => state.simcardNave.selectedEntity
  );
  const perPage = useSelector((state) => state.simcardNave.perPage);

  const getSimcardNaves = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      OperatorId: "",
      Serial: "",
      Price: "",
      Status: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
    };
    if (filters.OperatorId && !without_filter) {
      paramsData.OperatorId = filters.OperatorId.value;
    }
    if (filters.Serial.length > 0 && !without_filter) {
      paramsData.Serial = formatHelper.toEnglishString(filters.Serial);
    }
    if (filters.Price.length > 0 && !without_filter) {
      paramsData.Price = filters.Price;
    }
    if (filters.Status && !without_filter) {
      paramsData.Status = filters.Status.value;
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
      setLoadings({ ...loadings, getSimcardNaves: true });
      const response = await httpService.get("/GetSimCardNave", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getSimcardNaves: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setSimcardNaveList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getSimcardNaves: false });
    }
  };

  const getSimcardNaveById = async (simcard_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetSimCardNave`, {
        params: {
          Id: simcard_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewSimcardNaveData(response.data.data[0]);
      } else {
        navigate("/simcard/nave/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/simcard/nave/all");
      setGetByIdLoading(false);
    }
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

  const getSelectSourceNumber = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetSourceNumbers`, {
        params: {
          PageNumber: page,
          PageSize: 25,
          OperatorId: selectedEntity?.operatorId,
        },
      });
      if (response.data.data) {
        response.data.data.map((item) => {
          array.push({
            label: formatHelper.toPersianString(
              `${item.number} (${item.labelShowNumber})`
            ),
            value: item.id,
          });
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

  const createSimcardNaveController = useFormik({
    initialValues: {
      operatorId: null,
      serial: "",
      price: "",
    },
    validationSchema: createSimcardNaveSchema,
    onSubmit: (values) => {
      createSimcardNave(values);
    },
  });

  const createSimcardNave = async (values) => {
    let postData = {
      operatorId: values.operatorId.value,
      serial: [formatHelper.toEnglishString(values.serial)],
      price: values.price,
    };
    try {
      setLoadings({ ...loadings, createSimcardNave: true });
      const response = await httpService.post("/AddSimCardNave", postData);
      setLoadings({ ...loadings, createSimcardNave: false });
      if (response.status === 200) {
        navigate("/simcard/nave/all");
        toast.success("با موفقیت ثبت شد.");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createSimcardNave: false });
    }
  };

  const createMultiSimcardNaveController = useFormik({
    initialValues: {
      operatorId: null,
      serial: [],
      price: "",
      startNumberSerial: "",
      endNumberSerial: "",
    },
    validationSchema: createMultiSimcardNaveSchema,
    onSubmit: (values) => {
      createMultiSimcardNave(values);
    },
  });

  const createMultiSimcardNave = async (values) => {
    let postData = {
      operatorId: values.operatorId.value,
      serial: [],
      price: values.price,
      startNumberSerial: formatHelper.toEnglishString(values.startNumberSerial),
      endNumberSerial: formatHelper.toEnglishString(values.endNumberSerial),
    };
    try {
      setLoadings({ ...loadings, createSimcardNave: true });
      const response = await httpService.post(
        "/AddByGetFirstAndEndNumber",
        postData
      );
      setLoadings({ ...loadings, createSimcardNave: false });
      if (response.status === 200) {
        navigate("/simcard/nave/all");
        toast.success("با موفقیت ثبت شد.");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createSimcardNave: false });
    }
  };

  const updateSimcardNaveController = useFormik({
    initialValues: {
      id: "",
      operatorId: null,
      serial: "",
      price: "",
    },
    validationSchema: createSimcardNaveSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateSimcardNave(values);
    },
  });

  const updateSimcardNave = async (values) => {
    let postData = {
      id: values.id,
      operatorId: values.operatorId.value,
      serial: formatHelper.toEnglishString(values.serial),
      price: values.price,
    };
    try {
      setLoadings({ ...loadings, updateSimcardNave: true });
      const response = await httpService.put("/UpdateSimCardNave", postData);
      setLoadings({ ...loadings, updateSimcardNave: false });
      if (response.status === 200) {
        navigate("/simcard/nave/all");
        toast.success("با موفقیت ویرایش شد.");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateSimcardNave: false });
    }
  };

  const deleteSimcardNave = async (simcard_id) => {
    try {
      setLoadings({ ...loadings, deleteSimcardNave: true });
      const response = await httpService.delete(`/DeleteSimCardNave`, {
        params: {
          id: simcard_id,
        },
      });
      setLoadings({ ...loadings, deleteSimcardNave: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getSimcardNaves(1, perPage);
        dispatch(setDeleteModal(null));
        toast.success("با موفقیت حذف شد");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteSimcardNave: false });
    }
  };

  const assignSourceNumber = async (naveId, sourceNumberId) => {
    let postData = {
      naveId: naveId,
      sourceNumberId: sourceNumberId,
    };
    try {
      setLoadings({ ...loadings, assignSourceNumber: true });
      const response = await httpService.put(
        "/SetSourceNumber",
        {},
        { params: postData }
      );
      setLoadings({ ...loadings, assignSourceNumber: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getSimcardNaves(1, perPage);
        dispatch(setAssignModal(null));
        toast.success("با موفقیت حذف شد");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, assignSourceNumber: false });
    }
  };

  const exports = {
    getSimcardNaves,
    getSimcardNaveById,
    createSimcardNaveController,
    createMultiSimcardNaveController,
    updateSimcardNaveController,
    deleteSimcardNave,
    assignSourceNumber,
    getOperators,
    getSelectSourceNumber,
    viewSimcardNaveData,
    operatorsList,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  };
  return exports;
};
export default useSimcardNave;
