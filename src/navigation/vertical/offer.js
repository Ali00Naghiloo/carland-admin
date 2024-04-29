// ** Icons Import
import { Circle } from "react-feather";
import { MdOutlineDiscount } from "react-icons/md";

export default [
  {
    id: "Offer",
    title: "تخفیف ها",
    icon: <MdOutlineDiscount size={20} />,
    children: [
      {
        id: "allOffer",
        title: "لیست تخفیف ها",
        icon: <Circle size={12} />,
        navLink: "/offer/all",
      },
      {
        id: "newOffer",
        title: "ایجاد تخفیف جدید",
        icon: <Circle size={12} />,
        navLink: "/offer/new",
      },
      {
        id: "assignOffer",
        title: "تخصیص تخفیف",
        icon: <Circle size={12} />,
        navLink: "/offer/assign",
      },
    ],
  },
];
