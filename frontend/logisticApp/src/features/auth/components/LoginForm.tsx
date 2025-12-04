import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { FormLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { FormError, FormField } from "@/components/ui/Form";
import { TOAST_SUCCESS_DURATION } from "@/constants/delay";
import { useAuth } from "@/providers/auth";
import { loginUser } from "@/services/api";

import { loginValidation } from "../config/form.validation";
import type { LoginRequest } from "../types/form.types";

export const LoginForm = (): React.ReactElement => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    setFocus,
    formState: { errors },
  } = useForm<LoginRequest>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<LoginRequest> = async (formData) => {
    try {
      const response = await toast.promise(
        loginUser(formData),
        {
          loading: "Осуществляем попытку входа...",
          success: "Вход выполнен успешно",
        },
        {
          success: {
            duration: TOAST_SUCCESS_DURATION,
          },
        }
      );

      if (!response?.token) throw new Error("Токен не получен");
      login(response.token);

      navigate("/app");
    } catch (err) {
      setError("root", {
        type: "server",
        message:
          err instanceof Error ? err.message : "Возникла неизвестная ошибка",
      });
      resetField("password");
      setFocus("password");
    }
  };

  return (
    <FormLayout title="Вход в систему" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type="text"
        name="username"
        label="Логин:"
        register={register}
        error={errors.username}
        rules={loginValidation.username}
      />

      <FormField
        name="password"
        type="password"
        label="Пароль:"
        register={register}
        error={errors.password}
        rules={loginValidation.password}
      />

      <FormError error={errors.root} global />

      <Button variant="authorization">Авторизация</Button>
    </FormLayout>
  );
};
