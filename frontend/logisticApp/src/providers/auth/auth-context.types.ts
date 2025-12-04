import type { UserProfile } from "@/types/user.types";

export type IAuthContext = {
  token: string | null;
  isLoading: boolean;
  profile: UserProfile | null;
  login: (newToken: string) => void;
  logout: () => void;
};
