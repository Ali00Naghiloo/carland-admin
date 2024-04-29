import { lazy } from "react";

const AllSchedule = lazy(() => import("../../views/schedule/all/index"));
const CreateSchedule = lazy(() => import("../../views/schedule/create/index"));
const UpdateSchedule = lazy(() => import("../../views/schedule/update/index"));

const ScheduleRoutes = [
  {
    path: "/schedule/all",
    element: <AllSchedule />,
  },
  {
    path: "/schedule/new",
    element: <CreateSchedule />,
  },
  {
    path: "/schedule/update",
    element: <UpdateSchedule />,
  },
];

export default ScheduleRoutes;
