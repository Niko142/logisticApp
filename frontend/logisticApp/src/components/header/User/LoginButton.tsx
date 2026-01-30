import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/components/ui/Icon";
import { LOGIN_PATH } from "@/constants/domain";

import styles from "../header.module.css";

export const LoginButton = (): React.ReactElement => {
  const navigate = useNavigate();

  // Обработчик для выхода из текущей сессии
  const handleLogin = (): void => {
    navigate(LOGIN_PATH, { replace: true });
  };

  return (
    <div className={styles.login}>
      <button
        onClick={handleLogin}
        className={styles.loginButton}
        aria-label="Вход"
      >
        <Icon icon={LogIn} color="white" />
        <span>Авторизация</span>
      </button>
    </div>
  );
};
