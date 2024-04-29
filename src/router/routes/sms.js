import { lazy } from "react";

const AllSms = lazy(() => import("../../views/sms/all/index"));
const UpdateSms = lazy(() => import("../../views/sms/update/index"));

const SmsRoutes = [
  {
    path: "/sms/all",
    element: <AllSms />,
  },
  {
    path: "/sms/update",
    element: <UpdateSms />,
  },
];

export default SmsRoutes;
