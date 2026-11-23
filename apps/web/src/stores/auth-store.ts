import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "WRK" | "SUP" | "ADM";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  locked: boolean;
  login: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
  lock: () => void;
  unlock: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      locked: false,
      login: (user, accessToken) => set({ user, accessToken, locked: false }),
      logout: () => set({ user: null, accessToken: null, locked: false }),
      lock: () => set({ locked: true }),
      unlock: () => set({ locked: false }),
    }),
    { name: "waypoint-auth" }
  )
);
