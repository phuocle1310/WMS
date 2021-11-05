import axiosClient from "./axiosClient";
const statisticalApi = {
  statisticalAll: () => {
    const url = `/statistical/statistical/`;
    return axiosClient.get(url);
  },
  getChartPoSo: (year) => {
    const url = `/statistical/totalPoSoByYear/?year= ${year}`;
    return axiosClient.get(url);
  },
};
export default statisticalApi;
