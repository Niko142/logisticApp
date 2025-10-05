import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserProfile } from "@/api";
import type { ProfileResponse } from "@/api/types";
import HeaderLogo from "@/assets/images/Header_logo.svg";

import { DropdownItems } from "./DropdownItems";
import { LoginMenuItem } from "./LoginMenuItem";
import { LogoutMenuItem } from "./LogoutMenuItem";
import { NavigationItems } from "./NavigationItems";
import { useClickOutside } from "../hooks/useClickOutside";

import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("auth_token"); // Проверяем, есть ли токен авторизации

  // Деструктуризация получаемых данных
  const { profile } = profileData || {};
  const { username, email } = profile || {};

  // Инициализируем хук клика вне dropdown/menu в целях закрытия
  useClickOutside(dropdownRef, () => handleCloseDropdown());

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    // Формируем получение данных о профиле пользователя
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile({ signal: controller.signal });
        setProfileData(userData);
      } catch (err) {
        if (err instanceof Error && err.message !== "CanceledError") {
          console.error(err.message);
        }
        return null;
      }
    };
    fetchProfile();

    return () => controller.abort();
  }, [token]);

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
          <div className="header__logo" onClick={() => navigate("/main")}>
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
              <span>{username?.[0].toUpperCase()}</span>
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
