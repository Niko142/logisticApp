import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Coordinates } from "@/types/models/route.types";

interface IActions {
  addPoint: (point: Coordinates) => void;
  clearPoints: () => void;
  toggleTraffic: () => void;
}

interface IInitialState {
  points: Coordinates[];
  showTraffic: boolean;
}

type RouteStore = IActions & IInitialState;

const initialState: IInitialState = {
  points: [],
  showTraffic: true,
};

export const useRouteStore = create<RouteStore>()(
  persist(
    (set) => ({
      ...initialState,
      // Добавление точки
      addPoint: (point) =>
        set((state) => ({
          points: state.points.length >= 2 ? [point] : [...state.points, point],
        })),
      // Очистка выставленных точек
      clearPoints: () => set({ points: [] }),

      // Выкл/вкл показ загруженности
      toggleTraffic: () =>
        set((state) => ({
          showTraffic: !state.showTraffic,
        })),
    }),
    {
      name: "route-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        showTraffic: state.showTraffic,
      }),
    },
  ),
);

// Селекторы
export const useRoutePoints = () => useRouteStore((state) => state.points);
export const useShowTraffic = () => useRouteStore((state) => state.showTraffic);
export const addPoint = (point: Coordinates): void =>
  useRouteStore.getState().addPoint(point);
export const clearPoints = (): void => useRouteStore.getState().clearPoints();
export const toggleTraffic = (): void =>
  useRouteStore.getState().toggleTraffic();
