import { lazy } from "react";

const AllOrders = lazy(() => import("../../views/orders/all/index"));

const OrderRoutes = [
  {
    path: "/order/all",
    element: <AllOrders />,
  },
];

export default OrderRoutes;
