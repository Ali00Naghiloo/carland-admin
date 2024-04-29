import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import formatHelper from "../../helper/format_helper";

const InputSeperator = ({
  defaultValue,
  value,
  setValue,
  placeHolder,
  style,
  className,
  disabled,
  clearValue,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");

  function ToRial(str) {
    str = str.replace(/\,/g, "");
    var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");

    while (objRegex.test(str)) {
      str = str.replace(objRegex, "$1,$2");
    }

    return str;
  }

  const handleChange = (e) => {
    let text = formatHelper.toEnglishString(e.target.value.split(",").join(""));
    let regex = /^[0-9]+$|^[۰-۹]$/;
    console.log(e.target.value);
    if (text.length > 0 && regex.test(text) == true) {
      setInputValue(ToRial(formatHelper.toEnglishString(e.target.value)));
      console.log("1");
    } else if (text.length === 0) {
      setInputValue(ToRial(formatHelper.toEnglishString(e.target.value)));
      console.log("2");
    } else {
      console.log("3");
    }
  };

  useEffect(() => {
    setValue(formatHelper.toEnglishString(inputValue.split(",").join("")));
  }, [inputValue]);

  useEffect(() => {
    if (defaultValue) {
      setInputValue(ToRial(formatHelper.toEnglishString(defaultValue)));
      setValue(formatHelper.toEnglishString(defaultValue.split(",").join("")));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (clearValue && value.length === 0) {
      setInputValue("");
    }
  }, [value]);

  return (
    <Input
      className={className}
      disabled={disabled}
      onChange={handleChange}
      value={inputValue}
      lang="en"
      inputMode="tel"
      style={style}
      placeholder={placeHolder}
      {...props}
    />
  );
};

export default InputSeperator;
