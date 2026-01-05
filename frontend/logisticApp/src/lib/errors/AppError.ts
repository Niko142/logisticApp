export class AppError extends Error {
  code: string | number;
  status: number;

  constructor(code: string | number, status: number, message?: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
  }
}
