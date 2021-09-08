import { makeStyles } from "@material-ui/core/styles";
const SecondNavigationStyles = makeStyles((theme) => ({
  secondMenu: {
    background: "#fff",
    height: "auto",
    borderRadius: 0,
    position: "fixed",
    top: 65,
    left: 0,
    right: 0,
    zIndex: 100,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    display: "none",
    [theme.breakpoints.up("lg")]: {
      height: "100vh",
      display: "flex",
      width: 230,
      boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    },
  },
  menuItem: {
    borderBottom: 0,
    width: 230,
    [theme.breakpoints.up("lg")]: {
      borderBottom: "1px solid  #D1CBCB",
      height: "70px",
      [`&:last-child`]: {
        borderBottom: 0,
      },
    },
  },
  typography: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
      padding: "5px",
    },
  },

  menuList: {
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "space-evenly",
    // alignItems: "center",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  subButton: {
    color: "#7200ca",
  },
}));
export default SecondNavigationStyles;
