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
    name: "نام محصول",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "تعداد در سایت",
    minWidth: "125px",
    sortable: true,
    selector: (row) => row.stockSite,
    cell: (row) => {
      if (row?.stockSite) {
        return formatHelper.toPersianString(row.stockSite);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تعداد برای نمایندگان",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.stockAgent,
    cell: (row) => {
      if (row.stockAgent) {
        return formatHelper.toPersianString(row.stockAgent);
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
    name: "قیمت برای نمایندگان",
    minWidth: "160px",
    sortable: true,
    selector: (row) => row.priceseller,
    cell: (row) => {
      if (row?.priceseller) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row.priceseller)
          ) + " تومان"
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "قیمت فروش",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.priceBuy,
    cell: (row) => {
      if (row?.priceBuy) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row.priceBuy)
          ) + " تومان"
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "نام برند محصول",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.brand,
    cell: (row) => {
      if (row?.brand) {
        return formatHelper.toPersianString(row.brand);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "سریال محصول",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.serial,
    cell: (row) => {
      if (row?.serial) {
        return formatHelper.toPersianString(row.serial);
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
    minWidth: "320px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
