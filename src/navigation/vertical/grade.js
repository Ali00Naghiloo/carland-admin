// ** Icons Import
import { Circle } from "react-feather";
import { BsSortDown } from "react-icons/bs";

export default [
  {
    id: "grades",
    title: "گرید ها",
    icon: <BsSortDown size={20} />,
    children: [
      {
        id: "allGrades",
        title: "لیست گرید ها",
        icon: <Circle size={12} />,
        navLink: "/grade/all",
      },
      {
        id: "createGrade",
        title: "ایجاد گرید جدید",
        icon: <Circle size={12} />,
        navLink: "/grade/new",
      },
    ],
  },
];
