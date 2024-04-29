import moment from "jalali-moment";
import ActionButton from "../components/action_button";
import ActiveButton from "../components/active_button";
import formatHelper from "../../../../helper/format_helper";
import { MonthData } from "../../../../utility/data/month";

export const columns = [
  {
    name: "ردیف",
    minWidth: "80px",
    sortable: true,
    selector: (row) => row.index,
    cell: (row) => {
      if (row.index) {
        return formatHelper.toPersianString(row.index);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "نام ماه",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.monthnumber,
    cell: (row) => {
      if (row.monthnumber) {
        const monthName = MonthData.find(
          (item) => item.value == row.monthnumber
        );
        return monthName.label;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "زمان شروع",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.satrtTime,
    cell: (row) => {
      if (row?.satrtTime) {
        return formatHelper.toPersianString(row?.satrtTime);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "زمان پایان",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.endTime,
    cell: (row) => {
      if (row?.endTime) {
        return formatHelper.toPersianString(row?.endTime);
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
    name: "فعال",
    minWidth: "80px",
    sortable: true,
    selector: (row) => row.isActive,
    cell: (row) => {
      return (
        <>
          <ActiveButton row={row} />
        </>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "180px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
