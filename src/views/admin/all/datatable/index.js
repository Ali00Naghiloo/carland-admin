import formatHelper from "../../../../helper/format_helper";
import ActionButton from "../components/action_button";
import ActiveButton from "../components/active_button";
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
    name: "نام و نام خانوادگی",
    minWidth: "170px",
    sortable: true,
    selector: (row) => row.family,
    cell: (row) => {
      if (row.name || row.family) {
        return row.name + " " + row.family;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "نقش",
    minWidth: "100px",
    sortable: true,
    selector: (row) => row.roleName,
    cell: (row) => {
      if (row.roleName) {
        return row.roleName;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "شماره موبایل",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.phoneNumber,
    cell: (row) => {
      if (row.phoneNumber) {
        return (
          <div className="d-flex align-items-center">
            {formatHelper.toPersianString(row.phoneNumber)}
            <span
              style={{
                marginRight: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                if (row?.phoneNumber) {
                  navigator.clipboard.writeText(row.phoneNumber);
                  toast.success("شماره موبایل با موفقیت کپی شد");
                }
              }}
            >
              <AiOutlineCopy fontSize={16} />
            </span>
          </div>
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "ایمیل",
    minWidth: "250px",
    sortable: true,
    selector: (row) => row.email,
    cell: (row) => {
      if (row.email) {
        return formatHelper.toPersianString(row.email);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تصویر",
    minWidth: "110px",
    sortable: false,
    selector: (row) => row.avatar,
    cell: (row) => {
      if (row.avatar) {
        return (
          <img
            src={process.env.REACT_APP_BASE_URL + row.avatar}
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
    selector: (row) => row.isActive,
    cell: (row) => {
      return <ActiveButton row={row} />;
    },
  },
  {
    name: "عملیات",
    minWidth: "200px",
    selector: (row) => <ActionButton row={row} />,
  },
];
