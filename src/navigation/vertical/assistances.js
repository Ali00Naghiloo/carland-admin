// ** Icons Import
import { Circle } from "react-feather";
import { FiUsers } from "react-icons/fi";

export default [
  {
    id: "assistances",
    title: "لیست تعمیرکاران در محل",
    icon: <FiUsers size={20} />,
    children: [
      {
        id: "allAssistances",
        title: "لیست تعمیر کاران",
        icon: <Circle size={12} />,
        navLink: "/assistance/all",
      },
      {
        id: "createAssistance",
        title: "ایجاد تعمیر کار جدید",
        icon: <Circle size={12} />,
        navLink: "/assistance/new",
      },
    ],
  },
];
