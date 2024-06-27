import { useRef } from "react";
import SecondaryButton from "../Buttons/SecondaryButton";
import useOutsideClick from "../../hooks/useOutsideClick";
import cls from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";

export default function Modal({ setShowModal,removeAllItems=()=>{} }) {
  const ref = useRef();
  const navigate = useNavigate();
  const { id } = useParams()




  useOutsideClick(ref, () => setShowModal(false));

  const clearOrder = () => {
    removeAllItems()
    setShowModal(false);
    navigate(`/home/${id}`);
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.inner} ref={ref}>
        <p className={cls.title}>Savat bo'shatilsinmi?</p>
        <p className={cls.desc}>Savatni bo'shatmoqchiligingizga aminmisin?</p>
        <div className={cls.btns}>
          <SecondaryButton onClick={() => setShowModal(false)}>Yo'q</SecondaryButton>
          <SecondaryButton onClick={clearOrder} styles={{ backgroundColor: "#1a5d1a", color: "#fff" }}>
            Ha
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
