import { useState } from "react";
import useHttp from "./use_http";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  createSimcardNumberSchema,
  updateSimcardNumberSchema,
  simpleSearchSchema,
} from "../utility/schemas/index";
import { useDispatch, useSelector } from "react-redux";
import {
  setSimcardNumberList,
  setCurrentPage,
  setTotalPage,
  setDeleteModal,
  setPatchLoading,
} from "../redux/simcard_number_slice";
import moment from "jalali-moment";

const useSimcardNumber = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getSimcardNumbers: false,
    createSimcardNumber: false,
    updateSimcardNumber: false,
    deleteSimcardNumber: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getOperatorsLoading, setGeOperatorsLoading] = useState(false);
  const [getNumberTypesLoading, setGeNumberTypesLoading] = useState(false);
  const [getNumberLabelsLoading, setGeNumberLabelsLoading] = useState(false);

  const [filters, setFilters] = useState({
    Number: "",
    ShowLabelNumber: "",
    Serial: "",
    OperatorId: null,
    TypeNumberId: null,
    LabelNumberId: null,
    PlanId: null,
    Price: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    Active: true,
  });

  const [operatorsList, setOperatorsList] = useState([]);
  const [numberTypesList, setNumberTypesList] = useState([]);
  const [numberLabelsList, setNumberLabelsList] = useState([]);

  const [viewSimcardNumberData, setViewSimcardNumberData] = useState(null);

  const currentPage = useSelector((state) => state.simcardNumber.currentPage);
  const perPage = useSelector((state) => state.simcardNumber.perPage);
  const perPageSearch = useSelector(
    (state) => state.simcardNumber.perPageSearch
  );

  const getSimcardNumbers = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Number: "",
      ShowLabelNumber: "",
      Serial: "",
      OperatorId: null,
      TypeNumberId: null,
      LabelNumberId: null,
      PlanId: null,
      Price: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      Active: "",
    };
    if (filters.Number.length > 0 && !without_filter) {
      paramsData.Number = filters.Number;
    }
    if (filters.ShowLabelNumber.length > 0 && !without_filter) {
      paramsData.ShowLabelNumber = filters.ShowLabelNumber;
    }
    if (filters.Serial.length > 0 && !without_filter) {
      paramsData.Serial = filters.Serial;
    }
    if (filters.OperatorId && !without_filter) {
      paramsData.OperatorId = filters.OperatorId.value;
    }
    if (filters.TypeNumberId && !without_filter) {
      paramsData.TypeNumberId = filters.TypeNumberId.value;
    }
    if (filters.LabelNumberId && !without_filter) {
      paramsData.LabelNumberId = filters.LabelNumberId.value;
    }
    if (filters.PlanId && !without_filter) {
      paramsData.PlanId = filters.PlanId.value;
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
      paramsData.Active = filters.Active;
    }
    try {
      setLoadings({ ...loadings, getSimcardNumbers: true });
      const response = await httpService.get("/SimCardBySerialGetAll", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getSimcardNumbers: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setSimcardNumberList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getSimcardNumbers: false });
    }
  };

  const getSimcardNumberById = async (simcard_number_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/SimCardBySerialGetAll`, {
        params: {
          Id: simcard_number_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewSimcardNumberData(response.data.data[0]);
      } else {
        navigate("/simcard/with_number/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/simcard/with_number/all");
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

  const getNumberTypes = async () => {
    let array = [];
    try {
      setGeNumberTypesLoading(true);
      const response = await httpService.get("/GetAllTypeNumber");
      setGeNumberTypesLoading(false);
      if (response.status === 200) {
        response.data.typeNumber?.map((item) => {
          array.push({
            label: item.name,
            value: item.id,
          });
        });
        setNumberTypesList(array);
      }
    } catch ({ err, response }) {
      setGeNumberTypesLoading(false);
    }
  };

  const getNumberLabels = async () => {
    let array = [];
    try {
      setGeNumberLabelsLoading(true);
      const response = await httpService.get("/GetLabelNumber");
      setGeNumberLabelsLoading(false);
      response.data.map((item) => {
        array.push({
          label: item.name,
          value: item.id,
        });
      });
      setNumberLabelsList(array);
    } catch ({ err, response }) {
      setGeNumberLabelsLoading(false);
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
      return {
        options: array,
        hasMore: response.data.totalPages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch ({ err, response }) {}
  };

  const getSelectPlans = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetAllPlane`, {
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

  const createSimcardNumberController = useFormik({
    initialValues: {
      operatorId: null,
      typeId: null,
      labelNumberId: null,
      planId: null,
      price: "",
      number: [],
      active: true,
    },
    validationSchema: createSimcardNumberSchema,
    onSubmit: (values) => {
      if (values.number.length === 0) {
        toast.error("حداقل یک شماره باید وارد کنید.");
      } else {
        createSimcardNumber(values);
      }
    },
  });

  const createSimcardNumber = async (values) => {
    let postData = {
      operatorId: values.operatorId.value,
      number: values.number,
      labelNumberId: values.labelNumberId.value,
      price: parseFloat(values.price),
      active: values.active,
      planId: values.planId.value,
      typeId: values.typeId.value,
    };
    try {
      setLoadings({ ...loadings, createSimcardNumber: true });
      const response = await httpService.post("/AddimCardBySerial", postData);
      setLoadings({ ...loadings, createSimcardNumber: false });
      if (response.status === 200) {
        toast.success("با موفقیت ثبت شد.");
        navigate("/simcard/with_number/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createSimcardNumber: false });
    }
  };

  const updateSimcardNumberControllers = useFormik({
    initialValues: {
      id: "",
      number: "",
      serial: "",
      showLabelNumber: "",
      operatorId: null,
      typeId: null,
      labelNumberId: null,
      planId: null,
      price: "",
      active: true,
    },
    validationSchema: updateSimcardNumberSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateSimcardNumber(values);
    },
  });

  const updateSimcardNumber = async (values) => {
    let postData = {
      id: values.id,
      number: values.number,
      serial: values.serial,
      showLabelNumber: values.showLabelNumber,
      operatorId: values.operatorId.value,
      labelNumberId: values.labelNumberId.value,
      price: parseFloat(values.price),
      active: values.active,
      planId: values.planId.value,
      typeId: values.typeId.value,
    };
    try {
      setLoadings({ ...loadings, updateSimcardNumber: true });
      const response = await httpService.put("/UpdateimCardBySerial", postData);
      setLoadings({ ...loadings, updateSimcardNumber: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/simcard/with_number/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateSimcardNumber: false });
    }
  };

  const deleteSimcardNumber = async (simcard_number_id) => {
    try {
      setLoadings({ ...loadings, deleteSimcardNumber: true });
      const response = await httpService.delete("/DeleteimCardBySerial", {
        params: {
          id: simcard_number_id,
        },
      });
      setLoadings({ ...loadings, deleteSimcardNumber: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getSimcardNumbers(1, perPage);
        dispatch(setDeleteModal(null));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteSimcardNumber: false });
    }
  };

  const patchActive = async (simcardNumber) => {
    let postData = {
      id: simcardNumber.id,
      number: simcardNumber.number,
      serial: simcardNumber.serial,
      showLabelNumber: simcardNumber.showLabelNumber,
      operatorId: simcardNumber.operatorId,
      labelNumberId: simcardNumber.labelNumberId,
      price: parseFloat(simcardNumber.price),
      active: !simcardNumber.active,
      planId: simcardNumber.planId,
      typeId: simcardNumber.typeNumberId,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put("/UpdateimCardBySerial", postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        toast.success("با موفقیت بروزرسانی شد");
        getSimcardNumbers(currentPage, perPage, "without_filter");
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getSimcardNumbers,
    getSimcardNumberById,
    getOperators,
    getNumberLabels,
    getSelectCategories,
    createSimcardNumberController,
    updateSimcardNumberControllers,
    deleteSimcardNumber,
    patchActive,
    viewSimcardNumberData,
    operatorsList,
    numberLabelsList,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
    getNumberLabelsLoading,
    filters,
    setFilters,
    getNumberTypes,
    numberTypesList,
    getNumberTypesLoading,
    getSelectPlans,
  };
  return exports;
};
export default useSimcardNumber;
