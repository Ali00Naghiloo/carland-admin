import { lazy } from "react";

const AllService = lazy(() => import("../../views/service/all/index"));
const CreateService = lazy(() => import("../../views/service/create/index"));
const UpdateService = lazy(() => import("../../views/service/update/index"));

const ServiceRoutes = [
  {
    path: "/service/all",
    element: <AllService />,
  },
  {
    path: "/service/new",
    element: <CreateService />,
  },
  {
    path: "/service/update",
    element: <UpdateService />,
  },
];

export default ServiceRoutes;
