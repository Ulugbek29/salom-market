import React, { useState } from "react";
import cls from "./style.module.scss";
import OtpInput from "react-otp-input";

function index({optInput, setOptInput}) {
  return (
    <OtpInput
      value={optInput}
      onChange={setOptInput}
      numInputs={4}
      inputType="number"
      shouldAutoFocus={true}
      renderSeparator={<span></span>}
      inputStyle={{
        border: "1px solid transparent",
        borderColor: "#B2B2B2",
        borderRadius: "8px",
        width: "40px",
        height: "40px",
        fontSize: "14px",
        color: "#000",
        fontWeight: "600",
        caretColor: "#1a5d1a",
      }}
      focusStyle={{
        border: "1px solid #CFD3DB",
        outline: "none",
      }}
      renderInput={({ value, onChange, ...props }) => (
        <input value={value} onChange={onChange} {...props} />
      )}
    />
  );
}

export default index;
