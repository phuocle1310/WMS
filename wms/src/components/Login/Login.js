import React from "react";
import { Grid, CssBaseline, Paper } from "@material-ui/core";
import Wave from "react-wavify";
import FormLogin from "./FormLogin";
import LoginStyles from "./LoginStyles";
import SlideShow from "../UI/SlideShow";
export default function Login() {
  const classes = LoginStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={7}>
        <div className={classes.left}>
          <div>
            <SlideShow></SlideShow>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={12} square>
        <FormLogin></FormLogin>
      </Grid>
    </Grid>
  );
}
