import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { useClickOutside } from "@/hooks/useClickOutside";

import { navigationItems } from "../constants/headerOptions";

export const NavigationItems = (): React.ReactElement => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const navigationRef = useRef<HTMLUListElement | null>(null);

  const handleToggleMenu = (): void => setIsOpenMenu((prev) => !prev);
  const handleCloseMenu = (): void => setIsOpenMenu(false);

  // Инициализируем хук для отслеживания кликов
  useClickOutside(navigationRef, () => handleCloseMenu());

  return (
    <div style={{ position: "relative" }}>
      {/* Burger-кнопка для мобильных экранов */}
      <button
        className="navigation__burger"
        aria-label="Burger-кнопка для мобильных"
        onClick={handleToggleMenu}
      >
        {isOpenMenu ? (
          <X size={32} color="var(--white)" />
        ) : (
          <Menu size={32} color="var(--blue)" />
        )}
      </button>

      {/* Основное меню */}
      <ul
        ref={navigationRef}
        className={`navigation__list ${isOpenMenu ? "active" : ""}`}
      >
        {navigationItems.map((item) => (
          <li key={item.title} onClick={handleCloseMenu}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `header__item ${isActive ? "active" : ""}`
              }
              end={item.link === "/app"}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
