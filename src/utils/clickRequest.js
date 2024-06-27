import axios from "axios";
import CryptoJS from "crypto-js";

// Create an axios instance with the base URL and timeout
const clickRequest = axios.create({
  baseURL: "https://api.click.uz/v2/merchant/card_token",
  timeout: 100000,
});

// Error handler function
const errorHandler = (error) => {
  if (error && error.response) {
    console.log(error);
  }
  return Promise.reject(error.response);
};

// Request interceptor to add authorization headers
clickRequest.interceptors.request.use(
  (config) => {
    const secretKey = 'vFufrlGYj1Jqb'; // Replace with your actual secret key
    const merchantUserId = 42034; // Replace with your actual merchant user ID

    // Get the current Unix timestamp
    const currentUnixTime = Math.floor(Date.now() / 1000);

    // Create the digest
    const digest = `${currentUnixTime}${secretKey}`;
    
    // Create the SHA1 hash
    const sha1Hash = CryptoJS.SHA1(digest).toString(CryptoJS.enc.Hex);
    
    // Create the auth string
    const auth = `${merchantUserId}:${sha1Hash}:${currentUnixTime}`;
    
    console.log(auth);
    // Set the Authorization header
    config.headers.auth = `${auth}`;
    config.headers.Accept  = "application/json"
    return config;
  },
  (error) => errorHandler(error)
);

// Response interceptor to handle responses
clickRequest.interceptors.response.use(
  (response) => response.data,
  (error) => errorHandler(error)
);

export default clickRequest;
