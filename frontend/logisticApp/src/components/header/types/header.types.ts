import type { RefObject } from "react";

import type { LayoutProps } from "@/types/common.types";
import type {
  NavigationItem,
  NavigationProfileItem,
} from "@/types/navigation.types";
import type { UserProfile } from "@/types/user.types";

export interface NavigationMenuProps {
  items: NavigationItem[];
}

export interface SideBarProps extends LayoutProps {
  ref: RefObject<HTMLDivElement | null>;
}

export interface NavigationListProps {
  items: NavigationItem[];
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface BurgerButtonProps {
  toggleEvent: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface UserDropdownProps {
  profile: UserProfile | null;
  isLoading: boolean;
}

export interface DropdownListProps {
  items: NavigationProfileItem[];
  onClick: () => void;
}
