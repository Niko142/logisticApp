import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../ui/AuthLayout";
import FormField from "../ui/FormField";

import { login } from "@/api";
import { Button } from "@/shared/components/Button";
import type { LoginInputs } from "@/types/common.type";
import "./Auth.css";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<LoginInputs>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    try {
      const data = await toast.promise(
        login(formData),
        {
          loading: "Осуществляем попытку входа...",
          success: "Вход выполнен успешно",
        },
        {
          success: {
            duration: 3000,
          },
        }
      );
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
