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
}));
export default PoItemStyles;
