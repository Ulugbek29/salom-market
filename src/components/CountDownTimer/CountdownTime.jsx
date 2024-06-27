import cls from "./style.module.scss";

export default function CountdownTime({ minutes, seconds, completed, sendCodeAgain }) {
  const doubleTime = (str) => (String(str).length === 1 ? `0${str}` : str);

  return (
    <p className={cls.countdown}>
      <span
        className={completed ? "" : cls.disable}
        onClick={completed ? sendCodeAgain : null}
      >
        Qayta yuborish
      </span>
      {!completed && (
        <span>
          {doubleTime(minutes)}:{doubleTime(seconds)}
        </span>
      )}
    </p>
  );
}
