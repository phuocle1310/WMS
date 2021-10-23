import axios from "axios";
import queryString from "query-string";
import cookies from "react-cookies";

const base_url = "http://127.0.0.1:8000";

const refresh_token = async () => {
  try {
    let get_oauth = await axiosClient.get("/oauth2-info/");
    let payload = {
      refresh_token: cookies.load("refresh_token"),
      grant_type: "refresh_token",
      ...get_oauth,
    };
    return axiosClient.post("/o/token/", payload);
  } catch (err) {
    console.error("axiosClient -> refresh_token", err.response);
  }
};

const axiosClient = axios.create({
  baseURL: base_url,
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
    // console.log("response", response.status, response.data)

    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    // console.log(error.response.status)
    if (error.response.status === 401) {
      // console.log("bị 401")
      return refresh_token().then((res) => {
        // console.log("đang get api refresh_token")
        cookies.save("access-token", res.access_token);
        cookies.save("refresh_token", res.refresh_token);
        let config = error.response.config;
        let token = res.access_token;
        // console.log("toke mới", token)
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return axiosClient(config).catch((err) => {
          return error;
        });
      });
    }
    throw error;
  },
);
export default axiosClient;
