import { useEffect ,useRef} from 'react';
import { useSocketMessagesRoom } from "../../context/SocketMessagesRoom";
import useGetMessagesRoom from "../../hooks/useGetMessagesRoom";
import MessageRoom from "./MessageRoom";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const MessagesRoom = ({ roomId }) => {
    const { socketRoom } = useSocketMessagesRoom();
	const { messagesRoom, loading } = useGetMessagesRoom();

    useEffect(() => {
        if (socketRoom && roomId) {
            socketRoom.emit('joinRoom', roomId);
            console.log(`Joined room: ${roomId}`);
        }
    }, [socketRoom, roomId]);

	const lastMessageRef = useRef();
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
						<div key={message._id}>
							<MessageRoom message={message} />
						</div>
					))
				) : (
					<p className="text-center">Send a message to start the conversation</p>
				)}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messagesRoom.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
        </div>
    );
};

export default MessagesRoom;
