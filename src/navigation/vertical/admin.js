// ** Icons Import
import { Circle } from "react-feather";
import { FaRegUserCircle } from "react-icons/fa";

export default [
  {
    id: "admin",
    title: "ادمین ها",
    icon: <FaRegUserCircle size={20} />,
    children: [
      {
        id: "allAdmin",
        title: "لیست ادمین ها",
        icon: <Circle size={12} />,
        navLink: "/admin/all",
      },
      {
        id: "newAdmin",
        title: "ایجاد ادمین جدید",
        icon: <Circle size={12} />,
        navLink: "/admin/new",
      },
    ],
  },
];
