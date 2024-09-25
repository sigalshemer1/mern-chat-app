import { useEffect } from "react";
import useRoom from "../zustand/useRoom"; // Zustand store
import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from '../context/SocketContext';

const useListenMessagesRoom = () => {
    const { socket } = useSocketContext();
    const { messagesRoom, setMessagesRoom } = useRoom();

    useEffect(() => {
        socket?.on('newMessagesRoom', (newMessageRoom) => {
            console.log("Received message IN LISTNER: ", newMessageRoom);
            
            if (newMessageRoom) {
                newMessageRoom.shouldShake = true;
                const sound = new Audio(notificationSound);
                sound.play();

                // Append new message to Zustand's messagesRoom state
                setMessagesRoom((prevMessages) => [...prevMessages, newMessageRoom]);
            }
        });

        return () => {
            socket?.off('newMessagesRoom');
        };
    }, [socket, setMessagesRoom]);

    return { messagesRoom }; // No need to return sender, it's handled in Zustand now
};

export default useListenMessagesRoom;





// import { useEffect } from "react";
// import useRoom from "../zustand/useRoom";
// import notificationSound from "../assets/sounds/notification.mp3";
// import { useSocketContext } from '../context/SocketContext';

// const useListenMessagesRoom = () => {
//     const { socket } = useSocketContext();
//     const { messagesRoom, setMessagesRoom } = useRoom();
// 	useEffect(() => {
//         socket?.on('newMessagesRoom', (newMessageRoom,sender) => {
//             console.log("inside read socket SENDER = " + JSON.stringify(sender));
// 			newMessageRoom.shouldShake = true;
// 			const sound = new Audio(notificationSound);
// 			sound.play();
//             setMessagesRoom((prevMessagesRoom) => [...prevMessagesRoom, newMessageRoom]);
//         });
    
//         return () => {
//             socket.off('newMessagesRoom');
//         };
//     }, [socket, setMessagesRoom, messagesRoom]);
// };

// export default useListenMessagesRoom;
