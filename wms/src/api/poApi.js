import axiosClient from "./axiosClient";
const poApi = {
  createRequestPo: (data) => {
    const url = `/po/`;
    return axiosClient.post(url, data);
  },
};
export default poApi;
