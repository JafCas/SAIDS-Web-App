import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Inicio from "./pages/Inicio";
//import Login from "./pages/Login";
import LoginButton from "./pages/userlogs/Login";
import LogoutButton from "./pages/userlogs/Logout";
import Profile from "./pages/userlogs/Profile";
import Registro from "./pages/Registro";
import Reportes from "./pages/Reportes";

import { useAuth0 } from "@auth0/auth0-react";
//import User from "./pages/User";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Inicio />
        </Route>
        <Route path="/reportes">
          <Reportes />
        </Route>
        <Route path="/user">
          {isAuthenticated ? <Profile /> : <LoginButton />}
        </Route>
        <Route path="/login">
          <LoginButton />
          <LogoutButton />
        </Route>
        <Route path="/registro">
          <Registro />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
