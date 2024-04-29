import moment from "jalali-moment";
import ActionButton from "../components/action_button";
import formatHelper from "../../../../helper/format_helper";

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
    name: "نام و نام خانوادگی",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.appUser.lastName,
    cell: (row) => {
      return row.appUser.firstName + " " + row.appUser.lastName;
    },
  },
  {
    name: "نوع تراکنش",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.typeTransaction,
    cell: (row) => {
      if (row?.typeTransaction) {
        return row.typeTransaction;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "واریز",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.credit,
    cell: (row) => {
      if (row?.credit) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row.credit)
          ) + " تومان"
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "برداشت",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.debt,
    cell: (row) => {
      if (row?.debt) {
        return (
          formatHelper.toPersianString(formatHelper.numberSeperator(row.debt)) +
          " تومان"
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تاریخ و زمان تراکنش",
    minWidth: "155px",
    sortable: true,
    selector: (row) => row.dateTimeTransaction,
    cell: (row) => {
      if (row.dateTimeTransaction) {
        return (
          <span style={{ direction: "ltr" }}>
            {formatHelper.toPersianString(
              moment(row.dateTimeTransaction)
                .locale("fa")
                .format("YYYY/MM/DD HH:mm:ss")
            )}
          </span>
        );
      } else {
        return "-----";
      }
    },
  },

  {
    name: "عملیات",
    minWidth: "100px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
