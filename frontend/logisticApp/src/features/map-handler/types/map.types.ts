// import type { RouteResponse } from "@/services/api/types/route-api.types";
import type { Coordinates, RouteModel } from "@/types/models/route.types";

export interface LegendMapProps {
  isShowing: boolean;
  onChange: () => void;
  route: RouteModel | null;
}

export interface SearchInputProps {
  onSelect: (coordinates: Coordinates) => void;
}
