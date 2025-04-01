import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../@type/user.type";

type AuthState = {
  user: User | null;
};

type AuthAction = {
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-store",
    }
  )
);