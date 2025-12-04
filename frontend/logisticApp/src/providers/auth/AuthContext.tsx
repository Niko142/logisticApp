import { createContext } from "react";

import type { IAuthContext } from "./auth-context.types";

export const AuthContext = createContext<IAuthContext | null>(null);
