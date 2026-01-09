// TODO: убрать бесполезные и повторяющие типы

interface AuthBase {
  username: string;
  password: string;
}

export interface RegisterData extends AuthBase {
  email: string;
}

export type LoginData = AuthBase;

export interface AuthInfo {
  message?: string;
}
