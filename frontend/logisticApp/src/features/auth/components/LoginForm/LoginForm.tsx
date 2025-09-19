import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginInputs } from "@/types/type";
import { login } from "@/api";
import AuthLayout from "../Shared/AuthLayout";
import FormField from "../Shared/FormField";
import { Button } from "@/shared";
import "../styles/Auth.css";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<LoginInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    try {
      const data = await login(formData);

      localStorage.setItem("auth_token", data?.token);
      navigate("/main");
    } catch (err) {
      setError("root", {
        type: "server",
        message:
          err instanceof Error ? err.message : "Возникла неизвестная ошибка",
      });
      resetField("password");
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

      {errors.root && (
        <span className="auth__form--error main--error">
          {errors.root.message}
        </span>
      )}

      <Button variant="authorization">Авторизация</Button>
    </AuthLayout>
  );
};
