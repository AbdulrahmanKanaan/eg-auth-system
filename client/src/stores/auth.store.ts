import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  token: string | null;
}

interface Actions {
  setToken: (token: string) => void;
}

type Store = State & Actions;

const initialState: State = {
  token: null,
};

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      ...initialState,
      setToken: (token: string) => set({ token }),
      delToken: () => set({ token: null }),
    }),
    { name: "auth-store" },
  ),
);
