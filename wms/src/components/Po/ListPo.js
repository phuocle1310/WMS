// import * as React from "react";
// import { XGrid } from "@material-ui/x-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
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
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
//print
import ReactToPrint from "react-to-print";
//css
import ListPoStyles from "./ListPoStyles";

export default function DataGridProDemo() {
  const classes = ListPoStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const columns = [
    {
      field: "id",
      headerName: language.id,
      sortable: true,
      width: 130,
    },
    {
      field: "createDate",
      headerName: language.dateCreated,
      sortable: false,
      width: 130,
    },
    {
      field: "inputDate",
      headerName: language.importDate,
      sortable: false,
      width: 130,
    },
    {
      field: "quantity",
      headerName: language.quantity,
      sortable: false,
      width: 130,
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
      headerName: language.detail,
      sortable: false,
      width: 160,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <NavLink
            to="/faq"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
            style={{ textDecoration: "none" }}
          >
            {language.see}
          </NavLink>
        );
      },
    },
  ];
  const rows = [
    {
      id: 1,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "FAILED",
      quantity: "30",
      detail: "aa",
    },
    {
      id: 2,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "PENDING",
      quantity: "30",
      detail: "aa",
    },
    {
      id: 3,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "FAILED",
      quantity: "30",
      detail: "aa",
    },
    {
      id: 4,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "PENDING",
      quantity: "30",
      detail: "aa",
    },
    {
      id: 5,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "FAILED",
      quantity: "30",
      detail: "aa",
    },
    {
      id: 6,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "PENDING",
      quantity: "30",
      detail: "aa",
    },
    {
      id: 7,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "FAILED",
      quantity: "30",
      detail: "aa",
    },
    {
      id: 8,
      createDate: "2000-1-1",
      inputDate: "2002-1-1",
      status: "DONE",
      quantity: "30",
      detail: "aa",
    },
  ];
  //hàm show trạng thái
  const showAlert = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Alert severity="warning" variant="filled" className={classes.alert}>
            {language.PENDING}
          </Alert>
        );
      case "ACCEPTED":
        return (
          <Alert severity="info" variant="filled" className={classes.alert}>
            {language.ACCEPTED}
          </Alert>
        );
      case "FAILED":
        return (
          <Alert severity="error" variant="filled" className={classes.alert}>
            {language.FAILED}
          </Alert>
        );
      case "DONE":
        return (
          <Alert severity="success" variant="filled" className={classes.alert}>
            {language.DONE}
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

  const [rowss, setRowss] = React.useState(rows);
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  const CustomToolbar = () => {
    return (
      <div className={classes.root1}>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
    );
  };
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
    <div style={{ height: 520, width: "auto" }}>
      <TextField
        value={value}
        onChange={handlerOnchange}
        placeholder={language.sreach}
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
      <DataGridPro
        rows={rowss}
        columns={columns}
        className={classes.root}
        rowHeight={40}
        checkboxSelection
        pagination
        pageSize={8}
        rowsPerPageOptions={[5]}
        sortingOrder={["desc", "asc"]}
        editMode="none"
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}