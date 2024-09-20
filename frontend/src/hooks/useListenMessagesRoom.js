import { useEffect } from "react";
import useRoom from "../zustand/useRoom";
import notificationSound from "../assets/sounds/notification.mp3";
import io from 'socket.io-client';
const socket1 = io('http://localhost:5000'); // The server URL

const useListenMessagesRoom = () => {
    const { messagesRoom, setMessagesRoom } = useRoom();
	useEffect(() => {
        socket1.on('newMessagesRoom', (newMessageRoom) => {
			newMessageRoom.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
            setMessagesRoom((prevMessagesRoom) => [...prevMessagesRoom, newMessageRoom]);
        });
    
        return () => {
            socket1.off('newMessagesRoom');
        };
    }, [socket1, setMessagesRoom, messagesRoom]);
};

export default useListenMessagesRoom;
