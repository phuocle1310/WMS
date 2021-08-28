import { makeStyles } from "@material-ui/core/styles";
const FormLoginStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(8, 4),
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(8, 4),
    },
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(5, 12),
    },
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(3, 0, 2, 0),
  },
  avatar: {
    padding: theme.spacing(1),
  },
  signupForm: {
    marginBottom: 3,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

    background: "#4345de",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 48,
    width: "100%",
    padding: "0 30px",
  },
  label: {
    textTransform: "capitalize",
  },
  signup: {
    background: "#fff",
    borderRadius: 25,
    border: 0,
    color: "#4a00e0",
    height: 48,
    width: "100%",
    padding: "0 30px",
  },

  textField: {
    [`& fieldset`]: {
      borderRadius: 25,
    },
  },
  color: {
    color: "#4251b5",
  },
}));
export default FormLoginStyles;
