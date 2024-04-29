import ActiveButton from "../components/active_button";
import ActionButton from "../components/action_button";
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
    name: "نام اسلایدر",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "لینک اسلایدر",
    minWidth: "170px",
    sortable: true,
    selector: (row) => row.link,
  },
  {
    name: "تصویر دسکتاپ",
    minWidth: "110px",
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
    name: "تصویر موبایل",
    minWidth: "100px",
    sortable: false,
    selector: (row) => row.mobileImage,
    cell: (row) => {
      if (row.mobileImage) {
        return (
          <img
            src={process.env.REACT_APP_BASE_URL + row.mobileImage}
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
      return <ActiveButton row={row} />;
    },
  },
  {
    name: "عملیات",
    minWidth: "180px",
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
