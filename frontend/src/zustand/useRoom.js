import { create } from "zustand";

const useRoom = create((set) => ({
  selectedRoom: null,
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  messagesRoom: [],
  setMessagesRoom: (messagesRoom) => set({ messagesRoom }),
  sender: [],
  setSender: (sender) => set({ sender }),
}));

export default useRoom;