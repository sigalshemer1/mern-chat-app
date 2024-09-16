import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import useRoom from "../../zustand/useRoom";
import useUIStore from "../../zustand/useUIStore";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { selectedRoom, setSelectedRoom } = useRoom();
	const { selectedTab } = useUIStore(); 

    useEffect(() => {
        // Clean up the selected conversation when unmounting
        return () => {
            setSelectedConversation(null);
            setSelectedRoom(null); // Optionally clear the room too
        };
    }, [setSelectedConversation, setSelectedRoom]);

    return (
        <div className='md:min-w-[450px] flex flex-col'>
           {selectedTab === "rooms" ? (
                selectedRoom ? (
                    <RoomContainer room={selectedRoom} />
                ) : (
                    <NoRoomSelected />
                )
            ) : selectedConversation ? (
                <>
                    {/* Conversation Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>{" "}
                        <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            ) : (
                <NoChatSelected />
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

const NoRoomSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a room to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

const RoomContainer = ({ room }) => {
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {/* Room Header */}
            <div className='bg-blue-500 px-4 py-2 mb-2'>
                <span className='label-text'>Room:</span>{" "}
                <span className='text-gray-900 font-bold'>{room.name}</span>
            </div>
            {/* Add the room-specific content here */}
            <RoomMessages roomId={room.id} />
            <RoomMessageInput roomId={room.id} />
        </div>
    );
};

const RoomMessages = ({ roomId }) => {
    // Placeholder for the room's messages logic
    return <div className='flex-grow overflow-y-auto'>Room Messages for {roomId}</div>;
};

const RoomMessageInput = ({ roomId }) => {
    // Placeholder for the room's message input logic
    return <div>Room Message Input for {roomId}</div>;
};
