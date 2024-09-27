import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessageRoom from "../../hooks/useSendMessageRoom";
import { ACTIONS } from './MessagesRoom.jsx'; // Import actions

const MessageRoomInput = ({ selectedRoom, dispatch }) => { // Ensure selectedRoom is passed as a prop
  const [messageRoom, setMessageRoom] = useState("");
  const { loading, sendMessageRoom } = useSendMessageRoom();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageRoom.trim()) return;

    const newMessage = await sendMessageRoom(messageRoom, selectedRoom); // Pass selectedRoom to the hook

    if (newMessage) {
      dispatch({ type: ACTIONS.ADD_MSG, payload: { msg: newMessage } }); // Add new message to state
    }
    
    setMessageRoom(""); // Clear the input field
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type your message"
          value={messageRoom}
          onChange={(e) => setMessageRoom(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageRoomInput;
