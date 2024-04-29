import { lazy } from "react";

const AllRole = lazy(() => import("../../views/role/all/index"));
const CreateRole = lazy(() => import("../../views/role/create/index"));
const UpdateRole = lazy(() => import("../../views/role/update/index"));

const RoleRoutes = [
  {
    path: "/role/all",
    element: <AllRole />,
  },
  {
    path: "/role/new",
    element: <CreateRole />,
  },
  {
    path: "/role/update",
    element: <UpdateRole />,
  },
];

export default RoleRoutes;
