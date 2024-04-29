import { useState } from "react";
import useHttp from "./use_http";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  createSourceNumberSchema,
  updateSourceNumberSchema,
  simpleSearchSchema,
} from "../utility/schemas/index";
import { useDispatch, useSelector } from "react-redux";
import {
  setSourceNumberList,
  setCurrentPage,
  setTotalPage,
  setDeleteModal,
  setCurrentPageSearch,
  setTotalPageSearch,
  setPatchLoading,
} from "../redux/source_number_slice";
import moment from "jalali-moment";

const useSourceNumber = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getSourceNumbers: false,
    createSourceNumber: false,
    updateSourceNumber: false,
    deleteSourceNumber: false,
    simpleSearch: false,
    advanceSearch: false,
  });
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [getOperatorsLoading, setGeOperatorsLoading] = useState(false);
  const [getNumberTypesLoading, setGeNumberTypesLoading] = useState(false);
  const [getNumberLabelsLoading, setGeNumberLabelsLoading] = useState(false);

  const [filters, setFilters] = useState({
    Number: "",
    LabelShowNumber: "",
    OperatorId: null,
    TypeNumberId: null,
    LabelNumberId: null,
    PlanId: null,
    CategoryId: null,
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
  const [searchResult, setSearchResult] = useState([]);

  const [viewSourceNumberData, setViewSourceNumberData] = useState(null);

  const currentPage = useSelector((state) => state.sourceNumber.currentPage);
  const perPage = useSelector((state) => state.sourceNumber.perPage);
  const perPageSearch = useSelector(
    (state) => state.sourceNumber.perPageSearch
  );

  const getSourceNumbers = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      Number: "",
      LabelShowNumber: "",
      OperatorId: "",
      TypeNumberId: "",
      LabelNumberId: "",
      PlanId: "",
      CategoryId: "",
      Price: "",
      CreateDate: "",
      CreateDateEndSearch: "",
      UserName: "",
      UpdateDate: "",
      UpdateDateEndSearch: "",
      UserNameUpdate: "",
      Active: "",
    };
    if (filters?.Number?.length > 0 && !without_filter) {
      paramsData.Number = filters.Number;
    }
    if (filters?.LabelShowNumber?.length > 0 && !without_filter) {
      paramsData.LabelShowNumber = filters.LabelShowNumber;
    }
    if (filters?.OperatorId && !without_filter) {
      paramsData.OperatorId = filters.OperatorId.value;
    }
    if (filters?.TypeNumberId && !without_filter) {
      paramsData.TypeNumberId = filters.TypeNumberId.value;
    }
    if (filters?.LabelNumberId && !without_filter) {
      paramsData.LabelNumberId = filters.LabelNumberId.value;
    }
    if (filters?.PlanId && !without_filter) {
      paramsData.PlanId = filters.PlanId.value;
    }
    if (filters?.CategoryId && !without_filter) {
      paramsData.CategoryId = filters.CategoryId.value;
    }
    if (filters?.Price?.length > 0 && !without_filter) {
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
      setLoadings({ ...loadings, getSourceNumbers: true });
      const response = await httpService.get("/GetSourceNumbers", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getSourceNumbers: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setSourceNumberList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getSourceNumbers: false });
    }
  };

  const getSourceNumberById = async (source_number_id) => {
    try {
      setGetByIdLoading(true);
      const response = await httpService.get(`/GetSourceNumbers`, {
        params: {
          Id: source_number_id,
        },
      });
      setGetByIdLoading(false);
      if (response?.data?.data[0]) {
        setViewSourceNumberData(response.data.data[0]);
      } else {
        navigate("/source_number/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/source_number/all");
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

  const createSourceNumberController = useFormik({
    initialValues: {
      operatorId: null,
      typeNumberId: null,
      labelNumberId: null,
      planId: null,
      categoryId: null,
      number: [],
      price: "",
      active: true,
    },
    validationSchema: createSourceNumberSchema,
    onSubmit: (values) => {
      if (values.number.length === 0) {
        toast.error("حداقل یک شماره باید وارد کنید.");
      } else {
        createSourceNumber(values);
      }
    },
  });

  const createSourceNumber = async (values) => {
    let postData = {
      operatorId: values.operatorId.value,
      number: values.number,
      labelNumberId: values.labelNumberId.value,
      price: parseFloat(values.price),
      active: values.active,
      planId: values.planId.value,
      categoryId: values.categoryId.value,
      typeNumberId: values.typeNumberId.value,
    };
    try {
      setLoadings({ ...loadings, createSourceNumber: true });
      const response = await httpService.post("/AddSourceNumbers", postData);
      setLoadings({ ...loadings, createSourceNumber: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/source_number/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createSourceNumber: false });
    }
  };

  const updateSourceNumberController = useFormik({
    initialValues: {
      id: "",
      operatorId: null,
      typeNumberId: null,
      labelNumberId: null,
      planId: null,
      categoryId: null,
      number: "",
      labelShowNumber: "",
      price: "",
      active: true,
    },
    validationSchema: updateSourceNumberSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateSourceNumber(values);
    },
  });

  const updateSourceNumber = async (values) => {
    let postData = {
      operatorId: values.operatorId.value,
      number: values.number,
      labelShowNumber: values.labelShowNumber,
      labelNumberId: values.labelNumberId.value,
      price: parseFloat(values.price),
      active: values.active,
      planId: values.planId.value,
      categoryId: values.categoryId.value,
      typeNumberId: values.typeNumberId.value,
    };
    try {
      setLoadings({ ...loadings, updateSourceNumber: true });
      const response = await httpService.put(
        `/UpdateSourceNumbers/${values.id}`,
        postData
      );
      setLoadings({ ...loadings, updateSourceNumber: false });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/source_number/all");
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, updateSourceNumber: false });
    }
  };

  const deleteSourceNumber = async (source_number_id) => {
    try {
      setLoadings({ ...loadings, deleteSourceNumber: true });
      const response = await httpService.delete(
        `/DeleteSourceNumbers/${source_number_id}`
      );
      setLoadings({ ...loadings, deleteSourceNumber: false });
      if (response.status === 200) {
        dispatch(setCurrentPage(1));
        getSourceNumbers(1, perPage);
        dispatch(setDeleteModal(null));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, deleteSourceNumber: false });
    }
  };

  const simpleSearchController = useFormik({
    initialValues: {
      Number: "",
    },
    validationSchema: simpleSearchSchema,
    onSubmit: (values) => {
      dispatch(setCurrentPageSearch(1));
      simpleSearch(values, 1, perPageSearch);
    },
  });

  const simpleSearch = async (values, currentPage, perPage) => {
    let dataArray = [];
    try {
      setLoadings({ ...loadings, simpleSearch: true });
      const response = await httpService.get("SearchSourceNumbers", {
        params: {
          PageNumber: currentPage,
          PageSize: perPage.id,
          Number: values.Number,
        },
      });
      setLoadings({ ...loadings, simpleSearch: false });
      if (response.status === 200) {
        response.data.data.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        setSearchResult(dataArray);
        dispatch(setTotalPageSearch(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, simpleSearch: false });
    }
  };

  const advanceSearchController = useFormik({
    initialValues: {
      operatorId: null,
      prefixSearch: null,
      Number5: "",
      Number6: "",
      Number7: "",
      Number8: "",
      Number9: "",
      Number10: "",
      Number11: "",
    },
    validationSchema: null,
    onSubmit: (values) => {
      dispatch(setCurrentPageSearch(1));
      advanceSearch(values, 1, perPageSearch);
    },
  });

  const advanceSearch = async (values, currentPage, perPage) => {
    let dataArray = [];
    try {
      setLoadings({ ...loadings, advanceSearch: true });
      const response = await httpService.get("SearchSourceNumbersAdvance", {
        params: {
          PageNumber: currentPage,
          PageSize: perPage.id,
          prefixSearch: values?.prefixSearch?.value
            ? values.prefixSearch.value
            : "",
          Number5: values.Number5,
          Number6: values.Number6,
          Number7: values.Number7,
          Number8: values.Number8,
          Number9: values.Number9,
          Number10: values.Number10,
          Number11: values.Number11,
        },
      });
      setLoadings({ ...loadings, advanceSearch: false });
      if (response.status === 200) {
        response.data.data.map((item, index) => {
          dataArray.push({ ...item, index: index + 1 });
        });
        setSearchResult(dataArray);
        dispatch(setTotalPageSearch(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, advanceSearch: false });
    }
  };

  const getSelectPrefixes = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(
        `/GetPrefixeNumbersByOperatorName`,
        {
          params: {
            PageNumber: page,
            Operatorid: advanceSearchController?.values?.operatorId?.value,
          },
        }
      );
      response.data.data.map((item) => {
        array.push({ label: item, value: item });
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

  const patchActive = async (sourceNumber) => {
    let postData = {
      operatorId: sourceNumber.operator.id,
      number: sourceNumber.number,
      labelShowNumber: sourceNumber.labelShowNumber,
      labelNumberId: sourceNumber.labelNumber.id,
      price: parseFloat(sourceNumber.price),
      active: !sourceNumber.active,
      planId: sourceNumber.plan.id,
      categoryId: sourceNumber.category.id,
      typeNumberId: sourceNumber.typeNumber.id,
    };
    try {
      dispatch(setPatchLoading(true));
      const response = await httpService.put(
        `/UpdateSourceNumbers/${sourceNumber.id}`,
        postData
      );
      dispatch(setPatchLoading(false));
      if (response.status === 200) {
        toast.success(response.data.message);
        getSourceNumbers(currentPage, perPage, "without_filter");
      }
    } catch ({ err, response }) {
      dispatch(setPatchLoading(false));
    }
  };

  const exports = {
    getSourceNumbers,
    getOperators,
    getNumberLabels,
    getSourceNumberById,
    getSelectCategories,
    createSourceNumberController,
    updateSourceNumberController,
    deleteSourceNumber,
    patchActive,
    simpleSearchController,
    simpleSearch,
    advanceSearchController,
    advanceSearch,
    getSelectPrefixes,
    searchResult,
    viewSourceNumberData,
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
export default useSourceNumber;
