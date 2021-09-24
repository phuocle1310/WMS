import axiosClient from "./axiosClient";
const poApi = {
  createRequestPo: (data) => {
    const url = `/po/`;
    return axiosClient.post(url, data);
  },
  getAllPo: (data) => {
    const url = `/po/?page=${data}`;
    return axiosClient.get(url);
  },
};
export default poApi;