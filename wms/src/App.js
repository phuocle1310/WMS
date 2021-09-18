import "./App.css";
import { Switch, Redirect, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect } from "react";
//layout
import DashboardLayoutRoute from "./components/Layout/DashboardLayoutRoute";
import LoginLayoutRoute from "./components/Layout/LoginLayoutRoute";
import AddPoPage from "./pages/client/AddPoPage";
//page
import Login from "./components/Login/Login";
import ListPoPage from "./pages/client/ListPoPage";
import Podetail from "./pages/client/Podetail";
//
import { getMe } from "./store/userSlice";
import { getProductBySupplier } from "./store/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const action = getMe();
        const actionResult = await dispatch(action);
        unwrapResult(actionResult);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogin();
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <LoginLayoutRoute path="/login" component={Login} />
          {!isLoggedIn && <Redirect to="/login" />}
          {isLoggedIn && (
            <>
              <DashboardLayoutRoute
                path="/"
                exact
                component={Podetail}
              ></DashboardLayoutRoute>
              <DashboardLayoutRoute
                path="/listpo"
                exact
                component={ListPoPage}
              ></DashboardLayoutRoute>
              <DashboardLayoutRoute
                path="/po"
                exact
                component={AddPoPage}
              ></DashboardLayoutRoute>{" "}
            </>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;