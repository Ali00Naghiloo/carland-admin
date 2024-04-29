import moment from "jalali-moment";
import ActionButton from "../components/action_button";
import formatHelper from "../../../../helper/format_helper";
import { AiOutlineCopy } from "react-icons/ai";
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
    name: "نام و نام خانوادگی",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.appUser.lastName,
    cell: (row) => {
      return row.appUser.firstName + " " + row.appUser.lastName;
    },
  },
  {
    name: "نقش",
    minWidth: "120px",
    sortable: true,
    selector: (row) => row.appUser.role.name,
    cell: (row) => {
      if (row?.appUser?.role?.name) {
        return row.appUser.role.name;
      } else {
        return "-----";
      }
    },
  },
  {
    name: "شماره موبایل",
    minWidth: "140px",
    sortable: true,
    selector: (row) => row.appUser.phoneNumber,
    cell: (row) => {
      if (row?.appUser?.phoneNumber) {
        return (
          <div className="d-flex align-items-center">
            {formatHelper.toPersianString(row.appUser.phoneNumber)}
            <span
              style={{
                marginRight: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                if (row?.appUser.phoneNumber) {
                  navigator.clipboard.writeText(row.appUser.phoneNumber);
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
    name: "مجموع کمیسیون",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.sumCommission,
    cell: (row) => {
      if (row?.sumCommission) {
        return formatHelper.toPersianString(row.sumCommission) + " تومان";
      } else {
        return "۰ تومان";
      }
    },
  },
  {
    name: "موجودی کیف پول",
    minWidth: "150px",
    sortable: true,
    selector: (row) => row.sumWallet,
    cell: (row) => {
      if (row?.sumWallet) {
        return formatHelper.toPersianString(row.sumWallet) + " تومان";
      } else {
        return "۰ تومان";
      }
    },
  },
  {
    name: "عملیات",
    minWidth: "100px",
    sortable: false,
    selector: (row) => row.id,
    cell: (row) => {
      return <ActionButton row={row} />;
    },
  },
];
