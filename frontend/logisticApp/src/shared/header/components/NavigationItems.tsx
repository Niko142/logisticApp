import { NavLink } from "react-router-dom";

import { headerNavItems } from "../constants/headerOptions";

export const NavigationItems = () => {
  return (
    <ul>
      {headerNavItems.map((chapter) => (
        <li key={chapter.title}>
          <NavLink
            key={chapter.title}
            to={chapter.link}
            className={({ isActive }) =>
              isActive ? "header__item active" : "header__item"
            }
          >
            {chapter.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
