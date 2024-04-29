// ** Icons Import
import { Circle } from "react-feather";
import { MdOutlineSimCard } from "react-icons/md";

export default [
  {
    id: "simcard",
    title: "سیمکارت ها",
    icon: <MdOutlineSimCard size={20} />,
    children: [
      {
        id: "simcardNave",
        title: "سیمکارت های خام",
        icon: <Circle size={12} />,
        children: [
          {
            id: "allSimcardNave",
            title: "لیست",
            icon: <Circle size={12} />,
            navLink: "/simcard/nave/all",
          },
          {
            id: "newSimcardNave",
            title: "ایجاد",
            icon: <Circle size={12} />,
            navLink: "/simcard/nave/new",
          },
        ],
      },
      {
        id: "simcardWithNumber",
        title: "سیمکارت با شماره",
        icon: <Circle size={12} />,
        children: [
          {
            id: "allSimcardWithNumber",
            title: "لیست",
            icon: <Circle size={12} />,
            navLink: "/simcard/with_number/all",
          },
          {
            id: "newSimcardWithNumber",
            title: "ایجاد",
            icon: <Circle size={12} />,
            navLink: "/simcard/with_number/new",
          },
        ],
      },
    ],
  },
];
