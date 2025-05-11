import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Logo from "../assets/Logo.svg";

const FormAuth = () => {
  const navigate = useNavigate();
  return (
    <section className="auth">
      <form className="auth__form">
        {/* Логотип */}
        <img src={Logo} alt="Logo" />

        <h1 className="auth__title">Вход в систему</h1>
        <label htmlFor="username" className="auth__label">
          Username:
        </label>
        <input type="text" id="username" className="auth__input input-user" />
        <label htmlFor="password" className="auth__label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="auth__input input-password"
        />
        <Button onClick={() => navigate("/main")}>Авторизация</Button>
        <Link to={'#'} className="auth__registration">Регистрация</Link>
      </form>
    </section>
  );
};

export default FormAuth;
