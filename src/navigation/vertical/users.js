// ** Icons Import
import { Circle } from "react-feather";
import { FiUsers } from "react-icons/fi";

export default [
  {
    id: "users",
    title: "کاربران",
    icon: <FiUsers size={20} />,
    children: [
      {
        id: "allUsers",
        title: "لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/users/all",
      },
      {
        id: "createUser",
        title: "ایجاد کاربر جدید",
        icon: <Circle size={12} />,
        navLink: "/users/new",
      },
    ],
  },
];
