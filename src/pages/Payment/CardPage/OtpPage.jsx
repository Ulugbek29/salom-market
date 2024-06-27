import cls from "./style.module.scss";
import React, { useState, useEffect } from 'react';
import OtpInput from "../../../components/FormElements/OtpInput";
import MainButton from "../../../components/Buttons/MainButton";
import Countdown from "react-countdown";
import CountdownTime from "../../../components/CountDownTimer/CountdownTime";

function OtpPage() {
  const [otpValue, setOtpValue] = useState("");
  const [resendCode, setResendCode] = useState(false);
  const [countdownKey, setCountdownKey] = useState(Date.now());

  const sendCodeAgain = () => {
    setResendCode((prev) => !prev);
    setCountdownKey(Date.now()); // Reset the countdown
    // verifyPhoneNumber()
  };

  useEffect(() => {
    // Any other logic when resendCode changes, if needed
  }, [resendCode]);

  return (
    <div className={cls.otp__page}>
      <div className={cls.otp__wrapper}>
        <OtpInput optInput={otpValue} setOptInput={setOtpValue} />
        <Countdown
          key={countdownKey}
          date={Date.now() + 5000}
          renderer={(props) => <CountdownTime {...props} sendCodeAgain={sendCodeAgain} />}
        />
      </div>

      <MainButton
        disabled={otpValue.length !== 4}
        center
        onClick={() => {}}
      >
        Keyingi bosqich
      </MainButton>
    </div>
  );
}

export default OtpPage;
