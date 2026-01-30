import { useNavigate } from "react-router-dom";

import { APP_BASE_PATH } from "@/constants/domain";

import styles from "../header.module.css";

import Logo from "@images/header-logo.svg";

export const HeaderLogo = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.logo} onClick={() => navigate(APP_BASE_PATH)}>
      <img src={Logo} className={styles.logoImg} alt="Logo" />
    </div>
  );
};
