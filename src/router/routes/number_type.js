import { lazy } from "react";

const AllNumberType = lazy(() => import("../../views/number_type/all/index"));
const CreateNumberType = lazy(() =>
  import("../../views/number_type/create/index")
);

const NumberTypeRoutes = [
  {
    path: "/number_type/all",
    element: <AllNumberType />,
  },
  {
    path: "/number_type/new",
    element: <CreateNumberType />,
  },
];

export default NumberTypeRoutes;
