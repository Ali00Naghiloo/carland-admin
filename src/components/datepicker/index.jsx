import "./datepicker.scss";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { AiOutlineCalendar } from "react-icons/all";
import { IoClose } from "react-icons/io5";
import { useSkin } from "@hooks/useSkin";

const CustomDatePicker = ({
  inputClassName,
  minimumDate,
  maximumDate,
  onClear,
  value,
  range,
  ...props
}) => {
  const { skin } = useSkin();

  return (
    <div className="custom_datepicker_wrapper">
      <DatePicker
        value={value}
        colorPrimary="#0a83cf"
        colorPrimaryLight="#0a83cf0f"
        inputClassName={`${inputClassName}
          ${skin === "light" ? "custom_datepicker" : "custom_datepicker_dark"}
        `}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        locale={"fa"}
        calendarClassName="responsive-calendar"
        {...props}
      />
      {!range && value && onClear ? (
        <IoClose
          onClick={onClear}
          style={{ marginLeft: 32, cursor: "pointer" }}
          fontSize={20}
        />
      ) : null}
      {(range && onClear && value?.from) || value?.to ? (
        <IoClose
          onClick={onClear}
          style={{ marginLeft: 32, cursor: "pointer" }}
          fontSize={20}
        />
      ) : null}
      <AiOutlineCalendar fontSize={20} />
    </div>
  );
};
export default CustomDatePicker;
