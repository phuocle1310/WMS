import { makeStyles } from "@material-ui/core/styles";

const AppBarStyles = makeStyles((theme) => ({
  main: {
    // position: "fixed",
    // top: 0,
    // left: 0,
    // right: 0,
    // zIndex: 100,
    color: "#000",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  mainMenu: {
    backgroundColor: "#fff",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    color: "#000",
    [theme.breakpoints.up("lg")]: {
      //   backgroundColor: "#000",
      color: "#000",
    },
  },
  title: {
    // display: "none",
    // color: "#000",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "#000",
    [theme.breakpoints.up("lg")]: {
      color: "#7200ca",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  sectionMobi: {
    display: "block",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "20px",

    "& h3": {
      display: " inline",
      marginLeft: "10px",
      fontSize: "15px",
      fontStyle: "normal",
    },
  },
  button: {
    backgroundColor: "#F5F3F3",
    color: "#7200ca",
    "&:hover": {
      backgroundColor: "#F5F3F3",
      color: "#7200ca",
    },
  },
  subButton: {
    color: "#7200ca",
  },
  logo: {
    color: "#000",
  },
  // Popover: {
  //   // backgroundColor: "#F5F3F3",
  //   left: 0,
  // },
}));
export default AppBarStyles;
