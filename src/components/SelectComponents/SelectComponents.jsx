import cls from "./style.module.scss"
import React from 'react';
import { Controller } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function SelectComponents({ control, name, columns, options }) {
  return (
    <Controller
      name={name} // Name of the field
      control={control}
      defaultValue={options[0]?.value} // Default value
      render={({ field: { onChange, value } }) => {
       
       console.log("value===>",value)

       return <div className={`${cls.selector}  ${cls[columns]}`}>
          {options.map((option) => (
            <label
              key={option.value}
              htmlFor={option.value}
              className={`${cls.label} ${value === option.value && cls.active}`}
            >
              <input
                className="hidden"
                type="radio"
                name={name}
                id={option.value}
                value={option.value}
                onChange={() => onChange(option.value)}
                checked={value === option.value}
              />
              {option.label}
              {/* <span className={cls.checkIcon}>
               {value === option.value && <CheckCircleIcon fontSize="inherit" color="inherit" />} 
              </span> */}
            </label>
          ))}
        </div>
      }}
    />
  );
}

export default SelectComponents;
