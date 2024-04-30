import moment from "jalali-moment";
import ActionButton from "../components/action_button";
import formatHelper from "../../../../helper/format_helper";
import { AiOutlineCopy } from "react-icons/all";
import toast from "react-hot-toast";

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
    name: "نام تخفیف",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.offerName,
  },
  {
    name: "کد تخفیف",
    minWidth: "160px",
    sortable: true,
    selector: (row) => row.offerCode,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          {formatHelper.toPersianString(row.offerCode)}
          <span
            style={{
              marginRight: 8,
              cursor: "pointer",
            }}
            onClick={() => {
              if (row?.offerCode) {
                navigator.clipboard.writeText(row.offerCode);
                toast.success("شماره تماس با موفقیت کپی شد");
              }
            }}
          >
            <AiOutlineCopy fontSize={16} />
          </span>
        </div>
      );
    },
  },
  {
    name: "مبلغ",
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
    name: "درصد",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.percent,
    cell: (row) => {
      if (row.percent) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row.percent)
          ) + " %"
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "اپراتور",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.operator.name,
  },
  {
    name: "تاریخ شروع",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.startDate,
    cell: (row) => {
      if (row.startDate) {
        return (
          <span style={{ direction: "ltr" }}>
            {formatHelper.toPersianString(
              moment(row.startDate).locale("fa").format("YYYY/MM/DD")
            )}
          </span>
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تاریخ پایان",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.endDate,
    cell: (row) => {
      if (row.endDate) {
        return (
          <span style={{ direction: "ltr" }}>
            {formatHelper.toPersianString(
              moment(row.endDate).locale("fa").format("YYYY/MM/DD")
            )}
          </span>
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
    minWidth: "180px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
