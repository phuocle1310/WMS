// import * as React from "react";
// import { XGrid } from "@material-ui/x-grid";
import CustomizedSnackbars from "../UI/CustomizedSnackbars";
import Alert from "@material-ui/lab/Alert";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarExport,
  GridOverlay,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import { NavLink } from "react-router-dom";
import poApi from "../../api/poApi";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useDispatch, useSelector } from "react-redux";
//print
import ReactToPrint from "react-to-print";
//css
import ListPoStyles from "./ListPoStyles";
//api
import { listPo } from "../../store/poSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import Podetail from "../../pages/client/Podetail";
import IconButton from "@material-ui/core/IconButton";
import CustomizedDialogs from "../UI/CustomizedDialogs";
import ConfirmDelete from "../UI/ConfirmDelete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PoItem from "./PoItem";
import Print from "../../components/UI/Print";
import EditPo from "./EditPo";
export default function ListPo() {
  const classes = ListPoStyles();
  //phân quyền
  const role = useSelector((state) => state.user.currentUser.role);
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  //lấy id idReceipt cần show
  const [idPo, setIdPo] = useState({ id: "", loading: false });
  const [isDelete, setIsDelete] = useState({ id: "", loading: false });
  const language = MulLanguage[`${currentLanguage}`];
  const columns = [
    {
      field: "id",
      headerName: language.id,
      sortable: true,
      width: 100,
    },
    {
      field: "add_date",
      headerName: language.dateCreated,
      sortable: false,
      width: 130,
    },
    {
      field: "effective_date",
      headerName: language.importDate,
      sortable: false,
      width: 130,
    },
    {
      field: "add_who",
      headerName: language.nameStaff,
      sortable: false,
      width: 180,
      renderCell: (params) => {
        let staff = params.getValue(params.id, "add_who");
        if (staff === null) {
          return <p></p>;
        } else {
          return <p>{staff.username}</p>;
        }
      },
    },
    {
      field: "edit_who",
      headerName: language.edit_who_id,
      sortable: false,
      width: 130,
      renderCell: (params) => {
        let staff = params.getValue(params.id, "edit_who");
        if (staff === null) {
          return <p></p>;
        } else {
          return <p>{staff.username}</p>;
        }
      },
    },
    {
      field: "status",
      headerName: language.status,
      sortable: false,
      width: 180,
      renderCell: (params) => {
        let status = params.getValue(params.id, "status");
        return showAlert(status);
      },
    },
    {
      field: "detail",
      headerName: language.action,
      sortable: false,
      width: 180,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        let id = params.getValue(params.id, "id");
        return (
          <>
            <IconButton
              onClick={() => {
                hanlerView(id);
              }}
              color="primary"
              aria-label="upload picture"
              component="span"
              classes={{
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handlerEdit(id);
              }}
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled={role === "SUPPLIER" ? true : false}
              classes={{
                root: classes.button1, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handlerDelete(id);
              }}
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled={role === "SUPPLIER" ? false : true}
              classes={{
                root: classes.button, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  //alert
  const [alert, setAlert] = useState({
    nameAlert: "",
    message: "",
    open: false,
  });
  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ nameAlert: "", message: "", open: false });
  };
  const showAlert = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Alert severity="warning" variant="filled" className={classes.alert}>
            {status}
          </Alert>
        );
      case "ACCEPTED":
        return (
          <Alert severity="info" variant="filled" className={classes.alert}>
            {status}
          </Alert>
        );
      case "FAILED":
        return (
          <Alert severity="error" variant="filled" className={classes.alert}>
            {status}
          </Alert>
        );
      case "DONE":
        return (
          <Alert severity="success" variant="filled" className={classes.alert}>
            {status}
          </Alert>
        );
      default:
    }
  };
  //hàm xuất hiện thông báo
  function CustomNoRowsOverlay() {
    return (
      <GridOverlay className={classes.overlay}>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <div className={classes.overlay}>No Rows</div>
      </GridOverlay>
    );
  }
  const CustomToolbar = () => {
    return (
      <div className={classes.root1}>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
    );
  };
  //call api data
  const rows = useSelector((state) => state.po.listPo);
  const rowsCount = useSelector((state) => state.po.rowCount);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const action = listPo(page + 1);
        const actionResult = await dispatch(action);
        unwrapResult(actionResult);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogin();
  }, [page, isDelete.loading, idPo.id]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  //xu ly cac crub
  //crud
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [crud, setCrud] = useState(0);
  const renderCrud = () => {
    switch (crud) {
      case 1:
        return (
          <CustomizedDialogs
            open={open}
            handleClose={handleClose}
            children={
              <Print>
                <PoItem id={idPo.id}></PoItem>
              </Print>
            }
          ></CustomizedDialogs>
        );
      case 2:
        return (
          <CustomizedDialogs
            open={open}
            handleClose={handleClose}
            children={
              <EditPo id={idPo.id} handleOnSubmit={handleOnSubmit}></EditPo>
            }
          ></CustomizedDialogs>
        );
      case 3:
        return (
          <CustomizedDialogs
            open={open}
            handleClose={handleClose}
            children={
              <ConfirmDelete
                onDelete={handleClose}
                onSubmitDelete={onSubmitDelete}
              ></ConfirmDelete>
            }
          ></CustomizedDialogs>
        );
      default:
      // code block
    }
  };
  //view
  //view
  function hanlerView(params) {
    setCrud(1);
    //the thing  you wanna do
    setIdPo({ id: params, loading: false });
    handleClickOpen();
  }
  //edit
  function handlerEdit(params) {
    //the thing  you wanna do
    setCrud(2);
    setIdPo({ id: params, loading: false });
    handleClickOpen();
  }
  function handlerDelete(params) {
    //the thing  you wanna do
    setIsDelete({ id: params, loading: false });
    setCrud(3);
    handleClickOpen();
  }
  //xóa
  const onSubmitDelete = () => {
    const fetchDelete = async () => {
      try {
        const action = await poApi.deletePo(isDelete.id);
        setIsDelete({ id: isDelete.id, loading: true });
        setAlert({
          nameAlert: "success",
          message: language.success,
          open: true,
        });
        handleClose();
        return action;
      } catch (error) {
        setAlert({
          nameAlert: "Error",
          message: JSON.stringify(error.response.data),
          open: true,
        });
      }
    };
    fetchDelete();
  };
  //edit
  const handleOnSubmit = (status) => {
    console.log(status);
    const fetchUpadte = async () => {
      try {
        const data = { status: status };
        const action = await poApi.updateStatus(idPo.id, data);
        setIdPo({ id: idPo, loading: true });
        setAlert({
          nameAlert: "success",
          message: language.success,
          open: true,
        });
        handleClose();
        return action;
      } catch (error) {
        setAlert({
          nameAlert: "Error",
          message: JSON.stringify(error.response.data),
          open: true,
        });
      }
    };
    fetchUpadte();
  };
  return (
    <div style={{ height: 580, width: "auto" }}>
      <DataGridPro
        rows={rows}
        className={classes.root}
        rowCount={rowsCount}
        columns={columns}
        pageSize={10}
        pagination
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        editMode="none"
        rowHeight={40}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        loading={rows.length === 0}
      />
      {renderCrud()}
      {alert.nameAlert && (
        <CustomizedSnackbars
          open={alert.open}
          handleClose={handleClose1}
          nameAlert={alert.nameAlert}
          message={alert.message}
        ></CustomizedSnackbars>
      )}
    </div>
  );
}
