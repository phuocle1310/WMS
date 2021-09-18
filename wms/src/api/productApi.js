import axiosClient from "./axiosClient";
const productApi = {
  getProductBySupplier: () => {
    const url = `/items/`;
    return axiosClient.get(url);
  },
};
export default productApi;
