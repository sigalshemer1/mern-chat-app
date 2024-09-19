import { create } from "zustand";

const useRoom = create((set) => ({
  selectedRoom: null,
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),

  messagesRoom: [],
  setMessagesRoom: (messagesRoom) => set({ messagesRoom }),

  // New method to add a single message
  addMessage: (message) => set((state) => ({
    messagesRoom: [...state.messagesRoom, message],
  })),
}));

export default useRoom;
