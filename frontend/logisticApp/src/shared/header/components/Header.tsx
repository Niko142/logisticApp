import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getUserProfile } from "@/api";
import type { ProfileResponse } from "@/api/types";
import HeaderLogo from "@/assets/images/Header_logo.svg";

import { NavigationItems } from "./NavigationItems";
import { useClickOutside } from "../hooks/useClickOutside";

import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Деструктуризация получаемых данных
  const { profile } = profileData || {};
  const { username, email } = profile || {};

  useEffect(() => {
    const controller = new AbortController();

    // Формируем получение данных о профиле пользователя
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile({ signal: controller.signal });
        setProfileData(userData);
      } catch (err) {
        console.error("Ошибка:", err instanceof Error ? err.message : err);
      }
    };
    fetchProfile();

    return () => controller.abort();
  }, []);

  // Инициализируем хук для управления показа dropdown/menu
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  // Обработчик для выхода из текущей сессии
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/", { replace: true });
  };

  // Обработчик для возвращения на стартовый основной экран
  const handleResetPage = () => {
    navigate("/main");
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="header__navbar">
          <div className="header__logo" onClick={handleResetPage}>
            <img src={HeaderLogo} alt="logo" />
          </div>
          <ul>
            <NavigationItems />
          </ul>
        </nav>

        {/* Профиль пользователя */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="header__user-profile"
            aria-label="Профиль пользователя"
          >
            <span>{username?.[0].toUpperCase()}</span>
          </button>

          {/* TODO: Добавить closing для плавности */}

          {isDropdownOpen ? (
            <div
              className={`dropdown-menu ${
                isDropdownOpen ? "active" : "closing"
              }`}
            >
              <div className="dropdown-menu__header">
                <span className="dropdown-menu__header--username">
                  {username}
                </span>
                <span className="dropdown-menu__header--email">{email}</span>
              </div>

              <hr className="dropdown-menu__separator" />

              <div className="dropdown-menu__content">
                <Link
                  to="/account"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User size={22} />
                  <span>Профиль</span>
                </Link>

                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings size={22} />
                  <span>Настройки</span>
                </Link>
              </div>

              <hr className="dropdown-menu__separator" />

              {/* Logout */}
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
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};
