import axiosClient from "./axiosClient";
const userApi = {
  getAuthInfo: () => {
    const url = `/oauth2-info/`;
    return axiosClient.get(url);
  },
  login: (data) => {
    const url = `/o/token/`;
    return axiosClient.post(url, data);
  },
  getUser: () => {
    const url = `/users/current-user/`;
    return axiosClient.get(url);
  },
};
export default userApi;
