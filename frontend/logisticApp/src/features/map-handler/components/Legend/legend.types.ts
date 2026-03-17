export interface LegendItem {
  id: number | string;
  label: string;
  colorClass: string;
  description: string;
  variant: "dot" | "line";
  dashed?: boolean;
}

export interface IndicatorItemProps {
  items: LegendItem[];
}
