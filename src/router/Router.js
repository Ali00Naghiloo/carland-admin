import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import BlankLayout from "@layouts/BlankLayout";
import { getHomeRouteForLoggedInUser } from "../utility/Utils";

// ** Components
const Error = lazy(() => import("../views/pages/misc/Error"));
const Login = lazy(() => import("../views/pages/authentication/Login"));

const Router = ({ allRoutes }) => {
  const getHomeRoute = () => {
    if (localStorage.getItem("token")) {
      return getHomeRouteForLoggedInUser("admin");
    } else {
      return "/login";
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "/login",
      element: <BlankLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },
    {
      path: "*",
      element: <BlankLayout />,
      children: [{ path: "*", element: <Error /> }],
    },
    ...allRoutes,
  ]);

  return routes;
};

export default Router;
