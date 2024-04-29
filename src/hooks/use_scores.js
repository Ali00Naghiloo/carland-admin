import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { createScoreSchema } from "../utility/schemas/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useScores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    createScore: false,
    updateScore: false,
  });
  const [getOperatorsLoading, setGeOperatorsLoading] = useState(false);

  const [operatorsList, setOperatorsList] = useState([]);

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

  const getSelectProduct = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetProductOprators`, {
        params: {
          PageNumber: page,
          OperatorId: createScoreController.values.operatorId.value,
        },
      });
      if (response.data.data) {
        response.data.data.map((item) => {
          array.push({ label: item.name, value: item.id });
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

  const getSelectService = async (search, loadedOptions, { page }) => {
    let array = [];
    try {
      const response = await httpService.get(`/GetService`, {
        params: {
          PageNumber: page,
          OpratorTableId: createScoreController.values.operatorId.value,
        },
      });
      if (response.data.data) {
        response.data.data.map((item) => {
          array.push({ label: item.name, value: item.id });
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

  const createScoreController = useFormik({
    initialValues: {
      operatorId: null,
      productId: [],
      serviceId: [],
      score: "",
      active: true,
    },
    validationSchema: createScoreSchema,
    onSubmit: (values) => {
      if (values.productId.length === 0 && values.serviceId.length === 0) {
        toast.error("حداقل یک محصول یا خدمت انتخاب کنید");
      } else {
        createScore(values);
      }
    },
  });

  const createScore = async (values) => {
    let postData = {
      productId: [],
      serviceId: [],
      score: values.score,
      active: values.active,
    };
    values.productId?.map((item) => {
      postData.productId.push(item.value);
    });
    values.serviceId?.map((item) => {
      postData.serviceId.push(item.value);
    });
    try {
      setLoadings({ ...loadings, createScore: true });
      const response = await httpService.post(
        "/AddScorerserviceproduct",
        postData
      );
      setLoadings({ ...loadings, createScore: false });
      if (response.status === 200) {
        createScoreController.resetForm();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, createScore: false });
    }
  };

  const exports = {
    getOperators,
    getSelectProduct,
    getSelectService,
    createScoreController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  };
  return exports;
};

export default useScores;
