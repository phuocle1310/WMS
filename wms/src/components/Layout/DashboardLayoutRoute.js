import Grid from "@material-ui/core/Grid";
import Appbar from "./Appbar";
import MenuMain from "./MenuMain.js";
// export default Layout;
import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuClient from "./MenuClient";
const styles = makeStyles((theme) => ({
  root: {
    height: "auto",
    borderRadius: 0,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "none",
    textTransform: "capitalize",
    [theme.breakpoints.up("lg")]: {
      height: "100vh",
      display: "flex",
      width: 260,
    },
    color: "#afb2d5",
  },
  content: {
    padding: "0px 30px",
  },
}));

const DashboardLayout = ({ children, ...rest }) => {
  const classes = styles();
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={2}>
        <div className={classes.root}>
          <MenuMain>
            <MenuClient></MenuClient>
          </MenuMain>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={10}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Appbar></Appbar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.content}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <DashboardLayout>
          <Component {...matchProps} />
        </DashboardLayout>
      )}
    />
  );
};

export default DashboardLayoutRoute;
