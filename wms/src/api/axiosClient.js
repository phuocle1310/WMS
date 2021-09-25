// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import cookies from "react-cookies";
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  const token = cookies.load("access-token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);
export default axiosClient;