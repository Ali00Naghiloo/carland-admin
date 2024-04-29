import { lazy } from "react";

const AllDelivery = lazy(() => import("../../views/delivery/all/index"));
const CreateDelivery = lazy(() => import("../../views/delivery/create/index"));
const UpdateDelivery = lazy(() => import("../../views/delivery/update/index"));

const DeliveryRoutes = [
  {
    path: "/delivery/all",
    element: <AllDelivery />,
  },
  {
    path: "/delivery/new",
    element: <CreateDelivery />,
  },
  {
    path: "/delivery/update",
    element: <UpdateDelivery />,
  },
];

export default DeliveryRoutes;
