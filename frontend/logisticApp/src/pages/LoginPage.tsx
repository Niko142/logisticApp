import { Link } from "react-router-dom";

import { LoginForm } from "@/features/auth";

const LoginPage = () => {
  return (
    <section className="auth" aria-label="Форма авторизации">
      <LoginForm />
      <Link to={"/register"} className="auth__link">
        Регистрация
      </Link>
    </section>
  );
};

export default LoginPage;
