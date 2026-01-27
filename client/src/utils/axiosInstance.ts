import axios from "axios";
import { BASE_URL } from "./apiPaths";
import avatar from "@assets/avatar.gif";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.profileImageUrl === "") {
      response.data.profileImageUrl = avatar;
    }
    return response;
  },
  (error) => {
    //  handle common errors
    if (error.response) {
      if (error.response.status === 401) {
        // redirect to login page
        // window.location.href = "/";
      } else if (error.response.status === 500) {
        console.log("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.log("Request timeout. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
