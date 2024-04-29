import { lazy } from "react";

const Home = lazy(() => import("../../views/dashboard/index"));

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <Home />,
  },
];

export default DashboardRoutes;
