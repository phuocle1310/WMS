import axiosClient from "./axiosClient";
const statisticalApi = {
  statisticalAll: () => {
    const url = `/statistical/statistical/`;
    return axiosClient.get(url);
  },
  getChartPoSo: () => {
    const url = `/statistical/totalPoSoByYear/`;
    return axiosClient.get(url);
  },
};
export default statisticalApi;
