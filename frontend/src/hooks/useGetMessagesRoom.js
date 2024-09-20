import { useEffect, useState } from "react";
import useRoom from "../zustand/useRoom";
import toast from "react-hot-toast";

const useGetMessagesRoom = () => {
  const [loading, setLoading] = useState(false);
  const { messagesRoom, setMessagesRoom, selectedRoom } = useRoom();

  useEffect(() => {
    const getMessagesRoom = async () => {
      setLoading(true);
      try {
        if (!selectedRoom?._id) throw new Error("No Room ID provided.");
        const res = await fetch(`/api/messageRoom/${selectedRoom._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessagesRoom(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoom?._id) getMessagesRoom();
  }, [selectedRoom?._id, setMessagesRoom]);

  // Only return the component when loading is false and there are messages
  const hasMessages = messagesRoom && messagesRoom.length > 0;

  return { messagesRoom, loading, hasMessages };
};

export default useGetMessagesRoom;