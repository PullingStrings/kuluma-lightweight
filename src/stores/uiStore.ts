import { create } from 'zustand';

interface UIState {
  currentWorkspaceId: string | null;
  currentChannelId: string | null;
  isSidebarOpen: boolean;
  setWorkspace: (id: string) => void;
  setChannel: (id: string) => void;
  toggleSidebar: (open?: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentWorkspaceId: null,
  currentChannelId: null,
  isSidebarOpen: false,
  setWorkspace: (id) => set({ currentWorkspaceId: id }),
  setChannel: (id) => set({ currentChannelId: id }),
  toggleSidebar: (open) => set((s) => ({ isSidebarOpen: open ?? !s.isSidebarOpen })),
}));