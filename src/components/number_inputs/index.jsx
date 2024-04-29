import { useState } from "react";
import { Input, Button } from "reactstrap";
import "./number_inputs.scss";
import toast from "react-hot-toast";
import formatHelper from "../../helper/format_helper";
import { FiTrash } from "react-icons/all";

const NumberInputs = ({
  numbers,
  setNumbers,
  inputType,
  loading,
  ...props
}) => {
  const [value, setValue] = useState("");

  const addNumberHandler = () => {
    let array = [...numbers];
    if (inputType === "mobile") {
      if (value.length !== 11) {
        toast.error("شماره موبایل باید ۱۱ رقم باشد");
      } else if (numbers.includes(value)) {
        toast.error("این شماره قبلا وارد شده است");
      } else {
        array.push(value);
        setNumbers(array);
        setValue("");
      }
    } else if (inputType === "phone") {
      if (value.length === 0) {
        toast.error("لطفا شماره تلفن ثابت خود را وارد کنید");
      } else if (numbers.includes(value)) {
        toast.error("این شماره قبلا وارد شده است");
      } else {
        array.push(value);
        setNumbers(array);
        setValue("");
      }
    }
  };

  const handleRemoveNumber = (index) => {
    setNumbers(numbers.filter((item) => item !== index));
  };

  return (
    <div className="number_inputs_component">
      <Input
        disabled={loading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="tel"
        {...props}
      />
      <Button
        disabled={loading}
        onClick={addNumberHandler}
        type="button"
        color="primary"
      >
        افزودن
      </Button>
      {numbers?.length > 0 ? (
        <div>
          {numbers?.map((num, index) => (
            <div key={index}>
              <div>{formatHelper.toPersianString(index + 1)} -</div>
              <div>{formatHelper.toPersianString(num)}</div>
              <div
                onClick={() => {
                  if (!loading) {
                    handleRemoveNumber(num);
                  }
                }}
              >
                <FiTrash color={loading ? "gray" : "#0a83cf"} fontSize={22} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default NumberInputs;
