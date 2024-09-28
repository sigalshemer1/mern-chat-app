import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetMessagesRoom = (selectedRoom) => {
  const [loading, setLoading] = useState(false);
  const [messagesRoom, setMessagesRoom] = useState([]); // Local state for messages

  useEffect(() => {
    const getMessagesRoom = async () => {
      setLoading(true);
      try {
        if (!selectedRoom?._id) throw new Error("No Room ID provided.");
        
        // Fetch messages for the selected room
        const res = await fetch(`/api/messageRoom/${selectedRoom._id}`);
        const data = await res.json();
        
        // Check if data is an array, if not set it to an empty array
        if (!Array.isArray(data)) {
          console.error("Expected an array of messages, but received:", data);
          setMessagesRoom([]); // Fallback to an empty array
        } else {
          // Update the local state with fetched messages
          setMessagesRoom(data);
        }
      } catch (error) {
        toast.error(error.message || "Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoom?._id) getMessagesRoom();
  }, [selectedRoom?._id]);

  // Determine if there are messages
  const hasMessages = messagesRoom.length > 0;

  return { messagesRoom, loading, hasMessages, setMessagesRoom };
};

export default useGetMessagesRoom;
