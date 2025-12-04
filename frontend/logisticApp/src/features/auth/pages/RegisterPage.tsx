import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/layout";
import { RegisterForm } from "@/features/auth";

export const RegisterPage = (): React.ReactElement => {
  return (
    <AuthLayout purpose="Форма регистрации">
      <RegisterForm />
      <Link to={"/login"} className="register__link">
        Уже есть аккаунт? Войти
      </Link>
    </AuthLayout>
  );
};
