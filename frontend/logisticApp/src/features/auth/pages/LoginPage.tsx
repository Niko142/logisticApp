import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/layout";
import { LoginForm } from "@/features/auth";

export const LoginPage = (): React.ReactElement => {
  return (
    <AuthLayout purpose="Форма авторизации">
      <LoginForm />
      <Link to={"/register"} className="auth__link">
        Регистрация
      </Link>
    </AuthLayout>
  );
};
