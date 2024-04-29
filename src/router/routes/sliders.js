import { lazy } from "react";

const AllSliders = lazy(() => import("../../views/sliders/all/index"));
const CreateSlider = lazy(() => import("../../views/sliders/create/index"));
const UpdateSlider = lazy(() => import("../../views/sliders/update/index"));

const SlidersRoutes = [
  {
    path: "/sliders/all",
    element: <AllSliders />,
  },
  {
    path: "/sliders/new",
    element: <CreateSlider />,
  },
  {
    path: "/sliders/update",
    element: <UpdateSlider />,
  },
];

export default SlidersRoutes;
