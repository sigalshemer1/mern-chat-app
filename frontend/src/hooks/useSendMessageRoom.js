import { useState } from "react";
import toast from "react-hot-toast";

const useSendMessageRoom = () => {
  const [loading, setLoading] = useState(false);

  const sendMessageRoom = async (messageRoom, selectedRoom) => {
    setLoading(true);
    try {
      // Check if the selected room ID is available
      if (!selectedRoom?._id) throw new Error("No Room ID provided.");
      
      // Send the message to the backend
      const res = await fetch(`/api/messageRoom/send/${selectedRoom._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageRoom }),
      });

      // Parse the response
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      return data; // Return the new message
    } catch (error) {
      toast.error(error.message || "Failed to send the message.");
      return null; // Return null in case of an error
    } finally {
      setLoading(false);
    }
  };

  return { sendMessageRoom, loading };
};

export default useSendMessageRoom;