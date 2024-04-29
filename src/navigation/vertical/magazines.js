// ** Icons Import
import { Circle } from "react-feather";
import { FiUsers } from "react-icons/fi";

export default [
  {
    id: "magaznies",
    title: "مجلات",
    icon: <FiUsers size={20} />,
    children: [
      {
        id: "allMagazines",
        title: "لیست مجلات",
        icon: <Circle size={12} />,
        navLink: "/magazine/all",
      },
      {
        id: "createMagazine",
        title: "ایجاد مجلات جدید",
        icon: <Circle size={12} />,
        navLink: "/magazine/new",
      },
    ],
  },
];
