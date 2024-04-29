import { lazy } from "react";

const AllOperator = lazy(() => import("../../views/operator/all/index"));
const CreateOperator = lazy(() => import("../../views/operator/create/index"));
const UpdateOperator = lazy(() => import("../../views/operator/update/index"));

const OperatorRoutes = [
  {
    path: "/operator/all",
    element: <AllOperator />,
  },
  {
    path: "/operator/new",
    element: <CreateOperator />,
  },
  {
    path: "/operator/update",
    element: <UpdateOperator />,
  },
];

export default OperatorRoutes;
