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

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/project" component={Project} />
            <Route exact path="/project/:projectId" component={ProjectDetail} />
            <Route exact path="/profile" component={Profile} />
            <Route path="*">
              <Redirect to="/sign-in" />
            </Route>{" "}
          </Switch>
        </Main>
        <Route path="*">
          <Redirect to="/sign-in" />
        </Route>{" "}
      </Switch>
    </div>
  );
}

export default App;
