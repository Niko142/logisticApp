import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/providers/auth";

import styles from "../header.module.css";

export const LogoutButton = (): React.ReactElement => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Обработчик для выхода из текущей сессии
  const handleLogout = (): void => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.logout}>
      <button
        onClick={handleLogout}
        className={styles.logoutButton}
        aria-label="Выход"
      >
        <Icon icon={LogOut} variant="close" />
        <span>Выход</span>
      </button>
    </div>
  );
};
