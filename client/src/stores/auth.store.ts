import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface State {
  token: string | null;
  user: User | null;
}

interface Actions {
  setToken: (token: string) => void;
  delToken: () => void;
  setUser: (user: User | null) => void;
}

type Store = State & Actions;

const initialState: State = {
  token: null,
  user: null,
};

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      ...initialState,
      setToken: (token: string) => set({ token }),
      delToken: () => set({ token: null }),
      setUser: (user: User | null) => set({ user }),
    }),
    { name: "auth-store" },
  ),
);
