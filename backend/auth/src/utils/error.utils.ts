// Создаем кастомный класс для валидации ошибок на frontend-е
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
