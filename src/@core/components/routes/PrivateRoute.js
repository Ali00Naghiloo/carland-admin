// ** React Imports
import { Navigate } from "react-router-dom";
import { Suspense } from "react";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars

  if (route) {
    let restrictedRoute = false;

    if (route.meta) {
      restrictedRoute = route.meta.restricted;
    }
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    }
    if (localStorage.getItem("token") && restrictedRoute) {
      return <Navigate to="/" />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PrivateRoute;
