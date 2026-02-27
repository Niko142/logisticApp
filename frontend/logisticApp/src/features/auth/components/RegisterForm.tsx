import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { FormLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { FormError, FormField } from "@/components/ui/Form";
import { REGISTER_PATH } from "@/constants/domain";
import { authService } from "@/services/api";

import { registerValidation } from "../config/form.validation";
import type { RegisterFormValues } from "../types/form.types";

export const RegisterForm = (): React.ReactElement => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // Обработчик отправки данных
  const onSubmit: SubmitHandler<RegisterFormValues> = async (formData) => {
    try {
      await toast.promise(authService.registerUser(formData), {
        loading: "Проверяем указанные данные",
      });
      reset();
      navigate(`${REGISTER_PATH}/success`);
    } catch (err) {
      setError("root", {
        type: "server",
        message:
          err instanceof Error ? err.message : "Возникла неизвестная ошибка",
      });
    }
  };

  return (
    <FormLayout title="Регистрация" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type="text"
        name="username"
        label="Логин:"
        register={register}
        error={errors.username}
        rules={registerValidation.username}
      />

      <FormField
        type="email"
        name="email"
        label="Email:"
        autoComplete="on"
        register={register}
        error={errors.email}
        rules={registerValidation.email}
      />

      <FormField
        type="password"
        name="password"
        label="Пароль:"
        register={register}
        error={errors.password}
        rules={registerValidation.password}
      />

      <FormField
        type="password"
        name="confirmPassword"
        label="Подтвердите пароль:"
        register={register}
        error={errors.password ? undefined : errors.confirmPassword}
        rules={registerValidation.confirmPassword}
      />

      <FormError error={errors.root} global />

      <Button variant="authorization">Регистрация</Button>
    </FormLayout>
  );
};
