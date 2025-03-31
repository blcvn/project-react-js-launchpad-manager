import "antd/dist/antd.css";
import { Redirect, Route, Switch } from "react-router-dom";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import { ROUTES_PATH } from "./constant/path";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={ROUTES_PATH.SIGN_UP} exact component={SignUp} />
        <Route path={ROUTES_PATH.SIGN_IN} exact component={SignIn} />
        <Main>
          <Switch>
            <Route exact path={ROUTES_PATH.HOME} component={Home} />
            <Route exact path={ROUTES_PATH.USER} component={User} />
            <Route exact path={ROUTES_PATH.PROJECT} component={Project} />
            <Route
              exact
              path={ROUTES_PATH.PROJECT_DETAIL}
              component={ProjectDetail}
            />
            <Route exact path={ROUTES_PATH.PROFILE} component={Profile} />
            <Route path="*">
              <Redirect to={ROUTES_PATH.SIGN_IN} />
            </Route>{" "}
          </Switch>
        </Main>
        <Route path="*">
          <Redirect to={ROUTES_PATH.SIGN_IN} />
        </Route>{" "}
      </Switch>
    </div>
  );
}

export default App;
