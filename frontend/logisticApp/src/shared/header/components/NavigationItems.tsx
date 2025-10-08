import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { headerNavItems } from "../constants/headerOptions";
import { useClickOutside } from "../hooks/useClickOutside";

export const NavigationItems = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const navigationRef = useRef<HTMLUListElement | null>(null);

  const handleToggleMenu = () => setIsOpenMenu((prev) => !prev);

  const handleCloseMenu = () => setIsOpenMenu(false);

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
        {headerNavItems.map((chapter) => (
          <li key={chapter.title} onClick={handleCloseMenu}>
            <NavLink
              to={chapter.link}
              className={({ isActive }) =>
                `header__item ${isActive ? "active" : ""}`
              }
              end={chapter.link === "/app"}
            >
              {chapter.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
