export interface LegendItem {
  id: number | string;
  label: string;
  colorClass: string;
  description: string;
}

export interface ToggleItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export interface IndicatorItemProps {
  items: LegendItem[];
}
