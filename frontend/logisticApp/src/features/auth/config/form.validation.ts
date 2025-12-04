import type {
  LoginFormValues,
  RegisterFormValues,
  ValidationConfig,
} from "../types/form.types";

// Конфиг валидации для register form
export const registerValidation: ValidationConfig<RegisterFormValues> = {
  username: {
    required: "Логин обязателен",
    minLength: { value: 3, message: "Минимум 3 символа" },
  },

  email: {
    required: "Email обязателен",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Введите корректный email",
    },
  },

  password: {
    required: "Пароль обязателен",
    minLength: { value: 6, message: "Минимум 6 символов" },
  },

  confirmPassword: {
    required: "Подтверждение обязательно",
  },
};

// Конфиг валидации для login form
export const loginValidation: ValidationConfig<LoginFormValues> = {
  username: {
    required: "Логин обязателен для заполнения",
  },

  password: {
    required: "Пароль обязателен для заполнения",
  },
};
