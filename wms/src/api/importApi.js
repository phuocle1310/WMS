import axiosClient from "./axiosClient";
const importApi = {
  getPoDone: () => {
    const url = `/po/get_po_done/`;
    return axiosClient.get(url);
  },
  //tạo yêu cầu import
  getImportGood: (id) => {
    const url = `/po/${id}/import-good/`;
    return axiosClient.get(url);
  },
  //lấy import của po inprocess
  getPoImport: (id) => {
    const url = `/import/get_import_inprocess/${id}/`;
    return axiosClient.get(url);
  },
  //
  importUpdate: (list) => {
    const url = `/import/update-import/`;
    return axiosClient.put(url, list);
  },
};
export default importApi;
