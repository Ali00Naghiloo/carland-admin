// ** Icons Import
import { Home, Circle } from "react-feather";
import { BiStoreAlt } from "react-icons/bi";

export default [
  {
    id: "providers",
    title: "نمایندگی ها",
    icon: <BiStoreAlt size={20} />,
    children: [
      {
        id: "allProviders",
        title: "لیست نمایندگی ها",
        icon: <Circle size={12} />,
        navLink: "/providers/all",
      },
      {
        id: "newProvider",
        title: "ایجاد نماینده جدید",
        icon: <Circle size={12} />,
        navLink: "/providers/new",
      },
    ],
  },
];
