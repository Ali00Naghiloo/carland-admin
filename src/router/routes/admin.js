import { lazy } from "react";

const AddAdmin = lazy(() => import("../../views/admin/all/index"));
const CreateAdmin = lazy(() => import("../../views/admin/create/index"));
const UpdateAdmin = lazy(() => import("../../views/admin/update/index"));

const AdminRoutes = [
  {
    path: "/admin/all",
    element: <AddAdmin />,
  },
  {
    path: "/admin/new",
    element: <CreateAdmin />,
  },
  {
    path: "/admin/update",
    element: <UpdateAdmin />,
  },
];

export default AdminRoutes;
