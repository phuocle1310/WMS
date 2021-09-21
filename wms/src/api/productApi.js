import axiosClient from "./axiosClient";
const productApi = {
  getProductBySupplier: () => {
    const url = `/item/get-item-by-supplier/`;
    return axiosClient.get(url);
  },
};
export default productApi;
