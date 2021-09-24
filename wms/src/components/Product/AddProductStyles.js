import { makeStyles } from "@material-ui/core/styles";
const AddProductStyles = makeStyles((theme) => ({
  textField: {
    padding: 0,
    margin: 0,
    float: "left",
    [`& fieldset`]: {
      borderRadius: 25,
      border: "1px solid #c5cae9",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      margin: 0,
      marginLeft: 0,
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
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30%",
    },
  },
  submit: {
    margin: theme.spacing(1),
    background: "#E4544B",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 40,
    width: "170px",
    padding: "0 30px",
    "&:hover": {
      background: "#E4544B",
    },
    float: "left",
    fontSize: 13,
    "&:first-child": {
      background: "#000",
      marginRight: 20,
      width: "100px",
      [theme.breakpoints.up("lg")]: {
        marginRight: 75,
      },
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
      width: "180px",
    },
  },
  label: {
    textTransform: "capitalize",
  },
  product: {
    rowGap: "10px",
    "& div": {
      marginRight: 10,
      marginBottom: 5,
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
export default AddProductStyles;
