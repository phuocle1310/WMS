import { makeStyles } from "@material-ui/core/styles";

const LoginStyles = makeStyles((theme) => ({
  root: {
    height: "100vh", //100vh
  },
  left: {
    textAlign: "center",
    margin: 0,
    height: "100%", //100vh
    // background: "#bcd3fb",
  },
  right: {
    height: "100%",
    textAlign: "center",
    margin: 0,
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default LoginStyles;
