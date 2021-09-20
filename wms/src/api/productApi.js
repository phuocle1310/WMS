import axiosClient from "./axiosClient";
const productApi = {
  getProductBySupplier: () => {
    const url = `/items/get-item-by-supplier/`;
    return axiosClient.get(url);
  },
};
export default productApi;
