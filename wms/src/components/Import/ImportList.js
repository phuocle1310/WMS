// import * as React from "react";
// import { XGrid } from "@material-ui/x-grid";
import CustomizedSnackbars from "../UI/CustomizedSnackbars";
import Alert from "@material-ui/lab/Alert";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGridPro,
  GridToolbarExport,
  GridOverlay,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
//css
import ListPoStyles from "../Po/ListPoStyles";
//api
import IconButton from "@material-ui/core/IconButton";
import CustomizedDialogs from "../UI/CustomizedDialogs";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PoItemView from "../Po/PoItemView";
import Print from "../../components/UI/Print";
import importApi from "../../api/importApi";
import ConfirmImport from "./ConfirmImport";
import InputIcon from "@material-ui/icons/Input";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ImportItemView from "./ImportItemView";
export default function ImportList(props) {
  const classes = ListPoStyles();
  //phân quyền
  const role = useSelector((state) => state.user.currentUser.role);
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  //lấy id idReceipt cần show
  const [idPo, setIdPo] = useState({ id: "", loading: false });
  const language = MulLanguage[`${currentLanguage}`];
  const { index } = props;
  const [listUpdateImport, setListUpdateImport] = useState([]);

  const handleUpdateImport = (data) => {
    setListUpdateImport(data);
    console.log(listUpdateImport);
    const fetchImport = async () => {
      try {
        const action = await importApi.importUpdate({
          import: listUpdateImport,
        });
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
    fetchImport();
  };
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
      valueFormatter: (params) => {
        let staff = params.getValue(params.id, "add_who");
        return staff.username;
      },
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
      valueFormatter: (params) => {
        let staff = params.getValue(params.id, "edit_who");
        return staff.username;
      },
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
                label: classes.label,
              }}
            >
              <VisibilityIcon />
            </IconButton>
            {index === 1 && (
              <IconButton
                onClick={() => {
                  handlerEdit(id);
                }}
                color="primary"
                aria-label="upload picture"
                component="span"
                disabled={role === "SUPPLIER" ? true : false}
                classes={{
                  root: classes.button1,
                  label: classes.label,
                }}
              >
                <InputIcon />
              </IconButton>
            )}
            {index > 1 && (
              <IconButton
                onClick={() => {
                  handlerDelete(id);
                }}
                color="primary"
                aria-label="upload picture"
                component="span"
                classes={{
                  root: classes.button,
                  label: classes.label,
                }}
              >
                <ListAltIcon />
              </IconButton>
            )}
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
  const [rows, setRows] = useState([]);
  const rowsCount = useSelector((state) => state.po.rowCount);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchLogin = async () => {
      try {
        let response;
        if (index === 1) response = await importApi.getPoDone();
        if (index === 2) response = await importApi.getProcess();
        if (index === 3) response = await importApi.getFinish();

        setRows(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogin();
  }, [page, idPo.id, index, listUpdateImport]);
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
                <PoItemView id={idPo.id}></PoItemView>
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
              <ConfirmImport
                onDelete={handleClose}
                onSubmitImport={onSubmitImport}
              ></ConfirmImport>
            }
          ></CustomizedDialogs>
        );
      case 3:
        return (
          <CustomizedDialogs
            open={open}
            handleClose={handleClose}
            children={
              <Print>
                <ImportItemView
                  id={idPo.id}
                  index={index}
                  handleUpdateImport={handleUpdateImport}
                ></ImportItemView>
              </Print>
            }
          ></CustomizedDialogs>
        );
      default:
    }
  };
  //view
  function hanlerView(params) {
    setCrud(1);
    setIdPo({ id: params, loading: false });
    handleClickOpen();
  }
  //edit
  function handlerEdit(params) {
    setCrud(2);
    setIdPo({ id: params, loading: false });
    handleClickOpen();
  }
  function handlerDelete(params) {
    setIdPo({ id: params, loading: false });
    setCrud(3);
    handleClickOpen();
  }
  //xóa
  const onSubmitImport = () => {
    const fetchImport = async () => {
      try {
        const action = await importApi.getImportGood(idPo.id);
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
    fetchImport();
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DataGridPro
        rows={rows}
        className={classes.root}
        rowCount={rowsCount}
        columns={columns}
        pagination
        autoHeight
        pageSize={8}
        rowsPerPageOptions={[5]}
        onPageChange={handlePageChange}
        page={page}
        editMode="none"
        rowHeight={40}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
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
