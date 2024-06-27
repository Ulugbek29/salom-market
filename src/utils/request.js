import axios from "axios";
// import { store } from "../store/store"
import { Base64 } from 'js-base64';

const request = axios.create({
  baseURL: "https://api.botm.uz/api",
  timeout: 100000,
});

const errorHandler = (error) => {
    if (error && error.response) {
      console.log(error);
    }
  
    return Promise.reject(error.response);
  };



  
request.interceptors.request.use(
  (config) => {
    // const token = store.getState().auth.token;
    // console.log("token1",token)
    const username = "botmuz"; // Your username
    const password = "8o5EXUiqge6Q"; // Your password
    const basicAuth = Base64.encode(`${username}:${password}`);

    if (basicAuth) {
        // config.headers.Authorization = `Bearer ${token}`;
        // config.headers["platform-id"] = "7d4a4c38-dd84-4902-b744-0488b80a4c01";
      config.headers.Authorization = `Basic ${basicAuth}`
      config.headers["platform-id"] = "7d4a4c38-dd84-4902-b744-0488b80a4c03";
    }
    return config;
  },

  (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => response.data,
  errorHandler
);

export default request;


