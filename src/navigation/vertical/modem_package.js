// ** Icons Import
import { Circle } from "react-feather";
import { IoWifi } from "react-icons/io5";

export default [
  {
    id: "ModemPackages",
    title: "بسته های مودم",
    icon: <IoWifi size={20} />,
    children: [
      {
        id: "allModemPackages",
        title: "لیست بسته های مودم",
        icon: <Circle size={12} />,
        navLink: "/modem_package/all",
      },
      {
        id: "searchModemPackage",
        title: "ایجاد بسته مودم جدید",
        icon: <Circle size={12} />,
        navLink: "/modem_package/new",
      },
    ],
  },
];
