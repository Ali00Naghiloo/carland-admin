import { lazy } from "react";

const AllFinance = lazy(() => import("../../views/finance/all/index"));
const ViewFinance = lazy(() => import("../../views/finance/view/index"));

const FinanceRoutes = [
  {
    path: "/finance/all",
    element: <AllFinance />,
  },
  {
    path: "/finance/view",
    element: <ViewFinance />,
  },
];

export default FinanceRoutes;
