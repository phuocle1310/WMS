import { makeStyles } from "@material-ui/core/styles";
const EarningCardStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 90,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    color: "#fff",
    borderRadius: 20,
    marginRight: 0,
    "& h5,h3": {
      margin: 5,
    },
    marginBottom: 10,
    [theme.breakpoints.up("lg")]: {
      marginRight: 40,
    },
    transition: "transform .3s",
  },
  iconButton: {
    color: "#fff",
  },
  container: {
    background: "#fff",

    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
    "& div:nth-child(2)": {
      background: "#5e35b1",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
    "& div:nth-child(3)": {
      background: "#1565c0",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
    "& div:nth-child(4)": {
      background: "#1e88e5",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
    "& div:nth-child(1)": {
      background: "#4527a0",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
  },
}));
export default EarningCardStyles;
