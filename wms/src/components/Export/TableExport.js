// import * as React from "react";
// import { XGrid } from "@material-ui/x-grid";
import CustomizedSnackbars from "../UI/CustomizedSnackbars";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import * as React from "react";
import { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
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
import importApi from "../../api/importApi";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GreenCheckbox from "../UI/GreenCheckbox";
export default function TableExport(props) {
  const classes = ListPoStyles();
  //phân quyền
  const role = useSelector((state) => state.user.currentUser.role);
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  //call api data
  const [rows, setRows] = useState([]);
  //lấy id idReceipt cần show
  const [idPo, setIdPo] = useState({ id: "", loading: false });
  const language = MulLanguage[`${currentLanguage}`];
  const { index } = props;
  const [listUpdateImport, setListUpdateImport] = useState([]);

  const [checked, setChecked] = useState(false);
  const onChecked = (id) => {
    setChecked((pre) => {
      let check = !pre;
      //thêm vào mảng
      if (check === true) {
        setListUpdateImport((pre) => {
          let newArr = listUpdateImport;
          var index = newArr.findIndex((x) => x.pk === id);
          if (Number(index) === Number(-1)) {
            newArr.push({ pk: id });
          }
          return newArr;
        });
      } else {
        //xóa ra khỏi mảng
        setListUpdateImport((pre) => {
          let newArr = [...pre];
          var index = newArr.findIndex((x) => x.pk === id);
          if (index !== -1) {
            newArr.splice(index, 1);
          }
          return newArr;
        });
        console.log("uat");
      }
      return check;
    });
  };
  const handleUpdateImport = (data) => {
    setListUpdateImport(data);
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
      field: "PO",
      headerName: language.poID,
      sortable: false,
      width: 140,
    },
    {
      field: "status",
      headerName: language.status,
      sortable: false,
      width: 120,
      renderCell: (params) => {
        let id = params.getValue(params.id, "id");
        // console.log(status + "ủa");
        // setChecked(Boolean(status));
        return (
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={checked}
                onChange={() => onChecked(id)}
                name="checkedG"
              />
            }
            // label={language.ipDone}
          />
        );
      },
    },
    {
      field: "itemid",
      headerName: language.idProduct,
      sortable: false,
      width: 180,
      renderCell: (params) => {
        let item = params.getValue(params.id, "item");
        return <p>{item.id}</p>;
      },
    },
    {
      field: "itemproduct",
      headerName: language.product,
      sortable: false,
      width: 180,
      renderCell: (params) => {
        let item = params.getValue(params.id, "item");
        return <p>{item.name}</p>;
      },
    },
    {
      field: "qty",
      headerName: language.quantity,
      sortable: false,
      width: 120,
    },
    {
      field: "location",
      headerName: language.location,
      sortable: false,
      width: 120,
      renderCell: (params) => {
        let location = params.getValue(params.id, "location");
        return (
          <p>
            {location.row_location}-{location.shelf_column}-
            {location.shelf_floor}
          </p>
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
  const rowsCount = useSelector((state) => state.po.rowCount);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchLogin = async () => {
      try {
        let response = await importApi.getListInprocess();
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

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={classes.right}>
        {" "}
        <Button
          variant="contained"
          onClick={handleUpdateImport}
          disabled={rows.length > 0 ? false : true}
          classes={{
            root: classes.submit,
            label: classes.label,
          }}
          startIcon={<SendIcon />}
        >
          {language.sendUpdate}
        </Button>
      </div>
      <div>
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
        {alert.nameAlert && (
          <CustomizedSnackbars
            open={alert.open}
            handleClose={handleClose1}
            nameAlert={alert.nameAlert}
            message={alert.message}
          ></CustomizedSnackbars>
        )}
      </div>
    </div>
  );
}
