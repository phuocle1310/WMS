const MulLanguage = {
  en: {
    welcomelogin: "Welcome, join using the web by logging in!!!",
    //itemmenu
    inputPo: "Create Po",
    inputSo: "Create So",
    listPo: "List Po",
    litsSo: "List So",
    nameMenuPO: "Purchase Order",
    nameMenuSo: "Supplier Order",
    title: "manage",
    titleHome: "Home",
    setting: "Setting",
    logout: "Logout",
    //tạo yêu cầu po
    titleRPo: "Create the purchase order request",
    titleRSo: "Create the Supplier Order request",
    supplier: "Supplier",
    dateCreated: "Date created",
    importDate: "Import date",
    importDateSo: "Date of inventory",
    addProduct: "Add product",
    listProducts: "List products",
    close: "cancel",
    sendRequire: "Send Require",
    createNew: "New create",
    //tạo sản phẩm
    product: "Product",
    productNew: "New Product",
    manufactureDate: "Manufacture date",
    expirationDate: "Expiration Date",
    quantity: "Quantity",
    unit: "Unit",
    //error
    requiredError: "Please enter this line",
    requiredExpirationDate:
      "Prodcution date can be less or equal than expire date",
    soQuantityError:
      "Quantity order can't be greater than quantity of inventory",
    //list Po
    id: "Id",
    status: "Status",
    detail: "Detail",
    see: "See",
    //staus
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    FAILED: " FAILED",
    DONE: "DONE",
    //tìm kiếm
    sreachPo: "Search by id purchase order ...",
    //dang nhap
    errLogin: "The password or the username that you've entered is incorrect",
    //thêm sản phẩm mới
    addNewProduct: "Add new product",
    muCase: " Quantity/Case",
    errList: "List cannot be empty",
    nameStaff: "Confirmation staff",
    //nhà cc
    address: "Address",
    phone: " Phone",
    email: "Email",
    print: "Print",
    //lang
    vietnamese: "Vietnamese",
    english: "English",
    detailPo: "Purchase Order detail",
    detailSo: "Supplier Order detail",
    success: "Success",
    Qty_total: " total quantity",
    Qty_order: "    total receipt",
    Qty_receipt: "    total receipt",
    editDate: "Edit Date",
    poID: "PO Id",
    edit_who_id: "edit staff",
    add_who: "staff create",
    //receipt
    addReceipt: "Create Receipt",
    listReceipt: "List Receipt",
    detailReceipt: "Detail Receipt",
    action: "Action",
    poDone: "This kho enter unit was complete!!!",
    confirmDelete:
      "Do you really want to delete this? This process cannot be undone.",
    confirmEdit: "Change status!!!",
    soId: "So Id",
    addOrder: "Create Order",
    listOrder: "List Order",
    //home
    orderPo: "Purchase Order",
    orderSo: "Supplier Order",
    orderDone: "Order done",
    chart: "Chart",
    orders: "Orders",
    receipt: "Receipts",
    //import
    confirmImport:
      "You are submitting a request to import goods into the warehouse!!!",
    location: "Location",
  },
  vn: {
    welcomelogin: "Chào mừng bạn, tham gia sử dụng web bằng cách đăng nhập!!!",
    //itemmenu
    inputSo: "tạo đơn đặt hàng",
    inputPo: "tạo đơn nhập hàng",
    listPo: "Danh sách các đơn nhập hàng",
    listSo: "Danh sách các đơn xuất hàng",
    nameMenuPO: "nhập hàng",
    nameMenuSo: "đặt hàng",
    title: "quản lý",
    titleHome: "Trang chủ",
    setting: "Cài đặt",
    logout: "Đăng xuất",
    //tạo yêu cầu po
    titleRPo: "Tạo yêu cầu nhập hàng",
    titleRSo: "Tạo yêu cầu xuất hàng",
    supplier: "Nhà cung cấp",
    dateCreated: "Ngày tạo",
    importDate: "Ngày nhập",
    importDateSo: "Ngày Xuất",
    addProduct: "Thêm sản phẩm",
    listProducts: "Danh sách sản phẩm",
    close: "Hủy",
    sendRequire: "Gửi yêu cầu",
    createNew: "Tạo mới",
    quantity: "Số lượng",
    unit: "Đơn vị",
    //tạo sản phẩm
    product: "Sản phẩm",
    productNew: "Sản phẩm mới",
    manufactureDate: "Ngày sản xuất",
    expirationDate: "Ngày hết hạn",
    //error
    requiredError: "vui lòng nhập dòng này",
    requiredExpirationDate: "Hạn sử dụng phải lớn hơn ngày sản xuất",
    soQuantityError: "Vui lòng nhập ít hơn số lượng trong kho",
    //list Po
    id: "Mã",
    status: "Trạng thái",
    detail: "Chi tiết",
    see: "Xem",
    //trang thái
    PENDING: "chưa giải quyết",
    ACCEPTED: "Được chấp nhận",
    FAILED: "thất bại",
    DONE: "Hoàn tất",
    //tìm kiếm
    sreachPo: "Tìm kiếm theo mã đơn nhập hàng...",
    sreachSo: "Tìm kiếm theo mã đơn xuất hàng...",
    //dang nhap
    errLogin: "Tên đăng nhập hoặc mật khẩu không đúng!!",
    //addnewproduct
    addNewProduct: "Thêm sản phẩm mới",
    muCase: "Số lượng/thùng",
    errList: "Danh sách không được rỗng",
    nameStaff: "Nhân viên xác nhận",
    //nhà cc
    address: "Địa chỉ",
    phone: "Số điện thoại",
    email: "Email",
    //
    print: "In",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
    detailPo: "Chi tiết đơn nhập kho",
    detailSo: "Chi tiết đơn xuất kho",
    success: "Thành công",
    //so
    Qty_total: "Tồn kho",
    Qty_order: "Số lượng đặt hàng",
    Qty_receipt: "Số lượng nhập kho",
    //hoa don
    editDate: "Ngày chỉnh sửa",
    poID: "Mã đơn nhập",
    edit_who_id: "Nhân viên sửa",
    add_who: "Nhân viên tạo",
    //receipt
    addReceipt: "Thêm biên lai nhập hàng",
    listReceipt: "Danh sách biên lai nhập hàng",
    detailReceipt: "Chi tiết biên lai",
    action: "Hành động",
    poDone: "Đơn hàng nhập kho này đã hoàn tất!!!",
    confirmDelete:
      "Bạn có thực sự muốn xóa cái này không? Không thể hoàn tác quá trình này?",
    confirmEdit: "Thay đổi trạng thái đơn hàng!!!",
    //so
    soId: "Mã đơn xuất",
    addOrder: "Thêm biên lai xuất hàng",
    listOrder: "Danh sách biên lai xuất hàng",
    //home
    orderPo: "Đơn hàng nhập",
    orderSo: "Đơn hàng xuất",
    orderDone: "Đơn thành công",
    chart: "Biểu đồ",
    orders: "Biên lai xuất hàng",
    receipt: "Biên lai nhập hàng",
    //import
    confirmImport: "Bạn đang gửi yêu cầu để nhập hàng vào kho!!!",
    location: "Vị trí",
    listProductsImport: "Danh sách sản phẩm nhập vào kho",
  },
};
export default MulLanguage;
