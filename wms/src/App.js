import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NestedMenu from "./components/Layout/MenuMain.js";
import Appbar from "./components/Layout/Appbar";
//layout
import DashboardLayoutRoute from "./components/Layout/DashboardLayoutRoute";
import LoginLayoutRoute from "./components/Layout/LoginLayoutRoute";
//page
import Login from "./components/Login/Login";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <DashboardLayoutRoute
            path="/"
            exact
            component={Login}
          ></DashboardLayoutRoute>
          <LoginLayoutRoute path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
