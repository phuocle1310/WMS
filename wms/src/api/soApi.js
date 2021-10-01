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
  getSoDetail: (data) => {
    const url = `/so/${data}/get_so/`;
    return axiosClient.get(url);
  },
  updateStatus: (id, data) => {
    const url = `/so/${id}/update/`;
    return axiosClient.put(url, data);
  },
  deleteSo: (id) => {
    const url = `/so/${id}/`;
    return axiosClient.delete(url);
  },
};
export default soApi;
