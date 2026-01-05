import { createContext } from "react";

import type { IAuthContextType } from "./auth-context.types";

export const AuthContext = createContext<IAuthContextType | null>(null);
