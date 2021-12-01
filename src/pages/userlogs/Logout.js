import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./modules/button.module.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className={styles.btn}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
