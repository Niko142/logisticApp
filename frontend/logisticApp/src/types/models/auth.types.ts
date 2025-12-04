export type AuthRegister = {
  username: string;
  password: string;
  email: string;
};

export type AuthLogin = Omit<AuthRegister, "email">;
