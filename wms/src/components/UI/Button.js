import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "linear-gradient(to right, #8e2de2, #4a00e0)",
    borderRadius: 15,
    border: 0,
    color: "white",
    height: 40,
    width: "100%",
    padding: "0 30px",
    textTransform: "capitalize",
  },
}));

export default function Buttons() {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<AttachMoneyIcon />}
      >
        Đấu giá
      </Button>
    </div>
  );
}
