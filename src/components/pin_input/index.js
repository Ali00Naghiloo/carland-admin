import PinInput from "react-pin-input";
import "./styles/pin_input.scss";

const PinCodeInput = ({ error, disabled, ...props }) => {
  return (
    <PinInput
      length={6}
      initialValue=""
      disabled={disabled}
      inputStyle={
        error
          ? { border: "1px solid red" }
          : { border: "1px solid rgb(223, 223, 223)" }
      }
      type="numeric"
      inputMode="tel"
      focus={true}
      style={{ direction: "ltr" }}
      // autoSelect={true}
      regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      {...props}
    />
  );
};
export default PinCodeInput;
