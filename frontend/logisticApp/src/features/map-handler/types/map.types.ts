import type { RouteResponse } from "@/api/types";
import type { Coordinates } from "@/types/common";

export interface LegendMapProps {
  isShow: boolean;
  onChange: () => void;
  data: RouteResponse | null;
}

export interface SearchInputProps {
  onSelect: (coordinates: Coordinates) => void;
}
