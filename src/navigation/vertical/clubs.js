// ** Icons Import
import { Circle } from "react-feather";
import { FiUsers } from "react-icons/fi";

export default [
  {
    id: "clubs",
    title: "کلوپ ها",
    icon: <FiUsers size={20} />,
    children: [
      {
        id: "allClubs",
        title: "لیست کلوپ ها",
        icon: <Circle size={12} />,
        navLink: "/club/all",
      },
      {
        id: "createClub",
        title: "ایجاد کلوپ جدید",
        icon: <Circle size={12} />,
        navLink: "/club/new",
      },
    ],
  },
];
