import { Link } from "react-router-dom";
import img1 from "../../images/Logo.png";

import { BiUserCircle } from "react-icons/bi";

import classes from "./modules/MainNav.module.css";

function MainNav() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        
        <Link to="/" id={classes.SAIDS}><img src={img1} alt="Logo"/>SAIDS</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/reportes">Reportes</Link>
          </li>
          <li>
            <Link to="user">
              <BiUserCircle size={40} className={classes.icono} />
            </Link>
          </li>
          {/*<li>
            <Link to="login">Iniciar sesion</Link>
          </li>
          <li>
            <Link to="registro">Registrarse</Link>
          </li>*/}
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
