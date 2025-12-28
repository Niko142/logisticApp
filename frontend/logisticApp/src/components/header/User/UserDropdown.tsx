import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { profileUserItems } from "@/constants/data";
import { DROPDOWN_DELAY } from "@/constants/delay";
import { useClickOutside } from "@/hooks/useClickOutside";

import { DropdownList } from "./DropdownList";
import { LogoutButton } from "./LogoutButton";
import styles from "../header.module.css";
import { dropdownVariants } from "../header.variants";
import type { UserDropdownProps } from "../types/header.types";

export const UserDropdown = ({
  profile,
  isLoading,
}: UserDropdownProps): React.ReactElement => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Деструктуризация получаемых данных
  const { username, email } = profile || {};

  // Обработчик закрытия dropdown с некоторой задержкой
  const handleCloseDropdown = (): void => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, DROPDOWN_DELAY);
  };

  // Обработчик клика по dropdown
  const handleToggleDropdown = (): void => {
    return isDropdownOpen ? handleCloseDropdown() : setIsDropdownOpen(true);
  };

  // Инициализируем хук клика вне dropdown/menu в целях закрытия
  useClickOutside(dropdownRef, handleCloseDropdown);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className={styles.profileButton}
        aria-label="Профиль пользователя"
      >
        <span className={styles.initials}>
          {isLoading ? "..." : username?.[0].toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className={styles.dropdownMenu}
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownUsername}>{username}</span>
              <span className={styles.dropdownEmail}>{email}</span>
            </div>

            <hr className={styles.hr} />

            <DropdownList
              items={profileUserItems}
              onClick={handleCloseDropdown}
            />

            <hr className={styles.hr} />

            <LogoutButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
