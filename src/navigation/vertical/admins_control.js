// ** Icons Import
import { Circle } from "react-feather";
import { FiUsers } from "react-icons/fi";

export default [
  {
    id: "admin_control",
    title: "کنترل ادمین ها",
    icon: <FiUsers size={20} />,
    children: [
      {
        id: "allAdmins",
        title: "لیست ادمین ها",
        icon: <Circle size={12} />,
        navLink: "/admin/all",
      },
      {
        id: "createAdmin",
        title: "ایجاد ادمین جدید",
        icon: <Circle size={12} />,
        navLink: "/admin/new",
      },
    ],
  },
];
