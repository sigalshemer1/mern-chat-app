import { useEffect, useState } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from '../context/SocketContext';

const useListenMessagesRoom = () => {
    const { socket } = useSocketContext();
    const [messagesRoom, setMessagesRoom] = useState([]); // Local state for messages

    useEffect(() => {
        socket?.on('newMessagesRoom', (newMessageRoom) => {
            console.log("Received message IN LISTENER: ", newMessageRoom);
            
            if (newMessageRoom) {
                newMessageRoom.shouldShake = true;
                const sound = new Audio(notificationSound);
                sound.play();

                // Append the new message to the local state
                setMessagesRoom((prevMessages) => [...prevMessages, newMessageRoom]);
            }
        });

        return () => {
            socket?.off('newMessagesRoom');
        };
    }, [socket]);

    return { messagesRoom, setMessagesRoom };
};

export default useListenMessagesRoom;
