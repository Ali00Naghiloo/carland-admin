// ** Icons Import
import { Circle } from "react-feather";
import { IoFlagOutline } from "react-icons/io5";

export default [
  {
    id: "nationality",
    title: "ملیت ها",
    icon: <IoFlagOutline size={20} />,
    children: [
      {
        id: "allNationality",
        title: "لیست ملیت ها",
        icon: <Circle size={12} />,
        navLink: "/nationality/all",
      },
      {
        id: "createNationality",
        title: "ایجاد ملیت جدید",
        icon: <Circle size={12} />,
        navLink: "/nationality/new",
      },
    ],
  },
];
