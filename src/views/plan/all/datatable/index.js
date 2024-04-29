import moment from "jalali-moment";
import ActionButton from "../components/action_button";
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
    name: "نام طرح",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "تصویر",
    minWidth: "70px",
    sortable: false,
    selector: (row) => row.image,
    cell: (row) => {
      if (row.image) {
        return (
          <img
            src={process.env.REACT_APP_BASE_URL + row.image}
            alt="تصویر"
            style={{ width: 35, height: 35, borderRadius: 10 }}
          />
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "خلاصه طرح",
    minWidth: "200px",
    sortable: true,
    selector: (row) => row.summray,
  },
  {
    name: "نام دسته بندی",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.category.name,
    cell: (row) => {
      if (row?.category?.name) {
        return row.category.name;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "نام اپراتور",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.oprator.name,
    cell: (row) => {
      if (row?.oprator?.name) {
        return row.oprator.name;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تعداد ستاره ها",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.countStar,
  },
  {
    name: "توضیحات طرح",
    minWidth: "250px",
    sortable: true,
    selector: (row) => row.description,
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
    minWidth: "180px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
