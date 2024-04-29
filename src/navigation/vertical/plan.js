// ** Icons Import
import { Circle } from "react-feather";
import { BsStickies } from "react-icons/bs";

export default [
  {
    id: "plans",
    title: "طرح ها",
    icon: <BsStickies size={20} />,
    children: [
      {
        id: "allPlans",
        title: "لیست طرح ها",
        icon: <Circle size={12} />,
        navLink: "/plan/all",
      },
      {
        id: "createPlan",
        title: "ایجاد طرح جدید",
        icon: <Circle size={12} />,
        navLink: "/plan/new",
      },
    ],
  },
];
