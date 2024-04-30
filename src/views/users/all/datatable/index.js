import formatHelper from "../../../../helper/format_helper";
import ActionButton from "../components/action_button";
import { AiOutlineCopy } from "react-icons/all";
import toast from "react-hot-toast";
import moment from "jalali-moment";
import { imageUrl } from "../../../../hooks/use_http";

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
    name: "پروفایل",
    minWidth: "100px",
    sortable: false,
    selector: (row) => row.image_profile,
    cell: (row) => {
      if (row.image_profile) {
        return (
          <img
            src={imageUrl + row.profile}
            alt="پروفایل"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        );
      } else {
        return "-";
      }
    },
  },
  {
    name: "نام",
    minWidth: "170px",
    sortable: true,
    selector: (row) => row.name,
    cell: (row) => {
      if (row.name) {
        return row.name;
      } else {
        return "-----";
      }
    },
  },

  {
    name: "نام کاربری",
    minWidth: "170px",
    sortable: true,
    selector: (row) => row.username,
    cell: (row) => {
      if (row.username) {
        return row.username;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "شهر",
    minWidth: "170px",
    sortable: true,
    selector: (row) => row.city,
    cell: (row) => {
      if (row.city) {
        return row.city;
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
      if (row.phone) {
        return (
          <div className="d-flex align-items-center">
            {formatHelper.toPersianString(row.phone)}
            <span
              style={{
                marginRight: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                if (row?.phone) {
                  navigator.clipboard.writeText(row.phone);
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
    selector: (row) => row.NationalCode,
    cell: (row) => {
      if (row.NationalCode) {
        return (
          <div className="d-flex align-items-center">
            {formatHelper.toPersianString(row.NationalCode)}
            <span
              style={{
                marginRight: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                if (row?.NationalCode) {
                  navigator.clipboard.writeText(row.NationalCode);
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
    name: "موجودی",
    minWidth: "110px",
    sortable: true,
    selector: (row) => row.cash,
    cell: (row) => {
      if (row.cash) {
        return formatHelper.toPersianString(row.cash);
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تاریخ ایجاد",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.created_at,
    cell: (row) => {
      if (row.created_at) {
        return (
          <span style={{ direction: "ltr" }}>
            {
              formatHelper
                .toPersianString(
                  moment(row.created_at)
                    .locale("fa")
                    .format("YYYY/MM/DD HH:mm:ss")
                )
                .split(" ")[0]
            }
          </span>
        );
      } else {
        return "-----";
      }
    },
  },
  {
    name: "جنسیت",
    minWidth: "90px",
    sortable: true,
    selector: (row) => row.Gender,
    cell: (row) => {
      if (row.Gender) {
        return row.Gender;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "تاریخ آخرین ویرایش",
    minWidth: "155px",
    sortable: true,
    selector: (row) => row.updated_at,
    cell: (row) => {
      if (row.updated_at) {
        return (
          <span style={{ direction: "ltr" }}>
            {formatHelper.toPersianString(
              moment(row.updated_at)
                .locale("fa")
                .format("YYYY/MM/DD HH:mm:ss")
                .split(" ")[0]
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
    minWidth: "200px",
    selector: (row) => <ActionButton row={row} />,
  },
];
