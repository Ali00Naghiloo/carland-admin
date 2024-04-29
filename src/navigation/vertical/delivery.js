// ** Icons Import
import { Circle } from "react-feather";
import { MdDirectionsBike } from "react-icons/md";

export default [
  {
    id: "delivery",
    title: "تعرفه های ارسال",
    icon: <MdDirectionsBike size={20} />,
    children: [
      {
        id: "allDelivery",
        title: "لیست تعرفه های ارسال",
        icon: <Circle size={12} />,
        navLink: "/delivery/all",
      },
      {
        id: "newDelivery",
        title: "ایجاد تعرفه ارسال جدید",
        icon: <Circle size={12} />,
        navLink: "/delivery/new",
      },
    ],
  },
];
