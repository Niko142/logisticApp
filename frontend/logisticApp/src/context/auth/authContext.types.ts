import type { ProfileResponse } from "@/api/types";

export interface AuthContextProps {
  children: React.ReactNode;
}

export type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  profile: ProfileResponse["profile"] | null;
  login: (newToken: string) => void;
  logout: () => void;
};
