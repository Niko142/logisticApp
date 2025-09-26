import { Link } from "react-router-dom";

import { RegisterForm } from "@/features/auth";

const RegistrationPage = () => {
  return (
    <section className="register" aria-label="Форма авторизации">
      <RegisterForm />
      <Link to={"/"} className="register__link">
        Уже есть аккаунт? Войти
      </Link>
    </section>
  );
};

export default RegistrationPage;
