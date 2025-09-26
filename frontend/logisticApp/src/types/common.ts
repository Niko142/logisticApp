// Тип для координат
export type Coordinates = [number, number];

// Тип назначений кнопок
export type ButtonVariants = "default" | "reload" | "authorization" | "back";

// Тип размера иконок
export type IconSize = "sm" | "md" | "lg" | "xl";

export type InputTypes =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "date"
  | "datetime-local"
  | "number";

export type LayoutRoles = "auth" | "register";
