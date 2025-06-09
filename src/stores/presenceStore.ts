import { create } from 'zustand';

interface PresenceState {
  online: Record<string, boolean>;        // userId → online?
  typing: Record<string, Set<string>>;    // channelId → Set<userId>
  setOnline: (id: string, on: boolean) => void;
  setTyping: (channelId: string, userId: string, isTyping: boolean) => void;
}

export const usePresenceStore = create<PresenceState>((set) => ({
  online: {},
  typing: {},
  setOnline: (id, on) => set((s) => ({ online: { ...s.online, [id]: on } })),
  setTyping: (cid, uid, isTyping) =>
    set((s) => {
      const setForChan = new Set(s.typing[cid] || []);
      if (isTyping) {
        setForChan.add(uid);
      } else {
        setForChan.delete(uid);
      }
      return { typing: { ...s.typing, [cid]: setForChan } };
    }),
}));