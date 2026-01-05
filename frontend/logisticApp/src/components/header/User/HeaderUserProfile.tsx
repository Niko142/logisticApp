import { useAuth } from "@/providers/auth";

import { LoginButton } from "./LoginButton";
import { UserDropdown } from "./UserDropdown";

export const HeaderUserProfile = (): React.ReactElement => {
  const { profile, status } = useAuth();

  if (status === "anonymous") {
    return <LoginButton />;
  }

  return <UserDropdown profile={profile} status={status} />;
};
