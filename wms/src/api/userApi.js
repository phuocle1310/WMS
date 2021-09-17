import axiosClient from "./axiosClient";
const userApi = {
  getAuthInfo: (params) => {
    const url = `/oauth2-info/`;
    return axiosClient.get(url);
  },
  login: (params) => {
    const url = `/o/token/`;
    return axiosClient.get(url);
  },
  getUser: (params) => {
    const url = `/o/token/`;
    return axiosClient.get(url);
  },
};
export default userApi;
