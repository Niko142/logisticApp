import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/Button/Button";
import Logo from "@/assets/Logo.svg";

const FormAuth = () => {
  const navigate = useNavigate();
  return (
    <section className="auth" aria-label="Форма авторизации">
      <form className="auth__form">
        {/* Логотип */}
        <img src={Logo} alt="Logo" />

        <h1 className="auth__form--title">Вход в систему</h1>
        <label htmlFor="username" className="auth__form--label">
          Логин:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          className="auth__form--input input--user"
        />
        <label htmlFor="password" className="auth__form--label">
          Пароль:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="auth__form--input input--password"
        />
        <Button onClick={() => navigate("/main")}>Авторизация</Button>
        <Link to={"#"} className="auth__link">
          Регистрация
        </Link>
      </form>
    </section>
  );
};

export default FormAuth;
