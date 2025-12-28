import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

import { navigationItems } from "@/constants/data";
import { useClickOutside } from "@/hooks/useClickOutside";

import BurgerButton from "./BurgerButton";
import styles from "../header.module.css";
import { NavigationList } from "./NavigationList";
import { Sidebar } from "./Sidebar";

export const NavigationMenu = (): React.ReactElement => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const navigationRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = (): void => setIsOpenMenu((prev) => !prev);
  const handleCloseMenu = (): void => setIsOpenMenu(false);

  // Инициализируем хук для отслеживания кликов
  useClickOutside(navigationRef, handleCloseMenu);

  return (
    <div className={styles.navigationMenu}>
      {/* Кнопка для мобильных устройств */}
      <BurgerButton toggleEvent={isOpenMenu} onClick={handleToggleMenu} />

      {/* Desktop-версия меню навигации */}
      <div className={styles.desktopMenu}>
        <NavigationList items={navigationItems} onClick={handleCloseMenu} />
      </div>

      <AnimatePresence>
        {isOpenMenu && (
          // Мобильная версия sidebar
          <Sidebar ref={navigationRef}>
            <NavigationList items={navigationItems} onClick={handleCloseMenu} />
          </Sidebar>
        )}
      </AnimatePresence>
    </div>
  );
};
