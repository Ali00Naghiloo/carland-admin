// ** Icons Import
import { Circle } from "react-feather";
import { FiUsers } from "react-icons/fi";

export default [
  {
    id: "tickets",
    title: "تیکت ها",
    icon: <FiUsers size={20} />,
    children: [
      {
        id: "allTickets",
        title: "لیست تیکت ها",
        icon: <Circle size={12} />,
        navLink: "/ticket/all",
      },
      {
        id: "createTicket",
        title: "ایجاد تیکت جدید",
        icon: <Circle size={12} />,
        navLink: "/ticket/new",
      },
    ],
  },
];
