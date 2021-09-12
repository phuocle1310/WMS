import { makeStyles } from "@material-ui/core/styles";
const SecondNavigationStyles = makeStyles((theme) => ({
  secondMenu: {
    background: "#0b2559",
    height: "auto",
    borderRadius: 0,
    zIndex: 100,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    textTransform: "capitalize",
    [theme.breakpoints.up("lg")]: {
      height: "100vh",
      display: "flex",
      width: 260,
    },
    color: "#afb2d5",
  },
  menuItem: {
    borderBottom: 0,
    width: 230,
    color: "#afb2d5",
    fontSize: "15px",
    "& p": {
      margin: 0,
      // padding: 0,
      // color: "#fff",
    },
    "&:first-child": {
      color: "#0699ff",
      fontSize: "20px",
      fontWeight: 900,
    },
    [theme.breakpoints.up("lg")]: {
      height: "60px",
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
    paddingLeft: 0,
  },
  root: {
    minWidth: 100,
    padding: 0,
  },
  tag: {
    borderRadius: "0 3px 3px 0",
    // borderLeft: `3px solid #0699ff}`,
    // fontWeight: "bold",
    padding: "8px 16px",
    // background: "#000",
  },
  tags: {
    marginLeft: 1,
  },
  toggled: {
    // "& .JupiterRowToggle-action-11": {
    color: "#5f739b !important",
    background: "none !important",
    // },
  },
}));
export default SecondNavigationStyles;
