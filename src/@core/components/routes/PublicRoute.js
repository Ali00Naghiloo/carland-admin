// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

// ** Utils
import { getHomeRouteForLoggedInUser } from "@utils";

const PublicRoute = ({ children, route }) => {
  if (route) {
    const restrictedRoute = route.meta && route.meta.restricted;

    if (localStorage.getItem("token") && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser("admin")} />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PublicRoute;
