import "./App.css";
import { Switch, Redirect, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
//layout
import DashboardLayoutRoute from "./components/Layout/DashboardLayoutRoute";
import LoginLayoutRoute from "./components/Layout/LoginLayoutRoute";
// import AddPoPage from "./pages/client/AddPoPage";
//page
import Login from "./components/Login/Login";
// import ListPoPage from "./pages/client/ListPoPage";
// import Podetail from "./pages/client/Podetail";
// import AddSoPage from "./pages/client/AddSoPage";
// import ListSoPage from "./pages/client/ListSoPage";
// import SoDetail from "./pages/client/SoDetail";
// import OrderPage from "./pages/Staff/OrderPage";
// import HomePage from "./pages/client/HomePage";
//
import { getMe } from "./store/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

//staff page
// import ManagePoPage from "./pages/Staff/ManagePoPage";

//để nó Loanding hết mấy cái file
const ManagePoPage = React.lazy(() => import("./pages/Staff/ManagePoPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const OrderPage = React.lazy(() => import("./pages/Staff/OrderPage"));
const ListPoPage = React.lazy(() => import("./pages/ListPoPage"));
const ListSoPage = React.lazy(() => import("./pages/ListSoPage"));
const AddPoPage = React.lazy(() => import("./pages/client/AddPoPage"));
const AddSoPage = React.lazy(() => import("./pages/client/AddSoPage"));
const NotFound = React.lazy(() => import("./pages/uipage/NotFound"));
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
                  path="/listso"
                  exact
                  component={ListSoPage}
                ></DashboardLayoutRoute>
                <DashboardLayoutRoute
                  path="/so"
                  exact
                  component={AddSoPage}
                ></DashboardLayoutRoute>
                {!isLoggedIn && <Redirect to="/login" />}
                <Route path="*">
                  <NotFound />
                </Route>
              </>
            )}
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;