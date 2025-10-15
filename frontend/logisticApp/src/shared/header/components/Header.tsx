import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderLogo from "@/assets/images/Header_logo.svg";
import { useAuth } from "@/context/auth";

import { DropdownItems } from "./DropdownItems";
import { LoginMenuItem } from "./LoginMenuItem";
import { LogoutMenuItem } from "./LogoutMenuItem";
import { NavigationItems } from "./NavigationItems";
import { useClickOutside } from "../hooks/useClickOutside";

import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { token, profile, isLoading } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Деструктуризация получаемых данных
  const { username, email } = profile || {};

  // Инициализируем хук клика вне dropdown/menu в целях закрытия
  useClickOutside(dropdownRef, () => handleCloseDropdown());

  // Обработчик закрытия dropdown с некоторой задержкой (плавность эффекта)
  const handleCloseDropdown = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsClosing(false);
    }, 250);
  };

  // Обработчик клика по иконке профиля
  const handleToggleDropdown = () => {
    return isDropdownOpen ? handleCloseDropdown() : setIsDropdownOpen(true);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="header__navbar">
          <div className="header__logo" onClick={() => navigate("/app")}>
            <img src={HeaderLogo} alt="logo" />
          </div>
          <NavigationItems />
        </nav>

        {/* Профиль пользователя */}
        {token ? (
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={() => handleToggleDropdown()}
              className="header__user-profile"
              aria-label="Профиль пользователя"
            >
              {isLoading ? (
                <span>...</span>
              ) : (
                <span>{username?.[0].toUpperCase()}</span>
              )}
            </button>

            {isDropdownOpen && (
              <div
                className={`dropdown-menu ${
                  isDropdownOpen && !isClosing ? "active" : "closing"
                }`}
              >
                <div className="dropdown-menu__header">
                  <span className="dropdown-menu__header--username">
                    {username}
                  </span>
                  <span className="dropdown-menu__header--email">{email}</span>
                </div>

                <hr className="dropdown-menu__separator" />

                <DropdownItems onClick={() => setIsDropdownOpen(false)} />

                <hr className="dropdown-menu__separator" />

                <LogoutMenuItem />
              </div>
            )}
          </div>
        ) : (
          <LoginMenuItem />
        )}
      </div>
    </header>
  );
};
