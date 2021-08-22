import { Link } from "react-router-dom";

import classes from "./modules/MainNav.module.css";

function MainNav() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>SAIDS</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/reportes">Reportes</Link>
          </li>
          <li>
            <Link to="user">Icono</Link>
          </li>
          <li>
            <Link to="login">Iniciar sesion</Link>
          </li>
          <li>
            <Link to="registro">Registrarse</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
