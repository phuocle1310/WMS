import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    snackbar: {
      bottom: 100,
      [theme.breakpoints.down("xs")]: {
        bottom: 90,
      },
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className={classes.snackbar}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
      >
        <Alert onClose={props.handleClose} severity={props.nameAlert}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
