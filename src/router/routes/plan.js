import { lazy } from "react";

const AllPlan = lazy(() => import("../../views/plan/all/index"));
const CreatePlan = lazy(() => import("../../views/plan/create/index"));
const UpdatePlan = lazy(() => import("../../views/plan/update/index"));

const PlanRoutes = [
  {
    path: "/plan/all",
    element: <AllPlan />,
  },
  {
    path: "/plan/new",
    element: <CreatePlan />,
  },
  {
    path: "/plan/update",
    element: <UpdatePlan />,
  },
];

export default PlanRoutes;
