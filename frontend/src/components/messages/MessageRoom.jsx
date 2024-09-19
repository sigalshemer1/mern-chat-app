import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const MessageRoom = ({ message }) => {

	const { authUser } = useAuthContext();
	// Ensure messageRoom and authUser are defined
	if (!message || !authUser) {
		return null;
	}
	const theSender = message.senderId;
	const fromMe = message.senderId._id === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const profilePic = fromMe ? authUser.profilePic : theSender?.profilePic;

	const shakeClass = message.shouldShake ? "shake" : "";
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.messageRoom}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default MessageRoom;
