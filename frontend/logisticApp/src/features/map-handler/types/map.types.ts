import type { QueryStatus } from "@tanstack/react-query";

import type { Coordinates } from "@/types/models/route.types";

type MapOverlayType = Exclude<QueryStatus, "success">;

export interface MapEventHandlerProps {
  onAddPoint: (coordinates: Coordinates) => void;
  onClear: () => void;
}

export interface SearchInputProps {
  onSelect: (coordinates: Coordinates) => void;
}

export interface MapOverlayProps {
  type: MapOverlayType;
  message?: string;
}
