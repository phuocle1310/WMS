import ListPoStyles from "../Po/ListPoStyles";
// //api
import receiptApi from "../../api/receiptApi";
import * as React from "react";
import { useState, useEffect } from "react";
import { DataGridPro, GridOverlay } from "@mui/x-data-grid-pro";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import CustomizedDialogs from "../UI/CustomizedDialogs";
import ReceiptItem from "./ReceiptItem";
import Print from "../../components/UI/Print";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ReceiptUpdate from "./ReceiptUpdate";
import ConfirmDelete from "../UI/ConfirmDelete";
export default function DataGridProDemo(props) {
  const { id, status } = props;
  const classes = ListPoStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  let [rows, setrows] = useState([]);
  const [rowss, setRowss] = React.useState(rows);
  //lấy id idReceipt cần show
  const [idReceipt, setIdReceipt] = useState(0);
  const [isDelete, setIsDelete] = useState({ id: "", loading: false });
  useEffect(() => {
    const fetchGetAll = async () => {
      try {
        const action = await receiptApi.getAllReceipt(id);

        setTimeout(() => {
          setrows(
            action.map((item) => {
              return {
                ...item,
                add_date: moment(item.add_date).startOf("day").fromNow(),
                edit_date: moment(item.edit_date).format("L"),
              };
            }),
          );
          setRowss(
            action.map((item) => {
              return {
                ...item,
                add_date: moment(item.add_date).startOf("day").fromNow(),
                edit_date: moment(item.edit_date).format("L"),
              };
            }),
          );
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAll();
  }, [id, isDelete.loading]);
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
      field: "edit_date",
      headerName: language.editDate,
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
          return <p>rỗng</p>;
        } else {
          return staff.username;
        }
      },
    },
    {
      field: "edit_who",
      headerName: language.edit_who_id,
      sortable: false,
      width: 180,
      renderCell: (params) => {
        let staff = params.getValue(params.id, "edit_who");
        if (staff === null) {
          return <p>rỗng</p>;
        } else {
          return staff.username;
        }
      },
    },
    {
      field: "PO",
      headerName: language.poID,
      sortable: false,
      width: 180,
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
                hanlerViewReceipt(id);
              }}
              color="primary"
              aria-label="upload picture"
              component="span"
              // disabled={listProduct.length < product1.length ? false : true}
              classes={{
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handlerEditReceipt(id);
              }}
              color="primary"
              aria-label="upload picture"
              component="span"
              // disabled={listProduct.length < product1.length ? false : true}
              classes={{
                root: classes.button1, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
              disabled={status === "DONE" ? true : false}
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
              disabled={status === "DONE" ? true : false}
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
                <ReceiptItem id={idReceipt}></ReceiptItem>
              </Print>
            }
          ></CustomizedDialogs>
        );
      case 2:
        return (
          <CustomizedDialogs
            open={open}
            handleClose={handleClose}
            children={<ReceiptUpdate id={idReceipt}></ReceiptUpdate>}
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
  function hanlerViewReceipt(params) {
    setCrud(1);
    //the thing  you wanna do
    setIdReceipt(params);
    handleClickOpen();
  }
  //edit
  function handlerEditReceipt(params) {
    //the thing  you wanna do
    setCrud(2);
    setIdReceipt(params);
    handleClickOpen();
  }
  function handlerDelete(params) {
    //the thing  you wanna do
    setIsDelete({ id: params, loading: false });
    setCrud(3);
    setIdReceipt(params);
    handleClickOpen();
  }
  //hàm xuất hiện thông báo
  //xóa receipt
  const onSubmitDelete = () => {
    const fetchDelete = async () => {
      try {
        const action = await receiptApi.deleteReceipt(isDelete.id);
        setIsDelete({ ...isDelete, loading: true });
        handleClose();
        return action;
      } catch (error) {
        console.log(error);
      }
    };
    fetchDelete();
  };
  //xử lý tìm kiếm
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  const [value, setValue] = useState("");
  const handlerOnchange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const searchRegex = new RegExp(escapeRegExp(value), "i");
    const filteredRows = rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRowss(filteredRows);
  }, [value]);
  const deleteValue = () => {
    setValue("");
    setRowss([]);
  };
  return (
    <div style={{ height: "100%", width: "auto" }}>
      <TextField
        value={value}
        onChange={handlerOnchange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: value ? "visible" : "hidden" }}
              onClick={deleteValue}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <div style={{ width: "100%", height: "100%" }}>
        <DataGridPro
          rows={rowss}
          columns={columns}
          autoHeight
          className={classes.girData}
          rowHeight={40}
          pagination
          pageSize={8}
          rowsPerPageOptions={[5]}
          sortingOrder={["desc", "asc"]}
          editMode="none"
        />
      </div>
      {renderCrud()}
    </div>
  );
}
