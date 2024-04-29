// ** Icons Import
import { Circle } from "react-feather";
import { TbListNumbers } from "react-icons/tb";

export default [
  {
    id: "sourceNumbers",
    title: "شماره تلفن ها",
    icon: <TbListNumbers size={20} />,
    children: [
      {
        id: "allSourceNumbers",
        title: "لیست شماره تلفن ها",
        icon: <Circle size={12} />,
        navLink: "/source_number/all",
      },
      {
        id: "searchSourceNumbers",
        title: "جستجوی شماره تلفن ها",
        icon: <Circle size={12} />,
        navLink: "/source_number/search",
      },
      {
        id: "newSourceNumber",
        title: "ایجاد شماره تلفن جدید",
        icon: <Circle size={12} />,
        navLink: "/source_number/new",
      },
    ],
  },
];
