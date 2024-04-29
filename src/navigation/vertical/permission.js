// ** Icons Import
import { Circle } from "react-feather";
import { FaRegHandPaper } from "react-icons/fa";

export default [
  {
    id: "permission",
    title: "دسترسی کاربران",
    icon: <FaRegHandPaper size={20} />,
    children: [
      {
        id: "allPermissions",
        title: "لیست دسترسی ها",
        icon: <Circle size={12} />,
        navLink: "/permission/all",
      },
      {
        id: "newPermission",
        title: "ایجاد دسترسی جدید",
        icon: <Circle size={12} />,
        navLink: "/permission/new",
      },
    ],
  },
];
