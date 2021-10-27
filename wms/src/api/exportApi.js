import axiosClient from "./axiosClient";
const exportApi = {
  getSoDone: () => {
    const url = `/so/get_so_accept/`;
    return axiosClient.get(url);
  },
  getProcess: () => {
    const url = `/export/get_list_po_import_inprocess/`;
    return axiosClient.get(url);
  },
  getFinish: () => {
    const url = `/export/get_list_so_export_finish/`;
    return axiosClient.get(url);
  },
  //tạo yêu cầu import
  getExportGood: (id) => {
    const url = `/so/${id}/export-good/`;
    return axiosClient.get(url);
  },
  //lấy list export của so
  getSoFinish: (id) => {
    const url = `/export/get_export_sorted_by_so/${id}/`;
    return axiosClient.get(url);
  },
  //
  exportUpdate: (list) => {
    const url = `/export/update_status/`;
    return axiosClient.put(url, list);
  },
  //danh sách import đang thực hiện get_list_import_inprocess
  getListAllocated: () => {
    const url = `/export/get_list_export_allocated/`;
    return axiosClient.get(url);
  },
  getListPicked: () => {
    const url = `/export/get_list_export_picked/`;
    return axiosClient.get(url);
  },
  getListSorted: () => {
    const url = `/export/get_list_export_sorted/`;
    return axiosClient.get(url);
  },
};
export default exportApi;
