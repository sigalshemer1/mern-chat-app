import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessageRoom from "../../hooks/useSendMessageRoom";

const MessageRoomInput = () => {
	const [messageRoom, setMessageRoom] = useState("");
	const { loading, sendMessageRoom } = useSendMessageRoom();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!messageRoom) return;
		await sendMessageRoom(messageRoom);
		setMessageRoom("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={messageRoom}
					onChange={(e) => setMessageRoom(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageRoomInput;