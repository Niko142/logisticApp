import { useAuth } from "@/providers/auth";

import { LoginButton } from "./LoginButton";
import { UserDropdown } from "./UserDropdown";

export const HeaderUserProfile = (): React.ReactElement => {
  const { token, profile, isLoading } = useAuth();

  if (!token) {
    return <LoginButton />;
  }

  return <UserDropdown profile={profile} isLoading={isLoading} />;
};
