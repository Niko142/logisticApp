import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginInputs } from "../types/auth.type";
import AuthLayout from "../Shared/AuthLayout";
import FormField from "../Shared/FormField";
import { Button } from "@/shared/components/Button/Button";
import "../styles/Auth.css";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<LoginInputs> = (formData) => {
    if (formData) {
      console.log(formData);
      navigate("/main");
    }
  };

  return (
    <AuthLayout
      role="auth"
      title="Вход в систему"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        id="username"
        label="Логин:"
        type="text"
        role="auth"
        register={register}
        error={errors.username}
        name="username"
        options={{
          required: "Логин обязателен для заполнения",
        }}
      />

      <FormField
        id="password"
        label="Пароль:"
        type="password"
        role="auth"
        register={register}
        error={errors.password}
        name="password"
        options={{
          required: "Пароль обязателен для заполнения",
        }}
      />

      <Button variant="authorization">Авторизация</Button>
    </AuthLayout>
  );
};
