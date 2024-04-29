// ** Icons Import
import { Circle } from "react-feather";
import { TbTruckDelivery } from "react-icons/tb";

export default [
  {
    id: "services",
    title: "خدمات",
    icon: <TbTruckDelivery size={20} />,
    children: [
      {
        id: "allService",
        title: "لیست خدمات",
        icon: <Circle size={12} />,
        navLink: "/service/all",
      },
      {
        id: "newService",
        title: "ایجاد خدمت جدید",
        icon: <Circle size={12} />,
        navLink: "/service/new",
      },
    ],
  },
];
