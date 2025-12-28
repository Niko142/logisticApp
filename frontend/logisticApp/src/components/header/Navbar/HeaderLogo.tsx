import { useNavigate } from "react-router-dom";

import styles from "../header.module.css";

import Logo from "@images/header-logo.svg";

export const HeaderLogo = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.logo} onClick={() => navigate("/app")}>
      <img src={Logo} className={styles.logoImg} alt="Logo" />
    </div>
  );
};
