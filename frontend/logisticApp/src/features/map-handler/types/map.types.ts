import type { Coordinates } from "@/types/models/route.types";
export interface MapEventHandlerProps {
  onAddPoint: (coordinates: Coordinates) => void;
  onClear: () => void;
}

export interface SearchInputProps {
  onSelect: (coordinates: Coordinates) => void;
}

export interface LayerControlProps {
  isOpen: boolean;
  onToggle: () => void;
  position?: L.ControlPosition;
}
