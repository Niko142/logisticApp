import { Link } from "react-router-dom";

import { headerUserItems } from "../constants/headerOptions";
import type { DropdownMenuProps } from "../types/header.types";

export const DropdownItems = ({ onClick }: DropdownMenuProps) => {
  return (
    <ul className="dropdown-menu__content">
      {headerUserItems.map((item) => (
        <li key={item.title}>
          <Link to={item.link} className="dropdown-item" onClick={onClick}>
            {item.icon && <item.icon size={22} />}
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
