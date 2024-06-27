import { useEffect, useState } from "react";
import cls from "./styles.module.scss";
import TextInput from "../../components/Buttons/TextInput";
import NumberInput from "../../components/Buttons/NumberInput";
import TextField from "../../components/FormElements/TextField";
import PhoneInputMask from "../../components/FormElements/PhoneInputMask";
import Countdown from "react-countdown";
import CountdownTime from "../../components/CountDownTimer/CountdownTime";
import FRow from "../../components/FormElements/FRow";
import OtpInput from "../../components/FormElements/OtpInput";
import OtpInputField from "../../components/FormElements/OtpInputField"
import otpServices from "../../services/otpServices";


export default function UserInfo({ control, watch,getValues }) {
  const [resendCode, setResendCode] = useState(false);
  const [otpCheck, setOtpCheck] = useState(false);
  const [openVerifyButton, setOpenVerifyButton] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpId, setOtpId] = useState("")


  useEffect(() => {
    const phoneNumber = watch("phone");
    // console.log("Phone number:",phoneNumber.length);
    if (phoneNumber.length > 12) {
      setOpenVerifyButton(true);
      setOtpCheck(false);
    } else {
      setOpenVerifyButton(false);
      setOtpCheck(false);
      setOtpInput("")
    }
  }, [watch("phone")]);




  const verifyPhoneNumber = () => {
    // const phoneNumber = getValues("phone")
    const phoneNumber = `+${getValues("phone").replace(/[^\d]/g, "")}`;
    // console.log(phoneNumber);
    // console.log(phoneNumber.length);
    if (phoneNumber && phoneNumber.length > 11) {
      const data = {
        content: {
          text: ""
        },
        originator: "",
        phone: phoneNumber
      }

      otpServices.sendCode(data)
      .then((res) => {
        // console.log(res);
        setOtpId(res.data.data.id)
        setShowCountDown(true)
      })
      .catch((err) => console.log(err))


      setOtpCheck(true);
      setOpenVerifyButton(false);
    } else {
      setOtpCheck(false);
    }
  };


  const verifyOtpCode = () => {
    if(otpInput.length === 4) {
      otpServices.verifyCode(otpId,otpInput)
      .then((res) =>{
        // console.log(res)
        setOtpCheck(false)
        setOtpInput("")
      } )
      .catch((err) => {
        setOtpCheck(false)
        console.log(err)
      })
    }
  }

  const sendCodeAgain = () => {
    setResendCode(p => !p)
    verifyPhoneNumber()
  }


// console.log("otpId",otpId);
  return (
    <div className={cls.inner}>
    <div className={cls.title}>
      <p>Shaxsiy ma'lumotlar</p>
    </div>
      <div className={cls.form}>
        <FRow label="Ism" required>
          <TextField
            control={control}
            name="name"
            placeholder="Ismingizni kiriting"
            required
          />
        </FRow>
        <FRow label="Telefon raqam" required>
          <PhoneInputMask control={control} name="phone" required />
        </FRow>
        {/* <TextInput placeholder="Ismingizni kiriting" label="Ism" form={form} name="first_name" required />
        <NumberInput
          mask={"+998 99 999-99-99"}
          placeholder="+998 99 999-99-99"
          label="Telefon"
          form={form}
          name="phone_number"
          required
        /> */}
        <div className={cls.otp__section}>
        {openVerifyButton && (
            <button className={cls.otp__verify__btn} type="button" onClick={verifyPhoneNumber}>
              Tekshirish
            </button>
          )}
              {otpCheck && (
                <>
                  <div className={cls.otp__wrapper}>
                  <OtpInputField setOptInput={setOtpInput} optInput={otpInput}/>
                    {/* <OtpInput setOptInput={setOtpInput} optInput={otpInput} /> */}
                    <button
                    disabled={otpInput.length === 4 ? false : true}
                    onClick={verifyOtpCode}
                     type="button" className={cls.otp__send_verify__btn}>
                      Verify
                    </button>
                  </div>
                  {showCountDown && (
                    <Countdown
                      key={resendCode}
                      renderer={(props) => (
                        <CountdownTime
                          {...props}
                          setResendCode={sendCodeAgain}
                        />
                      )}
                      date={Date.now() + 30000}
                    />
                  )}
                </>
              )}
              
          {/* {optCheck ? (
            <>
              <div className={cls.otp__wrapper}>
                <OtpInput setOptInput={setOptInput} optInput={optInput} />
                <button type="button" className={cls.otp__verify__btn}>
                  Verify
                </button>
              </div>
              {showCountDown && (
                <Countdown
                  key={resendCode}
                  renderer={(props) => <CountdownTime {...props} setResendCode={setResendCode} />}
                  date={Date.now() + 60000}
                />
              )}
            </>
          ) : (
            <button type="button" onClick={verifyPhoneNumber}>
              Verify phone number
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
