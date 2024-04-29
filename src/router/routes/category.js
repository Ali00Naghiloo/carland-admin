import { lazy } from "react";

const AllCategory = lazy(() => import("../../views/catgeory/all/index"));
const CreateCategory = lazy(() => import("../../views/catgeory/create/index"));
const UpdateCategory = lazy(() => import("../../views/catgeory/update/index"));

const CtageoryRoutes = [
  {
    path: "/category/all",
    element: <AllCategory />,
  },
  {
    path: "/category/new",
    element: <CreateCategory />,
  },
  {
    path: "/category/update",
    element: <UpdateCategory />,
  },
];

export default CtageoryRoutes;
