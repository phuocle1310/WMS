import { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Appbar from "./Appbar";
import MenuMain from "./MenuMain.js";
// export default Layout;
import React, { Component } from "react";
import { Route } from "react-router-dom";
import MulLanguage from "../../assets/language/MulLanguage";

const language = MulLanguage[`vn`];
const listMenu = [
  { content: `${language.inputPo}`, id: 1, link: "/po" },
  { content: `${language.inputSo}`, id: 2, link: "/po" },
  { content: `${language.listPo}`, id: 3, link: "/po" },
  { content: `${language.listSo}`, id: 3, link: "/po" },
];
// inputPo: "tạo đơn đặt hàng",
// inputSo: "tạo đơn nhập hàng",
// listPo: "danh sách các đơn xuất hàng",
// listSo: "danh sách các đơn nhập hàng",

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={2}>
        <MenuMain listMenu={listMenu}></MenuMain>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={10}>
        {/* <Appbar></Appbar> */}
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Appbar></Appbar>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
