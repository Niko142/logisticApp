import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { LOCAL_STORAGE_KEY } from "@/constants/keys";

interface IActions {
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

interface IInitialState {
  token: string | null;
}

type AuthStore = IActions & IInitialState;

const initialState: IInitialState = {
  token: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Селекторы
export const useToken = () => useAuthStore((state) => state.token);
export const setToken = (token: string | null): void =>
  useAuthStore.getState().setToken(token);
export const clearToken = (): void => useAuthStore.getState().clearToken();
