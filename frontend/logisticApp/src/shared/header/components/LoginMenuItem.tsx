import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LoginMenuItem = (): React.ReactElement => {
  const navigate = useNavigate();

  // Обработчик для выхода из текущей сессии
  const handleLogin = (): void => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="header-menu__login">
      <button
        onClick={handleLogin}
        className="header-menu__button"
        aria-label="Вход"
      >
        <LogIn size={28} />
        <span className="header-menu__button-text">Авторизация</span>
      </button>
    </div>
  );
};
