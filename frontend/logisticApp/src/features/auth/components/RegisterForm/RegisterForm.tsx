import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import type { RegistrationInputs } from "../types/auth.type";
import AuthLayout from "../Shared/AuthLayout";
import FormField from "../Shared/FormField";
import { Button } from "@/shared/components/Button/Button";
import "../styles/Auth.css";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    resetField,
    formState: { errors },
  } = useForm<RegistrationInputs>({ mode: "onBlur" });

  // Следим за password, чтобы не выводить ошибку для confirm,
  // если password не прошел проверку
  const password = useWatch({ control, name: "password" });

  // Обработчик отправки данных
  const onSubmit: SubmitHandler<RegistrationInputs> = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      resetField("password");
      resetField("confirmPassword");

      setError("confirmPassword", {
        type: "custom",
        message: "Пароли не совпали, повторите попытку",
      });
      return;
    }

    console.log(formData);
  };

  return (
    <AuthLayout
      role="register"
      title="Регистрация"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        id="username"
        label="Логин:"
        type="text"
        role="register"
        register={register}
        error={errors.username}
        name="username"
        options={{
          required: "Логин обязателен для заполнения",
          minLength: { value: 3, message: "Минимум 3 символа" },
        }}
      />

      <FormField
        id="email"
        label="Email:"
        type="email"
        autoComplete="on"
        role="register"
        register={register}
        error={errors.email}
        name="email"
        options={{
          required: "Email обязателен для заполнения",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Введите корректный email",
          },
        }}
      />

      <FormField
        id="password"
        label="Пароль:"
        type="password"
        role="register"
        register={register}
        error={errors.password}
        name="password"
        options={{
          required: "Пароль обязателен",
          minLength: { value: 6, message: "Минимум 6 символов" },
        }}
      />
      <FormField
        id="confirmPassword"
        label="Подтвердите пароль:"
        type="password"
        role="register"
        register={register}
        error={errors.confirmPassword}
        name="confirmPassword"
        options={{
          required: "Подтверждение пароля обязательно",
        }}
        renderError={(err) =>
          password &&
          err && <span className="register__form--error">{err.message}</span>
        }
      />

      <Button variant="authorization">Регистрация</Button>
    </AuthLayout>
  );
};
