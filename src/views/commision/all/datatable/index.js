import moment from "jalali-moment";
import ActionButton from "../components/action_button";
import ActiveButton from "../components/active_button";
import formatHelper from "../../../../helper/format_helper";

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
    name: "گرید",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.grade.name,
    cell: (row) => {
      if (row?.grade?.name) {
        return formatHelper.toPersianString(row.grade.name);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "اپراتور",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.operator.name,
    cell: (row) => {
      if (row?.operator?.name) {
        return formatHelper.toPersianString(row.operator.name);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "محصول",
    minWidth: "180px",
    sortable: true,
    selector: (row) => row.product.name,
    cell: (row) => {
      if (row?.product?.name) {
        return formatHelper.toPersianString(row.product.name);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "خدمت",
    minWidth: "180px",
    sortable: true,
    selector: (row) => row.service.name,
    cell: (row) => {
      if (row?.service?.name) {
        return formatHelper.toPersianString(row.service.name);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "مبلغ",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.price,
    cell: (row) => {
      if (row.price) {
        return formatHelper.toPersianString(
          formatHelper.numberSeperator(row.price) + " تومان"
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
    name: "فعال",
    minWidth: "80px",
    sortable: true,
    selector: (row) => row.active,
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
