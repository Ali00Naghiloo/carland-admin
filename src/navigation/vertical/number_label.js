// ** Icons Import
import { Circle } from "react-feather";
import { MdLabelOutline } from "react-icons/md";

export default [
  {
    id: "numberLabels",
    title: "برچسب های سیمکارت",
    icon: <MdLabelOutline size={20} />,
    children: [
      {
        id: "allNumberLabels",
        title: "لیست برچسب ها",
        icon: <Circle size={12} />,
        navLink: "/number_label/all",
      },
      {
        id: "newNumberLabel",
        title: "ایجاد برچسب جدید",
        icon: <Circle size={12} />,
        navLink: "/number_label/new",
      },
    ],
  },
];
