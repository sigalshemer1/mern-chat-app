import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from '../context/SocketContext';
import { ACTIONS } from '../components/messages/MessagesRoom'; // Import actions

const useListenMessagesRoom = (dispatch) => {
    const { socket } = useSocketContext();

useEffect(() => {
    socket?.on('newMessagesRoom', (newMessageRoom) => {
        console.log("Received message IN LISTENER: ", newMessageRoom);
        
        if (newMessageRoom) {
            newMessageRoom.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            // Dispatch the new message to the reducer
            dispatch({ type: ACTIONS.ADD_MSG, payload: { msg: newMessageRoom } });
        }
    });
    return () => {
        socket?.off('newMessagesRoom');
    };
}, [socket, dispatch]);
};

export default useListenMessagesRoom;
