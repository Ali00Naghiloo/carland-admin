import formatHelper from "../../../../helper/format_helper";
import ActionButton from "../components/action_button";
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
    selector: (row) => row.lastName,
    cell: (row) => {
      if (row.firstName || row.lastName) {
        return row.firstName + " " + row.lastName;
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
    name: "کد ملی",
    minWidth: "130px",
    sortable: true,
    selector: (row) => row.nationalCode,
    cell: (row) => {
      if (row.nationalCode) {
        return (
          <div className="d-flex align-items-center">
            {formatHelper.toPersianString(row.nationalCode)}
            <span
              style={{
                marginRight: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                if (row?.nationalCode) {
                  navigator.clipboard.writeText(row.nationalCode);
                  toast.success("کد ملی با موفقیت کپی شد");
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
    name: "تاریخ تولد",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.birthDate,
    cell: (row) => {
      if (row.birthDate) {
        return formatHelper.toPersianString(row.birthDate);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "نام پدر",
    minWidth: "100px",
    sortable: true,
    selector: (row) => row.fatherName,
    cell: (row) => {
      if (row.fatherName) {
        return row.fatherName;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "جنسیت",
    minWidth: "90px",
    sortable: true,
    selector: (row) => row.gender,
    cell: (row) => {
      if (row.gender) {
        return row.gender;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "ملیت",
    minWidth: "100px",
    sortable: true,
    selector: (row) => row.nationality.nationalityName,
    cell: (row) => {
      if (row?.nationality?.nationalityName) {
        return row.nationality.nationalityName;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "نقش",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.role.name,
    cell: (row) => {
      if (row?.role?.name) {
        return row?.role?.name;
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
    minWidth: "200px",
    selector: (row) => <ActionButton row={row} />,
  },
];
