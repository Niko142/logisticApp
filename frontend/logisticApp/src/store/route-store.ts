import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Coordinates } from "@/types/models/route.types";

interface IActions {
  addPoint: (point: Coordinates) => void;
  clearPoints: () => void;
  toggleTraffic: () => void;
  toggleAlternativeRoutes: () => void;
}

interface IInitialState {
  points: Coordinates[];
  showTraffic: boolean;
  showAlternativeRoutes: boolean;
}

type RouteStore = IActions & IInitialState;

const initialState: IInitialState = {
  points: [],
  showTraffic: true,
  showAlternativeRoutes: false,
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
      // Выкл/вкл демонстрацию и формирование альтернативного маршрута
      toggleAlternativeRoutes: () =>
        set((state) => ({
          showAlternativeRoutes: !state.showAlternativeRoutes,
        })),
    }),
    {
      name: "route-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        showTraffic: state.showTraffic,
        showAlternativeRoutes: state.showAlternativeRoutes,
      }),
    },
  ),
);

// Селекторы для быстрого вызова
export const useRoutePoints = () => useRouteStore((s) => s.points);
export const useShowTraffic = () => useRouteStore((s) => s.showTraffic);
export const useShowAlternativeRoutes = () =>
  useRouteStore((s) => s.showAlternativeRoutes);

export const addPoint = (point: Coordinates): void =>
  useRouteStore.getState().addPoint(point);
export const clearPoints = (): void => useRouteStore.getState().clearPoints();
export const toggleTraffic = (): void =>
  useRouteStore.getState().toggleTraffic();
export const toggleAlternativeRoutes = (): void =>
  useRouteStore.getState().toggleAlternativeRoutes();
