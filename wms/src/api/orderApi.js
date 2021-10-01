import axiosClient from "./axiosClient";
const orderApi = {
  getProduct: (data) => {
    const url = `/so/${data}/get-item-for-order/`;
    return axiosClient.get(url);
  },
  createOrder: (id, data) => {
    const url = `/so/${id}/create-order/`;
    return axiosClient.post(url, data);
  },
  getAllOrder: (id) => {
    const url = `/so/${id}/orders/`;
    return axiosClient.get(url);
  },
  getOrderItem: (id) => {
    const url = `/order/${id}/`;
    return axiosClient.get(url);
  },
  updateOrder: (id, data) => {
    const url = `/order/${id}/update-order/`;
    return axiosClient.put(url, data);
  },
  deleteOrder: (id) => {
    const url = `/order/${id}/delete-order/`;
    return axiosClient.patch(url);
  },
};
export default orderApi;
