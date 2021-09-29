import ListPoStyles from "../Po/ListPoStyles";
// //api
import receiptApi from "../../api/receiptApi";
import * as React from "react";
import { useState, useEffect } from "react";
import { DataGridPro, GridOverlay } from "@mui/x-data-grid-pro";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import CustomizedDialogs from "../UI/CustomizedDialogs";
import ReceiptItem from "./ReceiptItem";
import Print from "../../components/UI/Print";
import moment from "moment";
export default function DataGridProDemo(props) {
  const classes = ListPoStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  let [rows, setrows] = useState([]);
  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const action = await receiptApi.getAllReceipt(props.id);

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
    fetchLogin();
  }, [props.id]);
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
          <IconButton
            onClick={() => {
              hanlerViewReceipt(id);
            }}
            color="primary"
            aria-label="upload picture"
            component="span"
            // disabled={listProduct.length < product1.length ? false : true}
            classes={{
              root: classes.button, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];
  //lấy id idReceipt cần show
  const [idReceipt, setIdReceipt] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function hanlerViewReceipt(params) {
    //the thing  you wanna do
    setIdReceipt(params);
    handleClickOpen();
  }
  //hàm xuất hiện thông báo
  function CustomNoRowsOverlay() {
    const classes = ListPoStyles();

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
  //xử ls data item

  const [rowss, setRowss] = React.useState(rows);
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
          checkboxSelection
          pagination
          pageSize={8}
          rowsPerPageOptions={[5]}
          sortingOrder={["desc", "asc"]}
          editMode="none"
        />
      </div>
      {/* show 1 receipt */}
      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        children={
          <Print>
            <ReceiptItem id={idReceipt}></ReceiptItem>
          </Print>
        }
      ></CustomizedDialogs>
    </div>
  );
}
