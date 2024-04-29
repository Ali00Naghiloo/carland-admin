// ** Icons Import
import { Circle } from "react-feather";
import { FiUsers } from "react-icons/fi";

export default [
  {
    id: "ads",
    title: "آگهی ها",
    icon: <FiUsers size={20} />,
    children: [
      {
        id: "allAds",
        title: "لیست آگهی ها",
        icon: <Circle size={12} />,
        navLink: "/ad/all",
      },
      {
        id: "createAd",
        title: "ایجاد آگهی جدید",
        icon: <Circle size={12} />,
        navLink: "/ad/new",
      },
    ],
  },
];
