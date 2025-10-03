import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { AppDataSource } from "./data-source";
import { JWT_SECRET } from "./db";
import { User } from "../entities";
import { AuthService } from "../services";

const userRepository = AppDataSource.getRepository(User);
const authService = new AuthService();

// Локальная стратегия (на базе стандартных логина и пароля)
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username: string, password: string, done) => {
      try {
        const credentials = { username, password };
        const user = await authService.validateUser(credentials);
        return done(null, user);
      } catch (err) {
        if (err instanceof Error) {
          return done(null, false, { message: err.message });
        }
        return done(err);
      }
    }
  )
);

// Стратегия для защищенных route
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await userRepository.findOne({
          where: { id: payload.userId },
        });
        return done(null, user);
      } catch (err) {
        if (err instanceof Error) {
          return done(null, false, { message: err.message });
        }
        return done(err);
      }
    }
  )
);
