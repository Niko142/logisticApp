/**
 * Утилита для получения первого инициала
 * @param str - Логин пользователя
 * @returns - Первый инициал логина в верхнем регистре
 */
export const getFirstInitials = (str: string): string => {
  return str?.[0].toUpperCase();
};
