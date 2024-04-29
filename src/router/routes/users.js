import { lazy } from "react";

const AllUsers = lazy(() => import("../../views/users/all/index"));
const CreateUser = lazy(() => import("../../views/users/create/index"));
const UpdateUser = lazy(() => import("../../views/users/update/index"));

const UsersRoutes = [
  {
    path: "/users/all",
    element: <AllUsers />,
  },
  {
    path: "/users/new",
    element: <CreateUser />,
  },
  {
    path: "/users/update",
    element: <UpdateUser />,
  },
];

export default UsersRoutes;
