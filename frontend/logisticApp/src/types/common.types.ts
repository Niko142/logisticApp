// Тип для координат
export type Coordinates = [number, number];

// Тип размера иконок
export type Size = "sm" | "md" | "lg" | "xl";

export type InputTypes =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "date"
  | "datetime-local"
  | "number";

export type LayoutRoles = "auth" | "register";

export interface LayoutProps {
  children: React.ReactNode;
}
