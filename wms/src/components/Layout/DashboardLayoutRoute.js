import { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Appbar from "./Appbar";
import MenuMain from "./MenuMain.js";
// export default Layout;
import React, { Component } from "react";
import { Route } from "react-router-dom";

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Appbar></Appbar>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3}>
        <MenuMain></MenuMain>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        {children}
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
