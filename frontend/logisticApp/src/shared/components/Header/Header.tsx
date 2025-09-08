import { Link, NavLink } from "react-router-dom";
import { headerChapters } from "./options";
import HeaderLogo from "@/assets/Header_logo.svg";
import { LogOut } from "lucide-react";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <img src={HeaderLogo} alt="logo" />
        </div>
        <nav className="header__navbar">
          <ul>
            {headerChapters.map((chapter) => (
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
            {/* Не лучший вариант, но для начала сойдет */}
            <li>
              <Link
                to={"/"}
                className="header__item item--exit"
                aria-label="Выход"
                reloadDocument
              >
                <LogOut size={28} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
