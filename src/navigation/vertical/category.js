// ** Icons Import
import { Circle } from "react-feather";
import { TbCategory } from "react-icons/tb";

export default [
  {
    id: "categories",
    title: "دسته بندی ها",
    icon: <TbCategory size={20} />,
    children: [
      {
        id: "allProviders",
        title: "لیست دسته بندی ها",
        icon: <Circle size={12} />,
        navLink: "/category/all",
      },
      {
        id: "newProvider",
        title: "ایجاد دسته بندی جدید",
        icon: <Circle size={12} />,
        navLink: "/category/new",
      },
    ],
  },
];
