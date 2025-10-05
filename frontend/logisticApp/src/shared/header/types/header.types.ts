export interface HeaderProps {
  title: string;
  link: string;
}

export interface DropdownItemProps extends HeaderProps {
  icon?: React.ComponentType<{ size?: number }>;
}

export interface DropdownMenuProps {
  onClick: () => void;
}
