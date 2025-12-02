import { createContext } from "react";

import type { IAuthContext } from "./authContext.types";

export const AuthContext = createContext<IAuthContext | null>(null);
