// ** Icons Import
import { Circle } from "react-feather";
import { MdStarBorder } from "react-icons/md";

export default [
  {
    id: "scores",
    title: "امتیازات",
    icon: <MdStarBorder size={20} />,
    children: [
      {
        id: "newScore",
        title: "ایجاد امتیاز جدید",
        icon: <Circle size={12} />,
        navLink: "/scores/new",
      },
    ],
  },
];
