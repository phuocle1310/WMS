// import * as React from "react";
// import { XGrid } from "@material-ui/x-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";

import * as React from "react";
import { useState } from "react";
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid-pro";
// import { useDemoData } from "@mui/x-data-grid-generator";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    color: "#4251b5",
    marginTop: 80,
    padding: 5,
    "& .MuiDataGrid-columnHeaderWrapper": {
      background: "#4251b5",
      color: "#fff",
    },
  },
}));
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function DataGridProDemo() {
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 4, lastName: "Lannister", firstName: "Cersei", age: 42 },
  ];

  return (
    <div style={{ height: 520, width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        // loading={data.rows.length === 0}
        className={classes.root}
        rowHeight={38}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
