import React, { useCallback, useMemo } from "react";

import type { Coordinates } from "@/types/models/route.types";

import { SEARCH_CONTROL_CONFIG } from "../config/search.config";
import { useGeoSearch } from "../hooks/useGeosearch";
import type { SearchInputProps } from "../types/map.types";

import "@styles/search.css";

const SearchInput = ({ onSelect }: SearchInputProps) => {
  const config = useMemo(() => SEARCH_CONTROL_CONFIG, []);

  const handleSelect = useCallback(
    (coords: Coordinates) => {
      onSelect(coords);
    },
    [onSelect]
  );

  useGeoSearch({
    onSelect: handleSelect,
    options: config,
  });

  return null;
};

SearchInput.displayName = "SearchInput";

export default React.memo(SearchInput);
