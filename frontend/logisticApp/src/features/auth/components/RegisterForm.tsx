import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { registerUser } from "@/api";
import { Button } from "@/shared/button";

import type { RegisterFormData } from "../types/auth.types";
import AuthLayout from "../ui/AuthLayout";
import FormField from "../ui/FormField";

import "./Auth.css";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: "onSubmit" });

  // Наблюдаем за password для валидации подтверждения пароля
  const password = useWatch({ control, name: "password" });

  // Обработчик отправки данных
  const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "custom",
        message: "Пароли не совпали, повторите попытку",
      });
      return;
    }

    try {
      await toast.promise(registerUser(formData), {
        loading: "Проверяем указанные данные",
      });
      reset();
      navigate("/register/success");
    } catch (err) {
      setError("root", {
        type: "server",
        message:
          err instanceof Error ? err.message : "Возникла неизвестная ошибка",
      });
    }
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
          maxLength: {
            value: 25,
            message: "Логин превышает максимальный размер - 25 символов",
          },
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
          maxLength: {
            value: 255,
            message: "Превышена максимальная длина email",
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
          maxLength: {
            value: 64,
            message: "Превышена максимальная длина пароля",
          },
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

      {errors.root && (
        <span className="register__form--error main--error">
          {errors.root.message}
        </span>
      )}

      <Button variant="authorization">Регистрация</Button>
    </AuthLayout>
  );
};
