// ** Icons Import
import { Circle } from "react-feather";
import { MdOutlinePictureInPicture } from "react-icons/md";

export default [
  {
    id: "sliders",
    title: "اسلایدر ها",
    icon: <MdOutlinePictureInPicture size={20} />,
    children: [
      {
        id: "allSliders",
        title: "لیست اسلایدر ها",
        icon: <Circle size={12} />,
        navLink: "/sliders/all",
      },
      {
        id: "newSlider",
        title: "ایجاد اسلایدر جدید",
        icon: <Circle size={12} />,
        navLink: "/sliders/new",
      },
    ],
  },
];
