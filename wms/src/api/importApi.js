import axiosClient from "./axiosClient";
const importApi = {
  getPoDone: () => {
    const url = `/po/get_po_done/`;
    return axiosClient.get(url);
  },
  getProcess: () => {
    const url = `/import/get_list_po_import_inprocess/`;
    return axiosClient.get(url);
  },
  getFinish: () => {
    const url = `/import/get_list_po_import_finish/`;
    return axiosClient.get(url);
  },
  //tạo yêu cầu import
  getImportGood: (id) => {
    const url = `/po/${id}/import-good/`;
    return axiosClient.get(url);
  },
  //lấy import của po inprocess
  getPoImportInprocess: (id) => {
    const url = `/import/get_import_inprocess/${id}/`;
    return axiosClient.get(url);
  },
  //lấy import po fi
  getPoImportFinish: (id) => {
    const url = `/import/get_import_finish/${id}/`;
    return axiosClient.get(url);
  },
  //
  importUpdate: (list) => {
    const url = `/import/update-import/`;
    return axiosClient.put(url, list);
  },
  //danh sách import đang thực hiện get_list_import_inprocess
  getListInprocess: () => {
    const url = `/import/get_list_import_inprocess/`;
    return axiosClient.get(url);
  },
};
export default importApi;
