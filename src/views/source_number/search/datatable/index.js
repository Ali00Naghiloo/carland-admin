import formatHelper from "../../../../helper/format_helper";
import { AiOutlineCopy } from "react-icons/all";
import toast from "react-hot-toast";
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
    name: "شماره تلفن",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.number,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          {formatHelper.toPersianString(row.number)}
          <span
            style={{
              marginRight: 8,
              cursor: "pointer",
            }}
            onClick={() => {
              if (row?.number) {
                navigator.clipboard.writeText(row.number);
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
    name: "فرمت نمایش",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.labelShowNumber,
    cell: (row) => {
      return formatHelper.toPersianString(row.labelShowNumber);
    },
  },
  {
    name: "اپراتور",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.operator.name,
    cell: (row) => {
      return row?.operator?.name;
    },
  },
  {
    name: "نوع سیمکارت",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.typeNumber.name,
    cell: (row) => {
      return row?.typeNumber?.name;
    },
  },
  {
    name: "برچسب سیمکارت",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.labelNumber.name,
    cell: (row) => {
      return row?.labelNumber?.name;
    },
  },
  {
    name: "طرح",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.plan.name,
    cell: (row) => {
      return row?.plan?.name;
    },
  },
  {
    name: "دسته بندی",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.category.name,
    cell: (row) => {
      return row?.category?.name;
    },
  },
  {
    name: "قیمت",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.price,
    cell: (row) => {
      if (row?.price) {
        return (
          formatHelper.toPersianString(
            formatHelper.numberSeperator(row?.price)
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
    name: "فعال",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.active,
    cell: (row) => {
      if (row.active === true) {
        return (
          <div
            className="bg-success"
            style={{ padding: "4px 15px", color: "white", borderRadius: 10 }}
          >
            فعال
          </div>
        );
      } else {
        return (
          <div
            className="bg-danger"
            style={{ padding: "4px 15px", color: "white", borderRadius: 10 }}
          >
            غیرفعال
          </div>
        );
      }
    },
  },
];
