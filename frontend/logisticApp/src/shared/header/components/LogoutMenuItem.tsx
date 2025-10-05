import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LogoutMenuItem = () => {
  const navigate = useNavigate();

  // Обработчик для выхода из текущей сессии
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/", { replace: true });
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
