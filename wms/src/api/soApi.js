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
    const url = `/po/${data}/get_po/`;
    return axiosClient.get(url);
  },
};
export default soApi;
