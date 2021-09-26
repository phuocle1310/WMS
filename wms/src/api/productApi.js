import axiosClient from "./axiosClient";
const productApi = {
  getProductBySupplier: () => {
    const url = `/item/get-item-by-supplier/`;
    return axiosClient.get(url);
  },
  getProductBySupplierForSo: () => {
    const url = `/item/get-item-by-supplier-for-so/`;
    return axiosClient.get(url);
  },
  createdProduct: (data) => {
    const url = `/item/`;
    return axiosClient.post(url, data);
  },
};
export default productApi;
