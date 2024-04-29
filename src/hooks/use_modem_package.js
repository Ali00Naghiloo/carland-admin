import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createModemPackageSchema } from "../utility/schemas/index";
import {
  setModemPackageList,
  setTotalPage,
  setCurrentPage,
  setDeleteModal,
  setPatchLoading,
} from "../redux/modem_package_slice";
import moment from "jalali-moment";
import { useDispatch, useSelector } from "react-redux";

const useModemPackage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getModemPackages: false,
    createModemPackage: false,
    updateModemPackage: false,
    deleteModemPackage: false,
  });
  const [getOperatorsLoading, setGeOperatorsLoading] = useState(false);
  const [getByIdLoading, setGetByIdLoading] = useState(false);

  const [filters, setFilters] = useState({
    Namepacket: "",
    packetvolume: "",
    packetTime: null,
    Price: "",
    OperatorId: null,
    TypeInternet: null,
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    Active: true,
  });

  const [operatorsList, setOperatorsList] = useState([]);
  const [viewModemPackageData, setViewModemPackageData] = useState(null);

  const currentPage = useSelector((state) => state.modemPackage.currentPage);
  const perPage = useSelector((state) => state.modemPackage.perPage);

  const getModemPackages = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Namepacket: "",
      packetvolume: "",
      packetTime: "",
      Price: "",
      OperatorId: null,
      TypeInternet: null,
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      Active: "",
    };
    if (filters.Namepacket.length > 0 && !without_filter) {
      paramsData.Namepacket = filters.Namepacket;
    }
    if (filters.packetvolume.length > 0 && !without_filter) {
      paramsData.packetvolume = filters.packetvolume;
    }
    if (filters.packetTime && !without_filter) {
      paramsData.packetTime = filters.packetTime.value;
    }
    if (filters.Price.length > 0 && !without_filter) {
      paramsData.Price = filters.Price;
    }
    if (filters.OperatorId && !without_filter) {
      paramsData.OperatorId = filters.OperatorId.value;
    }
    if (filters.TypeInternet && !without_filter) {
      paramsData.TypeInternet = filters.TypeInternet.value;
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
      setLoadings({ ...loadings, getModemPackages: true });
      const response = await httpService.get("/GetPackegeInterneModem", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getModemPackages: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setModemPackageList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getModemPackages: false });
    }
  };

  const getModemPackageById = async (modem_package_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetPackegeInterneModem`, {
        params: {
          Id: modem_package_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewModemPackageData(response.data.data[0]);
      } else {
        navigate("/modem_package/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/modem_package/all");
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

  const createModemPackageController = useFormik({
    initialValues: {
      namepacket: "",
      operatorId: null,
      typeInternet: null,
      price: "",
      packetTime: null,
      active: true,
      packetvolume: 50000000,
    },
    validationSchema: createModemPackageSchema,
    onSubmit: (values) => {
      createModemPackage(values);
    },
  });

  const createModemPackage = async (values) => {
    let postData = {
      namepacket: values.namepacket,
      packetvolume: values.packetvolume.toString(),
      price: values.price,
      operatorId: values.operatorId.value,
      packetTime: values.packetTime.value,
      typeInternet: values.typeInternet.value,
      active: values.active,
    };
    try {
      setLoadings({ ...loadings, createModemPackage: true });
      const response = await httpService.post(
        "AddPackegeInterneModem",
        postData
      );
      setLoadings({ ...loadings, createModemPackage: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/modem_package/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createModemPackage: false });
    }
  };

  const updateModemPackageController = useFormik({
    initialValues: {
      id: "",
      namepacket: "",
      operatorId: null,
      typeInternet: null,
      price: "",
      packetTime: null,
      active: true,
      packetvolume: 50000000,
    },
    validationSchema: createModemPackageSchema,
    onSubmit: (values) => {
      updateModemPackage(values);
    },
  });

  const updateModemPackage = async (values) => {
    let postData = {
      id: values.id,
      namepacket: values.namepacket,
      packetvolume: values.packetvolume.toString(),
      price: values.price,
      operatorId: values.operatorId.value,
      packetTime: values.packetTime.value,
      typeInternet: values.typeInternet.value,
      active: values.active,
    };
    try {
      setLoadings({ ...loadings, updateModemPackage: true });
      const response = await httpService.put(
        `/UpdatePackegeInterneModem/${values.id}`,
        postData
      );
      setLoadings({ ...loadings, updateModemPackage: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/modem_package/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateModemPackage: false });
    }
  };

  const deleteModemPackage = async (modem_package_id) => {
    try {
      setLoadings({ ...loadings, deleteModemPackage: true });
      const response = await httpService.delete(
        `/DeletePackegeInterneModem/${modem_package_id}`
      );
      setLoadings({ ...loadings, deleteModemPackage: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getModemPackages(1, perPage, "without_filter");
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteModemPackage: false });
    }
  };

  const patchActive = async (modemPackage) => {
    let postData = {
      namepacket: modemPackage.namepacket,
      operatorId: modemPackage.operatorId,
      typeInternet: modemPackage.typeInternet,
      price: modemPackage.price,
      packetTime: modemPackage.packetTime,
      active: !modemPackage.active,
      packetvolume: modemPackage.packetvolume,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(
        `/UpdatePackegeInterneModem/${modemPackage.id}`,
        postData
      );
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getModemPackages(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getModemPackages,
    getModemPackageById,
    getOperators,
    createModemPackageController,
    updateModemPackageController,
    deleteModemPackage,
    patchActive,
    operatorsList,
    viewModemPackageData,
    filters,
    setFilters,
    loadings,
    getOperatorsLoading,
    getByIdLoading,
  };
  return exports;
};
export default useModemPackage;
