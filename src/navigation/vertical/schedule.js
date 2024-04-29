// ** Icons Import
import { Circle } from "react-feather";
import { MdSchedule } from "react-icons/md";

export default [
  {
    id: "schedule",
    title: "زمانبندی خدمات",
    icon: <MdSchedule size={20} />,
    children: [
      {
        id: "allSchedule",
        title: "لیست زمانبندی خدمات",
        icon: <Circle size={12} />,
        navLink: "/schedule/all",
      },
      {
        id: "createSchedule",
        title: "ایجاد زمانبندی جدید",
        icon: <Circle size={12} />,
        navLink: "/schedule/new",
      },
    ],
  },
];
