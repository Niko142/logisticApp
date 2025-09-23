import { Link } from "react-router-dom";
import "./Success.css";
import { SuccessIcon } from "@/shared";

export const SuccessMessage = () => {
  return (
    <section className="success">
      <div className="success-page">
        <SuccessIcon size="xl" />
        <h1 className="success-page__title">
          Поздравляем! Регистрация завершена успешно
        </h1>
        <p className="success-page__description">
          Аккаунт успешно создан. Перейдите к авторизации для входа в систему.
        </p>
        <Link className="success-page__link" to={"/"}>
          Войти в систему
        </Link>
      </div>
    </section>
  );
};
