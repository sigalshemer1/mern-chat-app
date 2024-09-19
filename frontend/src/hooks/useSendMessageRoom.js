import { useState, useEffect } from "react";
import useRoom from "../zustand/useRoom";
import toast from "react-hot-toast";

const useSendMessageRoom = () => {
	const [loading, setLoading] = useState(false);
	const { messagesRoom, setMessagesRoom, selectedRoom } = useRoom();

	const sendMessageRoom = async (messageRoom) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messageRoom/send/${selectedRoom._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messageRoom }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessagesRoom([...messagesRoom, data]);
		} catch (error) {
			toast.error(error.messageRoom);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessageRoom, loading };
};
export default useSendMessageRoom;