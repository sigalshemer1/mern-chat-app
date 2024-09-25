import { useEffect, useRef, useState } from 'react';
import useGetMessagesRoom from "../../hooks/useGetMessagesRoom";
import MessageRoom from "./MessageRoom";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessagesRoom from "../../hooks/useListenMessagesRoom";

const MessagesRoom = () => {
	useListenMessagesRoom();
    const { messagesRoom: initialMessages, loading } = useGetMessagesRoom();
	const [messagesRoom, setMessagesRoom] = useState(initialMessages);
    const lastMessageRef = useRef();
	
    // Sync the initial messages from the backend when component loads
    useEffect(() => {
        if (initialMessages.length > 0) {
            setMessagesRoom(initialMessages);
        }
    }, [initialMessages]);
console.log("ROOMS = " + JSON.stringify(messagesRoom));
    // Scroll to the last message when messages change
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messagesRoom]);
	
    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading && messagesRoom.length > 0 ? (
                messagesRoom.map((message, index) => (
                    <div key={message._id || index} ref={index === messagesRoom.length - 1 ? lastMessageRef : null}>
                        <MessageRoom message={message} />
                    </div>
                ))
            ) : (
                <p className="text-center">Send a message to start the conversation</p>
            )}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messagesRoom.length === 0 && (
                <p className='text-center'>Send a message to start the chat</p>
            )}
        </div>
    );
};

export default MessagesRoom;

/*
import { useEffect, useRef } from 'react';
import useGetMessagesRoom from "../../hooks/useGetMessagesRoom";
import MessageRoom from "./MessageRoom";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessagesRoom from "../../hooks/useListenMessagesRoom";
import useRoom from "../../zustand/useRoom"; // Zustand store

const MessagesRoom = () => {
    const { messagesRoom: initialMessages, loading } = useGetMessagesRoom();
    const { messagesRoom, sender } = useRoom(); // Get messagesRoom and sender from Zustand
    const lastMessageRef = useRef();

    // Sync the initial messages from the backend when component loads
    useEffect(() => {
        if (initialMessages.length > 0) {
            setMessagesRooms(initialMessages);
        }
    }, [initialMessages]);

    // Scroll to the last message when messages change
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messagesRoom]);

    console.log("THE SENDER IN MESSAGES = ", sender); // Now you should see sender from Zustand

    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading && messagesRoom.length > 0 ? (
                messagesRoom.map((message, index) => (
                    <div key={message._id || index} ref={index === messagesRoom.length - 1 ? lastMessageRef : null}>
                        <MessageRoom message={message} sender={sender} />
                    </div>
                ))
            ) : (
                <p className="text-center">Send a message to start the conversation</p>
            )}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messagesRoom.length === 0 && (
                <p className='text-center'>Send a message to start the chat</p>
            )}
        </div>
    );
};

export default MessagesRoom;

*/



// import { useEffect ,useRef,useState} from 'react';
// import useGetMessagesRoom from "../../hooks/useGetMessagesRoom";
// import MessageRoom from "./MessageRoom";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import useListenMessagesRoom from "../../hooks/useListenMessagesRoom";

// const MessagesRoom = () => {
	
// 	const { messagesRoom:initialMessages, loading } = useGetMessagesRoom();
//     const [messagesRoom, setMessagesRooms] = useState(initialMessages);
// 	useListenMessagesRoom();
// 	const lastMessageRef = useRef();

// 	useEffect(() => {
//         setMessagesRooms(initialMessages);
//     }, [initialMessages]);

// 	useEffect(() => {
// 		setTimeout(() => {
// 			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
// 		}, 100);
// 	}, [messagesRoom]);

//     return (
//         <div className="px-4 flex-1 overflow-auto">
// 			{!loading &&
// 				messagesRoom.length > 0 ? (
// 					messagesRoom.map((message, index) => (
// 						<div key={message._id} ref={lastMessageRef}>
// 							<MessageRoom message={message} />
// 						</div>
// 					))
// 				) : (
// 					<p className="text-center">Send a message to start the conversation</p>
// 				)}

// 			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
// 			{!loading && messagesRoom.length === 0 && (
// 				<p className='text-center'>Send a message to start the chat</p>
// 			)}
//         </div>
//     );
// };

// export default MessagesRoom;
