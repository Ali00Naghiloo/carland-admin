import ActionButton from "../components/action_button";
import ActiveButton from "../components/active_button";
import formatHelper from "../../../../helper/format_helper";
import moment from "jalali-moment";

export const columns = [
  {
    name: "ردیف",
    minWidth: "80px",
    sortable: true,
    selector: (row) => row.index,
    cell: (row) => {
      return formatHelper.toPersianString(row.index);
    },
  },
  {
    name: "نام اپراتور",
    minWidth: "70px",
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "تعداد ارقام سریال سیمکارت",
    minWidth: "185px",
    sortable: true,
    selector: (row) => row.digit,
    cell: (row) => {
      return formatHelper.toPersianString(row.digit);
    },
  },
  {
    name: "تاریخ ایجاد",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.createDate,
    cell: (row) => {
      if (row.createDate) {
        return (
          <span style={{ direction: "ltr" }}>
            {formatHelper.toPersianString(
              moment(row.createDate).locale("fa").format("YYYY/MM/DD HH:mm:ss")
            )}
          </span>
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "کاربر ایجاد کننده",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.userName,
    cell: (row) => {
      if (row.userName) {
        return row.userName;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "وضعیت",
    minWidth: "70px",
    sortable: true,
    selector: (row) => row.active,
    cell: (row) => {
      return <ActiveButton row={row} />;
    },
  },
  {
    name: "عملیات",
    minWidth: "200px",
    selector: (row) => <ActionButton row={row} />,
  },
];
