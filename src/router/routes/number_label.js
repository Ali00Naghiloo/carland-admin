import { lazy } from "react";

const AllNumberLabel = lazy(() => import("../../views/number_label/all/index"));
const CreateNumberLabel = lazy(() =>
  import("../../views/number_label/create/index")
);

const NumberLabelRoutes = [
  {
    path: "/number_label/all",
    element: <AllNumberLabel />,
  },
  {
    path: "/number_label/new",
    element: <CreateNumberLabel />,
  },
];

export default NumberLabelRoutes;
