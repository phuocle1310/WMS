import { makeStyles } from "@material-ui/core/styles";
const AddProductStyles = makeStyles((theme) => ({
  textField: {
    padding: 0,
    margin: 0,
    float: "left",
    [`& fieldset`]: {
      borderRadius: 25,
      //   width: "200px",
      border: "1px solid #c5cae9",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      margin: 0,
      marginLeft: 0,
    },
    "& .MuiSelect-root": {
      // background: "#000",
      width: 180,
      "& .MuiSelect-iconOutlined": {
        // background: "#000",
      },
    },
    fontSize: 13,
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
    },
  },
  textFieldDate: {
    padding: 0,
    margin: 0,
    float: "left",
    marginLeft: 0,
    [`& .MuiOutlinedInput-root`]: {
      borderRadius: 25,
      border: "none",
      [`& fieldset`]: {
        border: "1px solid #c5cae9",
        // width: "200px",
      },
    },
    fontSize: 13,
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
    },
  },
  box: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
  },
  boxChild: {
    marginBottom: 20,
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  },
}));
export default AddProductStyles;
