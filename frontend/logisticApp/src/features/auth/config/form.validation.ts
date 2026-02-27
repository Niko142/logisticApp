import type {
  LoginFormValues,
  RegisterFormValues,
  ValidationConfig,
} from "../types/form.types";

// Конфиг валидации для register-формы
export const registerValidation: ValidationConfig<RegisterFormValues> = {
  username: {
    required: "Логин обязателен",
    validate: (value: string) => {
      if (value.length < 3) {
        return "Минимум 3 символа";
      }

      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return "Только латиница и цифры";
      }

      if (value.length > 20) {
        return "Максимум 20 символов";
      }

      return true;
    },
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
    required: "Подтверждение пароля обязательно",
    validate: (value: string, formValues: RegisterFormValues) => {
      if (!value) return true;
      return value === formValues.password || "Пароли не совпадают";
    },
  },
};

// Конфиг валидации для login-формы
export const loginValidation: ValidationConfig<LoginFormValues> = {
  username: {
    required: "Логин обязателен для заполнения",
  },

  password: {
    required: "Пароль обязателен для заполнения",
    minLength: { value: 6, message: "Минимум 6 символов" },
  },
};
