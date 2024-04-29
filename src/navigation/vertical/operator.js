// ** Icons Import
import { Circle } from "react-feather";
import { MdOutlineSupportAgent } from "react-icons/md";

export default [
  {
    id: "operators",
    title: "اپراتور ها",
    icon: <MdOutlineSupportAgent size={20} />,
    children: [
      {
        id: "allOperator",
        title: "لیست اپراتور ها",
        icon: <Circle size={12} />,
        navLink: "/operator/all",
      },
      {
        id: "newOperator",
        title: "ایجاد اپراتور جدید",
        icon: <Circle size={12} />,
        navLink: "/operator/new",
      },
    ],
  },
];
