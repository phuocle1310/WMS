import "./App.css";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
//layout
import DashboardLayoutRoute from "./components/Layout/DashboardLayoutRoute";
import LoginLayoutRoute from "./components/Layout/LoginLayoutRoute";
import { getMe } from "./store/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

//để nó Loanding hết mấy cái file
const ManagePoPage = React.lazy(() => import("./pages/Staff/ManagePoPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const OrderPage = React.lazy(() => import("./pages/Staff/OrderPage"));
const ListPoPage = React.lazy(() => import("./pages/ListPoPage"));
const ListSoPage = React.lazy(() => import("./pages/ListSoPage"));
const AddPoPage = React.lazy(() => import("./pages/client/AddPoPage"));
const AddSoPage = React.lazy(() => import("./pages/client/AddSoPage"));
const NotFound = React.lazy(() => import("./pages/uipage/NotFound"));
const Login = React.lazy(() => import("./components/Login/Login"));
const NotPermission = React.lazy(() => import("./pages/uipage/NotPermission"));
const ImportPage = React.lazy(() => import("./pages/Staff/ImportPage"));
const ExportPage = React.lazy(() => import("./pages/Staff/ExportPage"));
function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector((state) => state.user.currentUser.role);
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
      <Suspense
        fallback={
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        }
      >
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
            {role !== "USER" ? (
              <DashboardLayoutRoute
                path="/receipts"
                component={NotPermission}
              ></DashboardLayoutRoute>
            ) : (
              <DashboardLayoutRoute
                path="/receipts"
                component={ManagePoPage}
              ></DashboardLayoutRoute>
            )}
            {role !== "USER" ? (
              <DashboardLayoutRoute
                path="/import"
                component={NotPermission}
              ></DashboardLayoutRoute>
            ) : (
              <DashboardLayoutRoute
                path="/import"
                component={ImportPage}
              ></DashboardLayoutRoute>
            )}
            {role !== "USER" ? (
              <DashboardLayoutRoute
                path="/export"
                component={NotPermission}
              ></DashboardLayoutRoute>
            ) : (
              <DashboardLayoutRoute
                path="/export"
                component={ExportPage}
              ></DashboardLayoutRoute>
            )}
            {role !== "USER" ? (
              <DashboardLayoutRoute
                path="/orders"
                component={NotPermission}
              ></DashboardLayoutRoute>
            ) : (
              <DashboardLayoutRoute
                path="/orders"
                exact
                component={OrderPage}
              ></DashboardLayoutRoute>
            )}
            {isLoggedIn && (
              <DashboardLayoutRoute
                path="/listpo"
                exact
                component={ListPoPage}
              ></DashboardLayoutRoute>
            )}
            {role !== "USER" ? (
              <DashboardLayoutRoute
                path="/po"
                exact
                component={AddPoPage}
              ></DashboardLayoutRoute>
            ) : (
              <DashboardLayoutRoute
                path="/po"
                exact
                component={NotPermission}
              ></DashboardLayoutRoute>
            )}
            {role !== "USER" ? (
              <DashboardLayoutRoute
                path="/so"
                exact
                component={AddSoPage}
              ></DashboardLayoutRoute>
            ) : (
              <DashboardLayoutRoute
                path="/so"
                exact
                component={NotPermission}
              ></DashboardLayoutRoute>
            )}
            {isLoggedIn && (
              <DashboardLayoutRoute
                path="/listso"
                exact
                component={ListSoPage}
              ></DashboardLayoutRoute>
            )}
            {isLoggedIn && (
              <Route path="*">
                <NotFound />
              </Route>
            )}
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;