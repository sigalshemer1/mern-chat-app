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

        if (res.status >= 400) {
          throw new Error(data.error || "Failed to fetch messages.");
        }

        // Set the messages in the Zustand store
        setMessagesRoom(data);
      } catch (error) {
        toast.error(error.message);
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoom?._id) {
      getMessagesRoom();
    }
  }, [selectedRoom?._id, setMessagesRoom]);

  // Use this to detect when messagesRoom has changed
  useEffect(() => {
    console.log("Updated messagesRoom:", messagesRoom);
  }, [messagesRoom]);

  // Only return the component when loading is false and there are messages
  const hasMessages = messagesRoom && messagesRoom.length > 0;

  return { messagesRoom, loading, hasMessages };
};

export default useGetMessagesRoom;
