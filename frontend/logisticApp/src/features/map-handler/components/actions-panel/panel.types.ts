export interface ActionsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ToggleItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}
