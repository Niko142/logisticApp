import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { APP_BASE_PATH } from "@/constants/domain";

import styles from "../header.module.css";
import type { NavigationListProps } from "../types/header.types";

export const NavigationList = ({
  items,
  onClick,
}: NavigationListProps): React.ReactElement => {
  return (
    <ul className={styles.navigationList}>
      {items.map((item) => (
        <li key={item.title} className={styles.navigationItem}>
          <NavLink
            to={item.path}
            className={({ isActive: isLinkActive }) =>
              clsx(styles.navigationLink, isLinkActive && styles.active)
            }
            end={item.path === APP_BASE_PATH}
            onClick={onClick}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
