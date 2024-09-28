import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { useEffect, useState } from "react";

const MessageRoom = ({ message}) => {
  const [isNew, setIsNew] = useState(null); // Initially null (loading state)
  // UseEffect to determine if the message is new or existing
  useEffect(() => {
    if ('senderId' in message) {
      if (typeof message.senderId !== 'string') {
        setIsNew(false); 
      } else {
        setIsNew(true); 
      }
    } else {
      setIsNew(true);
    }
  }, [message]);
 
  const { authUser } = useAuthContext();
  let theSender = '';
  let theSenderId = '';
  let theMsg = '';

//   console.log("IS NEW?  " + isNew);
  if (isNew===true) {
    theSender = message.messageRoom.sender;
	theMsg = message.messageRoom.newMessageRoom;
    theSenderId = theMsg.senderId;
  } else if (isNew === false) {
	theMsg=message;
    theSender = theMsg?.senderId;
    theSenderId = theSender._id;
  }
  
  // Make sure theSenderId is correctly set
  const fromMe = theSenderId === authUser._id;

  if (!theSender || !theSenderId) {
    return null; // Return nothing if sender details are invalid
  }

  const formattedTime = extractTime(theMsg.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const profilePic = fromMe ? authUser.profilePic : theSender?.profilePic;
  console.log("THE MSG IN MESSAGEROOM = ", theMsg)
  const shakeClass = isNew && !fromMe ? "shake" : "";

  return (
    <div>
      {/* Conditional rendering: Show loading indicator if isNew is null */}
      {isNew === null ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader" />
          <p>Loading message...</p>
        </div>
      ) : (
        // Show the chat bubble content once isNew is not null (either true or false)
        <div className={`chat ${chatClassName}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={profilePic} />
            </div>
          </div>
          <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
            {theMsg.messageRoom}
          </div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            {formattedTime}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRoom;