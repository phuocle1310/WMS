import axiosClient from "./axiosClient";
const importApi = {
  getPoDone: () => {
    const url = `/po/get_po_done/`;
    return axiosClient.get(url);
  },
};
export default importApi;
