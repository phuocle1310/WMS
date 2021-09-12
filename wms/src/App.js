import "./App.css";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
//layout
import DashboardLayoutRoute from "./components/Layout/DashboardLayoutRoute";
import LoginLayoutRoute from "./components/Layout/LoginLayoutRoute";
import AddSoPage from "./pages/client/AddSoPage";
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
            component={AddSoPage}
          ></DashboardLayoutRoute>
          <LoginLayoutRoute path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
