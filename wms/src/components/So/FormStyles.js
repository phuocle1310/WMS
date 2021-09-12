import { makeStyles } from "@material-ui/core/styles";
const FormStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "99%",
    "& > *": {
      margin: "1%",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
        margin: 80,
      },
    fontSize: 13,
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    color: "#616161",
    "& .MuiSelect-selectMenu": {
      color: "#6a1b9a",
      minWidth: "210px",
      padding: 9.5,
      background: "white",
      border: "1px solid #c5cae9",
      borderRadius: 30,
    },
  },
  labelId: {
    fontWeight: "bold",
    display: "inline",
    margin: 0,
    float: "left",
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
    flexDirection: "row",
    "& nav": {
      width: "70%",
    },
    "& nav:first-child": {
      width: "30%",
    },
  },
  box1: {
    width: "100%",
  },
  textField: {
    padding: 0,
    margin: 0,
    float: "left",
    [`& fieldset`]: {
      borderRadius: 25,
      width: "220px",
      border: "1px solid #c5cae9",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      margin: 0,
      marginLeft: 0,
    },
    "& .MuiSelect-root": {
      //   width: 180,
      "& .MuiSelect-iconOutlined": {
        background: "#000",
      },
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
        width: "220px",
      },
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

    background: "#4345de",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 48,
    // width: "100px",
    padding: "0 30px",
    "&:hover": {
      background: "#4345de",
    },
    float: "left",
    marginRight: 15,
    fontSize: 13,
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
    },
  },
  label: {
    textTransform: "capitalize",
  },
  button: {
    margin: theme.spacing(3, 0, 2),

    background: "#4345de",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 40,
    fontSize: 13,
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
    },
    padding: "0 30px",
    "&:hover": {
      background: "#4345de",
    },
    float: "left",
    marginRight: 15,
  },
}));
export default FormStyles;
