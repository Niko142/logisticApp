import { Link } from "react-router-dom";

import { Icon } from "@/components/ui/Icon";

import styles from "../header.module.css";
import type { DropdownListProps } from "../types/header.types";

export const DropdownList = ({
  items,
  onClick,
}: DropdownListProps): React.ReactElement => {
  return (
    <ul className={styles.dropdownList}>
      {items.map((item) => (
        <li key={item.title}>
          <Link
            to={item.path}
            className={styles.dropdownItem}
            onClick={onClick}
          >
            {item.icon && <Icon icon={item.icon} size="sm" />}
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
