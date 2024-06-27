import axios from "axios";

const request = axios.create({ baseURL: "http://botm.uz/v1" });

request.interceptors.response.use(
  (res) => {
    return res.data},
  (error) => {
    if (error.response?.data?.error_note) {
      console.log("ERROR: ", error.response?.data?.error_note);
    }
  }
);

export default request;
