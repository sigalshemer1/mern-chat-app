import { useEffect ,useRef,useState} from 'react';
import useGetMessagesRoom from "../../hooks/useGetMessagesRoom";
import MessageRoom from "./MessageRoom";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessagesRoom from "../../hooks/useListenMessagesRoom";


const MessagesRoom = () => {
	
	const { messagesRoom:initialMessages, loading } = useGetMessagesRoom();
    const [messagesRoom, setMessagesRooms] = useState(initialMessages);
	useListenMessagesRoom();
	const lastMessageRef = useRef();

	useEffect(() => {
        setMessagesRooms(initialMessages);
    }, [initialMessages]);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messagesRoom]);

    return (
        <div className="px-4 flex-1 overflow-auto">
			{!loading &&
				messagesRoom.length > 0 ? (
					messagesRoom.map((message, index) => (
						<div key={message._id} ref={lastMessageRef}>
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
