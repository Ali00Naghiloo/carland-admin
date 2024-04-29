import { useState } from "react";
import { useFormik } from "formik";
import useHttp from "./use_http";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTokenSchema } from "../utility/schemas";
import formatHelper from "../helper/format_helper";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { httpService } = useHttp();
  const [loadings, setLoadings] = useState({
    handleLogin: false,
    handleLogout: false,
  });

  const getTokenController = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: getTokenSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  // get token
  const handleLogin = async (values) => {
    try {
      setLoadings({ ...loadings, handleLogin: true });
      const data = new FormData();
      data.append("username", values.username);
      data.append("password", values.password);
      const response = await httpService.post("AdminLogin", data);
      setLoadings({ ...loadings, handleLogin: false });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, handleLogin: false });
    }
  };

  // handle logout
  const handleLogout = async () => {
    try {
      setLoadings({ ...loadings, handleLogout: true });
      const response = await httpService.post(
        "/Auth/Logout/logout",
        {},
        {
          params: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLoadings({ ...loadings, handleLogout: false });
      // if (response.status === 200) {
      if (true) {
        localStorage.removeItem("token");
        toast.success("شما با موفقیت از برنامه خارج شدید.");
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      }
    } catch ({ err, response }) {
      setLoadings({ ...loadings, handleLogout: false });
    }
  };

  // exports
  const exports = {
    getTokenController,
    handleLogout,
    loadings,
  };

  return exports;
};

export default useAuth;
