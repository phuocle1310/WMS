import "./App.css";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
//layout
import DashboardLayoutRoute from "./components/Layout/DashboardLayoutRoute";
import LoginLayoutRoute from "./components/Layout/LoginLayoutRoute";
import AddPoPage from "./pages/client/AddPoPage";
//page
import Login from "./components/Login/Login";
import ListPoPage from "./pages/client/ListPoPage";
import Podetail from "./pages/client/Podetail";
function App() {
  return (
    <>
      <Router>
        <Switch>
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
          ></DashboardLayoutRoute>
          <LoginLayoutRoute path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
