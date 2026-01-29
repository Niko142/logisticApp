import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/layout";
import { REGISTER_PATH } from "@/constants/domain";
import { LoginForm } from "@/features/auth";

export const LoginPage = (): React.ReactElement => {
  return (
    <AuthLayout purpose="Форма авторизации">
      <LoginForm />
      <Link to={REGISTER_PATH} className="auth__link">
        Регистрация
      </Link>
    </AuthLayout>
  );
};
