import cls from "./style.module.scss"
import React from 'react';
import InputMask from 'react-input-mask';

function index({ optInput, setOptInput, error, ...props }) {
  return (
    <InputMask
      type=""
      value={optInput}
      onChange={(e) => setOptInput(e.target.value)}
      className={`${cls.phoneInput} ${error && cls.errorInput}`}
      mask="9999"
      maskChar=""
      placeholder="code..."
      autoComplete="off"
      {...props}
    />
  );
}

export default index;
