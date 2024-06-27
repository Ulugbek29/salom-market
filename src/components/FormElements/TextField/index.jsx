import { TextField, FormHelperText, styled } from "@mui/material";
import { Controller } from "react-hook-form";


const styleInput = {
  padding: "0.4rem 1rem 0.4rem 0",
  boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
};

const HFTextField = ({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  inputStyle,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "Данное поле является обязательным к заполнению" : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextField
            size="small"
            value={value}
            fullWidth
            onChange={(e) => onChange(e.target.value)}
            name={name}
            error={error}
            color="primary"
            InputProps={{
              style: {...styleInput, ...inputStyle},
            }}
            autoComplete='no'
            // helperText={!disabledHelperText && (error?.message ?? ' ')}
            {...props}
          />
          {!disabledHelperText && (
            <FormHelperText error>{error?.message ?? " "}</FormHelperText>
          )}
        </>
      )}
    ></Controller>
  );
};

export default HFTextField;
