import { useState } from "react";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFinanceList,
  setTotalPage,
  setTransactionsTotalPage,
} from "../redux/finance_slice";
import moment from "jalali-moment";

const useFinance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();

  const [loadings, setLoadings] = useState({
    getFinances: false,
    getWalletStatus: false,
  });
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const [filters, setFilters] = useState({
    CreateDate: { from: null, to: null },
    UserName: "",
    UpdateDate: { from: null, to: null },
    UserNameUpdate: "",
  });

  const [walletStatusData, setWalletStatusData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const getFinances = async (currentPage, perPage, without_filter) => {
    let dataArray = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
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
      setLoadings({ ...loadings, getFinances: true });
      const response = await httpService.get("/GetListUserAppBySumWallet", {
        params: paramsData,
      });
      setLoadings({ ...loadings, getFinances: false });
      if (response.data.data) {
        response.data.data.map((dataItem, index) => {
          dataArray.push({ ...dataItem, index: index + 1 });
        });
        dispatch(setFinanceList(dataArray));
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, getFinances: false });
    }
  };

  const getWalletStatus = async (user_id) => {
    try {
      setLoadings({ ...loadings, getWalletStatus: true });
      const response = await httpService.get(`/GetSumCreditByUserId`, {
        params: {
          AppUserId: user_id,
        },
      });
      setLoadings({ ...loadings, getWalletStatus: false });
      if (response?.data?.data) {
        setWalletStatusData(response.data.data);
      } else {
        navigate("/finance/all");
        toast.error("پیدا نشد!");
      }
    } catch ({ err, response }) {
      navigate("/finance/all");
      setLoadings({ ...loadings, getWalletStatus: false });
    }
  };

  const getTransactions = async (currentPage, perPage, user_id) => {
    let array = [];
    let paramsData = {
      PageNumber: currentPage,
      PageSize: perPage.id,
      AppUserId: user_id,
    };
    try {
      setTransactionsLoading(true);
      const response = await httpService.get(`/GetWallet`, {
        params: paramsData,
      });
      setTransactionsLoading(false);
      if (response?.data?.data) {
        response.data.data.map((item, index) => {
          array.push({ ...item, index: index + 1 });
        });
        setTransactions(array);
        dispatch(setTotalPage(response.data.totalPages));
      }
    } catch ({ err, response }) {
      setTransactionsLoading(false);
    }
  };

  const exports = {
    getFinances,
    getWalletStatus,
    getTransactions,
    walletStatusData,
    transactions,
    filters,
    setFilters,
    loadings,
    transactionsLoading,
  };
  return exports;
};
export default useFinance;
