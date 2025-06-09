// lib/auth.ts
import { create } from 'zustand';

export interface ApiUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
}

interface AuthState {
  accessToken: string | null;
  user: ApiUser | null;
  hydrated: boolean;
  setSession: (t: string, u: ApiUser) => void;
  clear: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  user: null,
  hydrated: false,
  setSession: (t, u) => set({ accessToken: t, user: u }),
  clear: () => set({ accessToken: null, user: null }),
  setHydrated: () => set({ hydrated: true }),
}));
