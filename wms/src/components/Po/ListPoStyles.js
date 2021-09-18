import { makeStyles } from "@material-ui/core/styles";
const ListPoStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    // color: "#4251b5",
    padding: 5,
    "& .MuiDataGrid-columnHeaderWrapper": {
      // background: "#4251b5",
      color: "#fff",
    },
    "& .MuiDataGrid-columnsContainer": {
      background: "#4251b5",
    },
  },
  alert: {
    width: "120px",
  },
  overlay: {
    flexDirection: "column",
    "& .ant-empty-img-1": {
      fill: theme.palette.type === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.type === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.type === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.type === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.type === "light" ? "0.8" : "0.08",
      fill: theme.palette.type === "light" ? "#f5f5f5" : "#fff",
    },
  },
  root1: {
    padding: theme.spacing(0.5, 0.5, 0),
    justifyContent: "space-between",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  textField: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    margin: theme.spacing(1, 0.5, 1.5),
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(0.5),
    },
    "& .MuiInput-underline:before": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}));
export default ListPoStyles;
