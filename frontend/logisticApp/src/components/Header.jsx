import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "../assets/Header_logo.svg";
import { IoMdExit } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <img src={HeaderLogo} alt="logo" />
        </div>
        <nav className="header__navbar">
          <ul>
            <NavLink
              to={"/main"}
              className={({ isActive }) =>
                isActive ? "header__item active" : "header__item"
              }
            >
              Главная
            </NavLink>
            <NavLink
              to={"/predict"}
              className={({ isActive }) =>
                isActive ? "header__item active" : "header__item"
              }
            >
              Прогнозирование
            </NavLink>
            <NavLink
              to={"/analytics"}
              className={({ isActive }) =>
                isActive ? "header__item active" : "header__item"
              }
            >
              Аналитика
            </NavLink>
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                isActive ? "header__item active" : "header__item"
              }
            >
              Настройки
            </NavLink>
            {/* Не лучший вариант, но для начала сойдет */}
            <Link to={"/"} className="header__item" reloadDocument>
              <IoMdExit size={32} />
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
