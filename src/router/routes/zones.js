import { lazy } from "react";

const AllZones = lazy(() => import("../../views/zones/all/index"));
const CreateZone = lazy(() => import("../../views/zones/create/index"));
const UpdateZone = lazy(() => import("../../views/zones/update/index"));

const ZonesRoutes = [
  {
    path: "/zones/all",
    element: <AllZones />,
  },
  {
    path: "/zones/new",
    element: <CreateZone />,
  },
  {
    path: "/zones/update",
    element: <UpdateZone />,
  },
];

export default ZonesRoutes;
