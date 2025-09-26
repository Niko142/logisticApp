import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import HeaderLogo from "@/assets/icons/Header_logo.svg";

import { headerChapters } from "./constants/headerOptions";

import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

  // Обработчик для выхода из текущей сессии
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <img src={HeaderLogo} alt="logo" />
        </div>
        <nav className="header__navbar">
          <ul>
            {headerChapters.map((chapter) => (
              <li key={chapter.title}>
                <NavLink
                  to={`/${chapter.link}`}
                  className={({ isActive }) =>
                    isActive ? "header__item active" : "header__item"
                  }
                >
                  {chapter.title}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="header__item item--exit"
                aria-label="Выход"
              >
                <LogOut size={28} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
