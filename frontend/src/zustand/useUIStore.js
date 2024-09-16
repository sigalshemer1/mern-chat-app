import { create } from "zustand";

const useUIStore = create((set) => ({
    selectedTab: "chats",
    setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

export default useUIStore;
