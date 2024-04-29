import moment from "jalali-moment";
import ActionButton from "../components/action_button";
import formatHelper from "../../../../../helper/format_helper";
import { formatBytes } from "../../../../../helper/format_unit";
import {
  PACKET_TIME_DATA,
  TYPE_INTERNET_DATA,
} from "../../../../../utility/data/modem_package";

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
    name: "سریال سیمکارت",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.serial,
    cell: (row) => {
      if (row.serial) {
        return formatHelper.toPersianString(row.serial);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "شماره تلفن",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row?.sorceNumber?.number,
    cell: (row) => {
      if (row?.sorceNumber?.number) {
        return formatHelper.toPersianString(row.sorceNumber.number);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "اپراتور",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.operator.name,
    cell: (row) => {
      if (row?.operator?.name) {
        return row.operator.name;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "قیمت",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.price,
    cell: (row) => {
      if (row.price) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row.price)
          ) + " تومان"
        );
      } else {
        return "-----";
      }
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
    name: "تاریخ آخرین ویرایش",
    minWidth: "155px",
    sortable: true,
    selector: (row) => row.updateDate,
    cell: (row) => {
      if (row.updateDate) {
        return (
          <span style={{ direction: "ltr" }}>
            {formatHelper.toPersianString(
              moment(row.updateDate).locale("fa").format("YYYY/MM/DD HH:mm:ss")
            )}
          </span>
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "کاربر ویرایش کننده",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.userNameUpdate,
    cell: (row) => {
      if (row.userNameUpdate) {
        return row.userNameUpdate;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "عملیات",
    minWidth: "270px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
