import cls from "./style.module.scss"
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

const index = ({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  ...props
}) => {
  return (
    <div className={cls.wrapper}>
      <label htmlFor="card_input">Card Number</label>
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
            id="card_input"
            mask="9999 9999 9999 9999"
            placeholder="#### #### #### ####"
            value={value ?? undefined}
            onChange={(e) => onChange(e.target.value)}
          >
            {(inputProps) => (
              <TextField
                size="small"
                name={name}
                error={error}
                helperText={!disabledHelperText && (error?.message ?? " ")}
                {...inputProps}
                {...props}
              />
            )}
          </InputMask>
        )}
      ></Controller>
    </div>
  );
};

export default index;
