import { create } from "zustand";

const useRoom = create((set) => ({
	selectedRoom: null,
	setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
	messagesRooms: [],
	setMessagesRoom: (messagesRooms) => set({ messagesRooms }),
}));

export default useRoom;