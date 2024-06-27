import React from "react";
import cls from "./style.module.scss"
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

export default function index({ 
    control,
    name = "",
    disabledHelperText = false,
    required = false,
    minLength = 12, // Example minimum length
    rules = {},
    ...props
}) {


  return (
    <div className={cls.inputBox}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          required: required ? "Неправильный номер телефона" : false,
        //   ...rules,
        validate: {
            minLength: (value) =>
              value.replace(/[^\d]/g, "").length >= minLength ||
              `Пожалуйста, заполните поле телефона`,
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <div>
            <InputMask
              id={name}
              type="tel"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              name={name}
              className={`${cls.phoneInput} ${error && cls.errorInput}`}
              mask="+\9\9\8999999999"
              maskChar=""
              placeholder="+998 99 999 99 99"
              autoComplete="off"
              {...props}
            />
            {!disabledHelperText && (
              <p className={cls.errorText}>{error?.message ?? " "}</p>
            )}
            </div>
          </>
        )}
      />
    </div>
  );
}
