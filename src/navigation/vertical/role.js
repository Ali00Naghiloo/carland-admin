// ** Icons Import
import { Circle } from "react-feather";
import { IoAccessibilityOutline } from "react-icons/io5";

export default [
  {
    id: "role",
    title: "نقش ها",
    icon: <IoAccessibilityOutline size={20} />,
    children: [
      {
        id: "allRole",
        title: "لیست نقش ها",
        icon: <Circle size={12} />,
        navLink: "/role/all",
      },
      {
        id: "createRole",
        title: "ایجاد نقش جدید",
        icon: <Circle size={12} />,
        navLink: "/role/new",
      },
    ],
  },
];
