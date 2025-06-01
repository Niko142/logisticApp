import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "../assets/Header_logo.svg";
import { IoMdExit } from "react-icons/io";
import { headerChapters } from "../data/data";

const Header = () => {
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
                  to={`/${chapter.href}`}
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
                className="header__item"
                aria-label="Выход"
                reloadDocument
              >
                <IoMdExit size={32} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
