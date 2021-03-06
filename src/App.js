import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
//import DataTable from 'react-data-table-component';

import Inicio from "./pages/Inicio";
//import Login from "./pages/Login";
import LoginButton from "./pages/userlogs/Login";
import LogoutButton from "./pages/userlogs/Logout";
import Profile from "./pages/userlogs/Profile";
import Registro from "./pages/Registro";
//import Reportes from "./pages/Reportes";
import Reporte from "./pages/ReporteI";

import CreateUser from "./components/CreateUser";
import CreateRecord from "./components/CreateRecord";
//import RecordList from "./components/RecordList"
import RecordTable from "./components/RecordTable"

import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
//import { Button } from "./components/layout/buttons/Button";
//import User from "./pages/User";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Inicio />
        </Route>
        <ProtectedRoute path="/reportes" component={RecordTable} />
          {/*<RecordList />*/}
          {/*<Reportes />*/}
          {/*<RecordTable />*/}
        {/*</Route>*/}
        <Route path="/reportes/:id">
          <Reporte />
        </Route>
        
        <Route path="/user">
          {isAuthenticated ? (<Profile />) : (<LoginButton />)}
        </Route>
        <Route path="/login">
          <LoginButton />
          <LogoutButton />
        </Route>
        <Route path="/registro">
          <Registro />
        </Route>
        <Route path="/users"><CreateUser /></Route>
        <Route path="/crecord"><CreateRecord /></Route>
        {/*<Route path="/relist"><RecordTable /></Route>*/}
      </Switch>
    </Layout>
  );
}

export default App;
