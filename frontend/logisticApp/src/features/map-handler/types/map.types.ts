import type { RouteResponse } from "@/services/api/types/route-api.types";
import type { Coordinates } from "@/types/models/route.types";

export interface LegendMapProps {
  isShowing: boolean;
  onChange: () => void;
  data: RouteResponse | null;
}

export interface SearchInputProps {
  onSelect: (coordinates: Coordinates) => void;
}
