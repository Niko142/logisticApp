import bcrypt from "bcryptjs";
import { AppDataSource } from "../config";
import { User } from "../entities";
import type { LoginData, RegisterData } from "../types/auth.types";
import { HttpError } from "../middlewares/http-error";

const userRepository = () => AppDataSource.getRepository(User);

export class AuthService {
  async register(data: RegisterData) {
    const { username, email, password } = data;

    // Проверка на уникальность логина
    const existingUsername = await userRepository().findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new HttpError(409, "Пользователь с таким логином уже существует");
    }

    // Проверка на уникальность email
    const existingEmail = await userRepository().findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new HttpError(409, "Пользователь с таким email уже существует");
    }

    // Шифруем пароль и передаем полученное значение в БД
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository().create({
      username,
      email,
      password: hashedPassword,
    });

    await userRepository().save(user);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async validateUser(data: LoginData) {
    const { username, password } = data;
    const user = await userRepository().findOne({
      where: [{ username }, { email: username }],
    });

    if (!user) {
      throw new HttpError(404, "Пользователь с таким логином не найден");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new HttpError(
        401,
        "Ошибка авторизации! Проверьте правильность логина и пароля"
      );
    }

    return user;
  }
}
