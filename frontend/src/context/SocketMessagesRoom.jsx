import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketMessagesRoom = createContext();

export const useSocketMessagesRoom = () => {
	return useContext(SocketMessagesRoom);
};

const SocketMessagesRoomProvider = ({ children }) => {
    const [socketRoom, setSocketRoom] = useState(null);
    const [messagesRoom, setMessagesRoom] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const newSocket = io("http://localhost:5000", {
                query: { userId: authUser._id },
            });

            setSocketRoom(newSocket);

            newSocket.on("getNewMessagesRoom", (messages) => {
                setMessagesRoom(messages);
            });
			

            return () => {
                newSocket.close();
            };
        } else {
            if (socketRoom) {
                socketRoom.close();
                setSocketRoom(null);
            }
        }
    }, [authUser]);

    return (
        <SocketMessagesRoom.Provider value={{ socketRoom, messagesRoom }}>
            {children}
        </SocketMessagesRoom.Provider>
    );
};
export default SocketMessagesRoomProvider;