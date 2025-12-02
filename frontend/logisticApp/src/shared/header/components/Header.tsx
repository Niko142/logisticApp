import { Activity, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DROPDOWN_DELAY } from "@/constants/delay";
import { useAuth } from "@/providers/auth";

import { DropdownItems } from "./DropdownItems";
import { LoginMenuItem } from "./LoginMenuItem";
import { LogoutMenuItem } from "./LogoutMenuItem";
import { NavigationItems } from "./NavigationItems";
import { useClickOutside } from "../../../hooks/useClickOutside";

import HeaderLogo from "@images/header-logo.svg";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { token, profile, isLoading } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Деструктуризация получаемых данных
  const { username, email } = profile || {};

  // Инициализируем хук клика вне dropdown/menu в целях закрытия
  useClickOutside(dropdownRef, () => handleCloseDropdown());

  // Обработчик закрытия dropdown с некоторой задержкой
  const handleCloseDropdown = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsClosing(false);
    }, DROPDOWN_DELAY);
  };

  // Обработчик клика по иконке профиля
  const handleToggleDropdown = (): void => {
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

            <Activity mode={isDropdownOpen ? "visible" : "hidden"}>
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
            </Activity>
          </div>
        ) : (
          <LoginMenuItem />
        )}
      </div>
    </header>
  );
};
