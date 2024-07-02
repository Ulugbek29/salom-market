import cls from "./style.module.scss";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from "react-redux";
import { addAttributes } from "../../../store/carts/cart.slice";


export default function Selector({name, options, columns, control,title,attribute, getCurrentItem }) {
  const [value, setValue] = useState(null);
  const {items} = useSelector((store) => store?.cart)
  const dispatch = useDispatch()




  useEffect(() => {
    const currentItem = items.find(item => item.item.id === getCurrentItem.id);

    if (currentItem) {
      const selectedAttribute = currentItem.attributes.find(attr => attr.id === attribute.id);
      setValue(selectedAttribute?.selectedOption || null);
    }
  }, [attribute, items, getCurrentItem]);



  const handleChange = (optionValue) => {
    const isSameOption = value?.id === optionValue.id;
    const newValue = isSameOption ? null : optionValue;

    const data = {
      product: getCurrentItem,
      attribute,
      selectedOption: newValue
    }
    setValue(newValue);
    // setValue((prevValue) => (prevValue === optionValue ? null : optionValue));
    dispatch(addAttributes(data));
  };

  // const handleAddAttributes = (attribute) => {

  //   const data = {
  //     product: getCurrentItem(),
  //     attribute: attribute
  //   }

  //   dispatch(addAttributes(data));
  // }
  // console.log(value);
  return (
    <div className={`${cls.selector} ${columns}`}>
    <p className={cls.title}>
        {title}       
    </p>
      {/* <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <> */}
      {options && options.map((option) => (
        <div key={option.id} className={cls.option__box}>
        <label
          htmlFor={option.id}
          className={`${cls.option__label} ${
            value?.id === option.id && cls.active__option
          }`}
        >
          <input
            style={{display: "none"}}
            type="radio"
            id={option.id}
            value={option.id || ''}
            onChange={() => handleChange(option)}
            checked={value || ''}
          />
            
          <span className={cls.checkmark}>
          {value?.id === option.id && (
        <CheckCircleIcon  color="inherit"/>
        )}
          </span>
             <span className={cls.name}>
          {option.name}
             </span>
          <span className={cls.price}>
            + {option.price} сум
          </span>
        </label>
          <p>
          </p>

        </div>
      ))}
      {/* </> */}
      {/* )} */}
      {/* /> */}
    </div>
  );
}
