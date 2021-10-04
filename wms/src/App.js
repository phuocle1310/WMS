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
import AddSoPage from "./pages/client/AddSoPage";
import ListSoPage from "./pages/client/ListSoPage";
import SoDetail from "./pages/client/SoDetail";
import OrderPage from "./pages/Staff/OrderPage";
import HomePage from "./pages/client/HomePage";
//
import { getMe } from "./store/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
//staff page
import ManagePoPage from "./pages/Staff/ManagePoPage";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector((state) => state.user.currentUser.role);
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
          {!isLoggedIn ? (
            <LoginLayoutRoute path="/" exact component={Login} />
          ) : (
            <DashboardLayoutRoute
              path="/"
              exact
              component={HomePage}
            ></DashboardLayoutRoute>
          )}
          {isLoggedIn && (
            <>
              <DashboardLayoutRoute
                path="/receipts"
                exact
                component={ManagePoPage}
              ></DashboardLayoutRoute>
              <DashboardLayoutRoute
                path="/orders"
                exact
                component={OrderPage}
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
              ></DashboardLayoutRoute>
              <DashboardLayoutRoute
                path="/so"
                exact
                component={AddSoPage}
              ></DashboardLayoutRoute>
              <DashboardLayoutRoute
                path="/so/:soId"
                exact
                component={SoDetail}
              ></DashboardLayoutRoute>
              <DashboardLayoutRoute
                path="/po/:poId"
                exact
                component={Podetail}
              ></DashboardLayoutRoute>
              <DashboardLayoutRoute
                path="/listso"
                exact
                component={ListSoPage}
              ></DashboardLayoutRoute>
              {!isLoggedIn && <Redirect to="/login" />}
            </>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;