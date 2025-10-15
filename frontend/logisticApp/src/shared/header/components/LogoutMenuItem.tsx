import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/auth";

export const LogoutMenuItem = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Обработчик для выхода из текущей сессии
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dropdown-menu__logout">
      <button
        onClick={handleLogout}
        className="dropdown-menu__button"
        aria-label="Выход"
      >
        <LogOut size={28} />
        <span className="dropdown-menu__button-text">Выход</span>
      </button>
    </div>
  );
};
