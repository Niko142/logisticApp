type LegendVariant = "dot" | "line";

export interface LegendItem {
  id: number | string;
  label: string;
  colorClass: string;
  description: string;
  variant: LegendVariant;
  dashed?: boolean;
}

export interface LegendButtonProps {
  onToggle: () => void;
  isOpen: boolean;
}

export interface IndicatorItemProps {
  items: LegendItem[];
}
