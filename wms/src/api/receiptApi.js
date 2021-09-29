import axiosClient from "./axiosClient";
const receiptApi = {
  getProduct: (data) => {
    const url = `/po/${data}/get-item-for-receipt/`;
    return axiosClient.get(url);
  },
  createReceipt: (id, data) => {
    const url = `/po/${id}/create-receipt/`;
    return axiosClient.post(url, data);
  },
  getAllReceipt: (id) => {
    const url = `/po/${id}/receipts/`;
    return axiosClient.get(url);
  },
  getReceiptItem: (id) => {
    const url = `/receipt/${id}/`;
    return axiosClient.get(url);
  },
};
export default receiptApi;
