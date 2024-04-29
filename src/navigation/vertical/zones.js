// ** Icons Import
import { Circle } from "react-feather";
import { CiMap } from "react-icons/ci";

export default [
  {
    id: "zones",
    title: "مناطق تحت پوشش",
    icon: <CiMap size={20} />,
    children: [
      {
        id: "allZones",
        title: "لیست مناطق",
        icon: <Circle size={12} />,
        navLink: "/zones/all",
      },
      {
        id: "createZone",
        title: "ایجاد منطقه جدید",
        icon: <Circle size={12} />,
        navLink: "/zones/new",
      },
    ],
  },
];
