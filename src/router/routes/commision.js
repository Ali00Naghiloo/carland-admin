import { lazy } from "react";

const AllCommision = lazy(() => import("../../views/commision/all/index"));
const CreateCommision = lazy(() =>
  import("../../views/commision/create/index")
);
const UpdateCommision = lazy(() =>
  import("../../views/commision/update/index")
);

const CommisionRoutes = [
  {
    path: "/commision/all",
    element: <AllCommision />,
  },
  {
    path: "/commision/new",
    element: <CreateCommision />,
  },
  {
    path: "/commision/update",
    element: <UpdateCommision />,
  },
];

export default CommisionRoutes;
