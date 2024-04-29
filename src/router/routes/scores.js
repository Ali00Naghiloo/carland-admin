import { lazy } from "react";

const CreateScore = lazy(() => import("../../views/scores/create/index"));

const ScoresRoutes = [
  {
    path: "/scores/new",
    element: <CreateScore />,
  },
];

export default ScoresRoutes;
