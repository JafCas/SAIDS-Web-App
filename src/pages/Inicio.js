import img1 from "../images/Logo.png";
import classes from "./modules/Inicio.module.css";

function Inicio(props) {
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.description}>
          Usa este portal para acceder a los rpeortes de análisis de los
          participantes
        </div>
        <div className={classes.image}>
          <img src={img1} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Inicio;
