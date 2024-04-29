import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createZoneSchema, updateZoneSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setZonesList,
  setCurrentPage,
  setDeleteModal,
  setTotalPage,
  setPatchLoading,
} from "../redux/zones_slice";
import moment from "jalali-moment";

const useZones = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getZones: false,
    createZone: false,
    updateZone: false,
    deleteZone: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getRolesLoading, setGetRolesLoading] = useState(false);

  const [filters, setFilters] = useState({
    roleId: null,
    UserAgentId: null,
    ZipCode: "",
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
    IsActive: true,
  });

  const [viewZoneData, setViewZoneData] = useState(null);
  const [roleData, setRoleData] = useState([]);

  const currentPage = useSelector((state) => state.zones.currentPage);
  const perPage = useSelector((state) => state.zones.perPage);

  const getZones = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      UserAgentId: "",
      ZipCode: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      IsActive: "",
    };
    if (filters.UserAgentId && !without_filter) {
      paramsData.UserAgentId = filters.UserAgentId.value;
    }
    if (filters.ZipCode.length > 0 && !without_filter) {
      paramsData.ZipCode = filters.ZipCode;
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
      setLoadings({ ...loadings, getZones: true });
      const response = await httpService.get("/GetZipCodeToAgent", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getZones: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setZonesList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getZones: false });
    }
  };

  const getZoneById = async (delivery_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetZipCodeToAgent`, {
        params: {
          Id: delivery_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewZoneData(response.data.data[0]);
      } else {
        navigate("/zones/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/zones/all");
      setGetByIdLoading(false);
    }
  };

  const getRoles = async () => {
    let dataArray = [];
    try {
      setGetRolesLoading(true);
      const response = await httpService.get("/GetAllRole");
      setGetRolesLoading(false);
      if (response.data.data) {
        response.data.data.map((dataItem) => {
          dataArray.push({ label: dataItem.name, value: dataItem.id });
        });
        setRoleData(dataArray);
      }
    } catch ({ err, response }) {
      setGetRolesLoading(false);
    }
  };

  const getAgents = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetAllUsers`, {
        params: {
          PageNumber: page,
          RoleId: createZoneController.values.roleId.value,
        },
      });
      response.data.data.map((item) => {
        array.push({
          label: `${item.firstName} ${item.lastName}`,
          value: item.id,
        });
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

  const getFilterAgents = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetAllUsers`, {
        params: {
          PageNumber: page,
          RoleId: filters.roleId.value,
        },
      });
      response.data.data.map((item) => {
        array.push({
          label: `${item.firstName} ${item.lastName}`,
          value: item.id,
        });
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

  const getUpdateAgents = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetAllUsers`, {
        params: {
          PageNumber: page,
          RoleId: updateZoneController.values.roleId.value,
        },
      });
      response.data.data.map((item) => {
        array.push({
          label: `${item.firstName} ${item.lastName}`,
          value: item.id,
        });
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

  const createZoneController = useFormik({
    initialValues: {
      roleId: null,
      userAgentId: null,
      zipCode: [],
      active: true,
    },
    validationSchema: createZoneSchema,
    onSubmit: (values) => {
      if (values.zipCode.length === 0) {
        toast.error("حداقل یک کد پستی وارد کنید");
      } else {
        createZone(values);
      }
    },
  });

  const createZone = async (values) => {
    let postData = {
      userAgentId: values.userAgentId.value,
      zipCode: values.zipCode,
      active: values.active,
    };
    try {
      setLoadings({ ...loadings, createZone: true });
      const response = await httpService.post("/AddZipCodeToAgent", postData);
      setLoadings({ ...loadings, createZone: false });
      if (response.status === 200) {
        navigate("/zones/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createZone: false });
    }
  };

  const updateZoneController = useFormik({
    initialValues: {
      id: "",
      userAgentId: null,
      zipCode: "",
      isActive: true,
    },
    validationSchema: updateZoneSchema,
    onSubmit: (values) => {
      updateZone(values);
    },
  });

  const updateZone = async (values) => {
    let postData = {
      id: values.id,
      userAgentId: values.userAgentId,
      zipCode: values.zipCode,
      isActive: values.isActive,
    };
    try {
      setLoadings({ ...loadings, updateZone: true });
      const response = await httpService.put("/UpdateZipCodeToAgent", postData);
      setLoadings({ ...loadings, updateZone: false });
      if (response.status === 200) {
        navigate("/zones/all");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateZone: false });
    }
  };

  const deleteZone = async (zone_id) => {
    try {
      setLoadings({ ...loadings, deleteZone: true });
      const response = await httpService.delete("/DeleteAgentToZipCode", {
        params: {
          id: zone_id,
        },
      });
      setLoadings({ ...loadings, deleteZone: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getZones(1, perPage, "without_filter");
        dispatch(setDeleteModal(null));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteZone: false });
    }
  };

  const patchActive = async (zone) => {
    let postData = {
      id: zone.id,
      userAgentId: zone.userAgentId,
      zipCode: zone.zipCode,
      isActive: !zone.isActive,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put("/UpdateZipCodeToAgent", postData);
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        getZones(currentPage, perPage, "without_filter");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getZones,
    getZoneById,
    getRoles,
    getAgents,
    getFilterAgents,
    getUpdateAgents,
    createZoneController,
    updateZoneController,
    deleteZone,
    patchActive,
    viewZoneData,
    roleData,
    filters,
    setFilters,
    loadings,
    getByIdLoading,
    getRolesLoading,
  };
  return exports;
};
export default useZones;
