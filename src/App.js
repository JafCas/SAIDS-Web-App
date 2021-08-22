import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Reportes from "./pages/Reportes";
import User from "./pages/User";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Inicio />
        </Route>
        <Route path="/reportes">
          <Reportes />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registro">
          <Registro />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
