import ActiveButton from "../components/active_button";
import ActionButton from "../components/action_button";
import formatHelper from "../../../../helper/format_helper";
import moment from "jalali-moment";

export const columns = [
  {
    name: "ردیف",
    minWidth: "80px",
    maxWidth: "80px",
    sortable: true,
    selector: (row) => row.index,
    cell: (row) => {
      return formatHelper.toPersianString(row.index);
    },
  },
  {
    name: "عنوان پیامک",
    minWidth: "200px",
    maxWidth: "200px",
    sortable: true,
    selector: (row) => row.title,
  },
  {
    name: "متن پیامک",
    minWidth: "400px",
    maxWidth: "400px",
    sortable: true,
    selector: (row) => row.contextBody,
  },
  {
    name: "تاریخ آخرین ویرایش",
    minWidth: "155px",
    maxWidth: "155px",
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
    maxWidth: "150px",
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
    maxWidth: "80px",
    sortable: true,
    selector: (row) => row.isActive,
    cell: (row) => {
      return <ActiveButton row={row} />;
    },
  },
  {
    name: "عملیات",
    minWidth: "120px",
    maxWidth: "120px",
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
