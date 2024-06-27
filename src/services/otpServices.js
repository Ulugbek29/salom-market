import request from "../utils/request";
import axios from "axios";

const otpServices = {
  sendCode: (params) => axios.post(`https://api.botm.uz/api/send_code`, params),
  verifyCode: (sms_id, otp) => axios.post(`https://api.botm.uz/api/verify_code/${sms_id}/${otp}`),
};

export default otpServices;