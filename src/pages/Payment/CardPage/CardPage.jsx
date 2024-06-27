import React from "react";
import cls from "./style.module.scss";
import { useForm } from "react-hook-form";
import CardInput from "../../../components/FormElements/CardInput";
import DateInput from "../../../components/FormElements/DateInput";
import MainButton from "../../../components/Buttons/MainButton";
import clickServices from "../../../services/clickServices";
import { useNavigate } from "react-router-dom";

function CardPage() {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm();

  const onSubmit = (value) => {

    const card_number = value.card_number.replace(/\s+/g, ''); // Remove all spaces
    const expire_date = value.expire_date.replace(/\//g, ''); // Remove all slashes
    const data = {
      card_number,
      expire_date,
      service_id: 34489,
      temporary: 1
    }
    clickServices.getToken(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })

    navigate("otp-page")
  };

  return (
    <div className={cls.card__page}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div
      className={cls.card__wrapper}
      >
        <CardInput
        required
         name="card_number" control={control} />

        <DateInput
        required
         name="expire_date" control={control} />
      </div>
        <MainButton center type="submit" onClick={() => {}}>
        Keyingi bosqich
      </MainButton>
      </form>
    </div>
  );
}

export default CardPage;
