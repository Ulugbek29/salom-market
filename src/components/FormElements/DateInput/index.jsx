import React from "react";
import cls from "./style.module.scss";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { TextField } from "@mui/material";

const DateInput = ({
  control,
  required,
  name,
  rules = {},
  disabledHelperText = false,
  ...props
}) => {
  return (
      <div className={cls.wrapper}>
      {/* <label htmlFor="date_input">
        Date
      </label> */}
        <Controller
          control={control}
          name={name}
          defaultValue=""
          rules={{
            required: required ? "This is required field" : false,
            ...rules,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputMask
              id="date_input"
              mask="99/99"
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
            >
              {(inputProps) => (
                <TextField
                  size="small"
                  {...inputProps}
                  {...props}
                  name={name}
                  error={!!error}
                  helperText={
                    !disabledHelperText && (error ? error.message : " ")
                  }
                  placeholder="MM/YY"
                />
              )}
            </InputMask>
          )}
        />
    </div>
  );
};

export default DateInput;
