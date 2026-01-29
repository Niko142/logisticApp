import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/layout";
import { LOGIN_PATH } from "@/constants/domain";
import { RegisterForm } from "@/features/auth";

export const RegisterPage = (): React.ReactElement => {
  return (
    <AuthLayout purpose="Форма регистрации">
      <RegisterForm />
      <Link to={LOGIN_PATH} className="register__link">
        Уже есть аккаунт? Войти
      </Link>
    </AuthLayout>
  );
};
