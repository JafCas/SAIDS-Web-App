import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./modules/button.module.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.header}>
      <button className={styles.btn} onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
