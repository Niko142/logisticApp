import { createContext } from "react";

import type { AuthContextType } from "./authContext.types";

export const AuthContext = createContext<AuthContextType | null>(null);
