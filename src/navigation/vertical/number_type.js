// ** Icons Import
import { Circle } from "react-feather";
import { MdOutlineTypeSpecimen } from "react-icons/md";

export default [
  {
    id: "numberType",
    title: "انواع سیمکارت",
    icon: <MdOutlineTypeSpecimen size={20} />,
    children: [
      {
        id: "allNumberType",
        title: "لیست انواع سیمکارت",
        icon: <Circle size={12} />,
        navLink: "/number_type/all",
      },
      {
        id: "newNumberType",
        title: "ایجاد نوع سیمکارت جدید",
        icon: <Circle size={12} />,
        navLink: "/number_type/new",
      },
    ],
  },
];
