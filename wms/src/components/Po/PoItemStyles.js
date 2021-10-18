import { makeStyles } from "@material-ui/core/styles";
const PoItemStyles = makeStyles((theme) => ({
  title: {
    color: "#4251b5",
    fontWeight: 600,
    textTransform: "uppercase",
    textAlign: "center",
  },
  left: {
    color: "#4251b5",
    fontWeight: 600,
  },

  box: {
    width: "100%",
    padding: 10,
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
  },
  textChild: {
    display: "flex",
    "& p:first-child": {
      marginRight: 10,
      color: "#4251b5",
      fontWeight: 600,
    },
    "& p": {
      margin: 7,
    },
  },
  text: {
    padding: 15,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  list: {
    padding: 15,
    marginTop: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#E4544B",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 40,
    // width: "100px",
    padding: "0 30px",
    "&:hover": {
      background: "#E4544B",
    },
    float: "left",
    marginRight: 4,
    fontSize: 13,
    // "&:first-child": {
    //   background: "#000",
    // },
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
      marginRight: 15,
    },
  },
  label: {
    textTransform: "capitalize",
  },
}));
export default PoItemStyles;
