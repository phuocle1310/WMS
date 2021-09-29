import axiosClient from "./axiosClient";
const soApi = {
  createRequestSo: (data) => {
    const url = `/so/`;
    return axiosClient.post(url, data);
  },
  getAllSo: (data) => {
    const url = `/so/?page=${data}`;
    return axiosClient.get(url);
  },
  gePoDetail: (data) => {
    const url = `/so/${data}/get_so/`;
    return axiosClient.get(url);
  },
};
export default soApi;
