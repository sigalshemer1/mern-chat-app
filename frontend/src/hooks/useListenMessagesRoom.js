import { useEffect } from "react";
import { useSocketMessagesRoom } from "../context/SocketMessagesRoom";
import useRoom from "../zustand/useRoom";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessagesRoom = () => {
	
    const context = useSocketMessagesRoom();
    if (!context) {
        console.error('useSocketMessagesRoom must be used within a SocketMessagesRoomProvider');
        return;
    }

    const { socketRoom } = context;
    const { messagesRoom, setMessagesRoom } = useRoom();

	useEffect(() => {
		if (!socketRoom) {
			console.error("Socket room is not defined");
			return;
		}
	
		socketRoom.on("getNewMessagesRoom", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
	
			setMessagesRoom((prevMessagesRoom) => [...prevMessagesRoom, newMessage]);
		});
	
		// Cleanup the event listener on component unmount
		return () => {
			if (socketRoom) {
				socketRoom.off("getNewMessagesRoom");
			}
		};
	}, [socketRoom, setMessagesRoom]);
};

export default useListenMessagesRoom;
