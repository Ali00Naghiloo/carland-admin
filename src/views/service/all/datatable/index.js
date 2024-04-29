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
      if (row.index) {
        return formatHelper.toPersianString(row.index);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "نام خدمت",
    minWidth: "180px",
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "اپراتور",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.opratorTable.name,
    cell: (row) => {
      if (row?.opratorTable?.name) {
        return formatHelper.toPersianString(row?.opratorTable?.name);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "دسته بندی",
    minWidth: "110px",
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
    name: "قیمت اعتباری",
    minWidth: "160px",
    sortable: true,
    selector: (row) => row.creditPrice,
    cell: (row) => {
      if (row?.creditPrice) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row.creditPrice)
          ) + " تومان"
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "قیمت دائمی",
    minWidth: "160px",
    sortable: true,
    selector: (row) => row.fixedPrice,
    cell: (row) => {
      if (row?.fixedPrice) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row.fixedPrice)
          ) + " تومان"
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تخفیف",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.offer.offerName,
    cell: (row) => {
      if (row?.offer?.offerName) {
        return row.offer.offerName;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "امتیاز",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.score,
    cell: (row) => {
      if (row?.score) {
        return formatHelper.toPersianString(row.score);
      } else {
        return "-----";
      }
    },
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
            style={{
              width: 35,
              height: 35,
              borderRadius: 10,
              objectFit: "cover",
            }}
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
    minWidth: "320px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
