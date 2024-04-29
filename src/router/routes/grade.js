import { lazy } from "react";

const AllGrade = lazy(() => import("../../views/grade/all/index"));
const CreateGrade = lazy(() => import("../../views/grade/create/index"));
const UpdateGrade = lazy(() => import("../../views/grade/update/index"));

const GradeRoutes = [
  {
    path: "/grade/all",
    element: <AllGrade />,
  },
  {
    path: "/grade/new",
    element: <CreateGrade />,
  },
  {
    path: "/grade/update",
    element: <UpdateGrade />,
  },
];

export default GradeRoutes;
