import { NavLink } from "react-router-dom";

import { headerNavItems } from "../constants/headerOptions";

export const NavigationItems = () => {
  return (
    <>
      {headerNavItems.map((chapter) => (
        <li key={chapter.title}>
          <NavLink
            to={`/${chapter.link}`}
            className={({ isActive }) =>
              isActive ? "header__item active" : "header__item"
            }
          >
            {chapter.title}
          </NavLink>
        </li>
      ))}
    </>
  );
};
