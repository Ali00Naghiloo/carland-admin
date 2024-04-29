// ** Icons Import
import { Circle } from "react-feather";
import { MdOutlineOndemandVideo } from "react-icons/md";

export default [
  {
    id: "videos",
    title: "ویدیو ها",
    icon: <MdOutlineOndemandVideo size={20} />,
    children: [
      {
        id: "allVideos",
        title: "لیست ویدیو ها",
        icon: <Circle size={12} />,
        navLink: "/videos/all",
      },
      {
        id: "createVideo",
        title: "ایجاد ویدیو جدید",
        icon: <Circle size={12} />,
        navLink: "/videos/new",
      },
    ],
  },
];
