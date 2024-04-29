// ** Icons Import
import { Circle } from "react-feather";
import { BsPercent } from "react-icons/bs";

export default [
  {
    id: "commision",
    title: "کمیسیون ها",
    icon: <BsPercent size={20} />,
    children: [
      {
        id: "allCommision",
        title: "لیست کمیسیون ها",
        icon: <Circle size={12} />,
        navLink: "/commision/all",
      },
      {
        id: "newCommision",
        title: "ایجاد کمیسیون جدید",
        icon: <Circle size={12} />,
        navLink: "/commision/new",
      },
    ],
  },
];
