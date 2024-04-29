// ** Icons Import
import { Circle } from "react-feather";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export default [
  {
    id: "products",
    title: "محصولات",
    icon: <MdOutlineProductionQuantityLimits size={20} />,
    children: [
      {
        id: "allProducts",
        title: "لیست محصولات",
        icon: <Circle size={12} />,
        navLink: "/product/all",
      },
      {
        id: "newProvider",
        title: "ایجاد محصول جدید",
        icon: <Circle size={12} />,
        navLink: "/product/new",
      },
    ],
  },
];
