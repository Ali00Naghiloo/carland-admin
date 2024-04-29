import axios from "axios";
import { toast } from "react-hot-toast";
import formatHelper from "../helper/format_helper";

const useHttp = () => {
  var token = localStorage.getItem("token");

  const httpService = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
      // "X-Requested-With": "XMLHttpRequest",
    },
  });

  httpService.interceptors.response.use(
    (response) => response,
    async ({ error, response }) => {
      if (response?.status === 401) {
        localStorage.removeItem("token");
        window.location.replace("/");
        toast.error("شما از برنامه خارج شده اید");
      } else if (response?.data?.message) {
        toast.error(formatHelper.toPersianString(response?.data?.message));
      } else {
        console.log(error, response);
        toast.error("خطا در برقراری ارتباط");
      }
    }
  );

  const exports = { httpService };

  return exports;
};

export default useHttp;
