import { makeStyles } from "@material-ui/core/styles";

const LoginStyles = makeStyles((theme) => ({
  root: {
    height: "10vh", //100vh
  },
  left: {
    textAlign: "center",
    margin: 0,
  },
  right: {
    height: "100vh",
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
