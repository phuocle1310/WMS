import { makeStyles } from "@material-ui/core/styles";
const PageStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    color: "#4251b5",
    padding: 5,
  },
  tabs: {
    margin: "auto",
    textAlign: "center",
  },
  tab: {
    // background: "red",
    height: "5px",
    textTransform: "capitalize",
    border: "2px solid #ede7f6",
    borderBottom: "none",
    // width: 120,
    [theme.breakpoints.up("lg")]: {
      width: "auto",
    },
  },
  box: {
    borderBottom: "1px solid #ede7f6",
    width: "90%",
  },
}));

export default PageStyles;
