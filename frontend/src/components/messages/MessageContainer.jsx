import { useState, useEffect } from "react";
import MessagesRoom from "./MessagesRoom";
import useUIStore from "../../zustand/useUIStore"; // Import your Zustand store for UI state
import useConversation from "../../zustand/useConversation";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = ({ selectedRoom }) => { // Accept selectedRoom as a prop
    const [messagesRoom, setMessagesRoom] = useState([]); // Store all messages
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { selectedTab } = useUIStore(); // Get the current tab
    const { authUser } = useAuthContext();

    

    // Clear selection on unmount
    useEffect(() => {
        return () => {
            setSelectedConversation(null);
        };
    }, [setSelectedConversation]);

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {selectedTab === "rooms" ? (
                selectedRoom ? (
                    <>
                        {/* Room Header */}
                        <div className="bg-slate-500 px-4 py-2 mb-2">
                            <span className="label-text">Room:</span>{" "}
                            <span className="text-gray-900 font-bold">{selectedRoom.roomName}</span>
                        </div>
                        {/* MessagesRoom and MessageRoomInput components for the selected room */}
                        <MessagesRoom selectedRoom={selectedRoom} />
                    </>
                ) : (
                    <NoRoomSelected authUser={authUser} />
                )
            ) : selectedConversation ? (
                <>
                    {/* Conversation Header */}
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="label-text">To:</span>{" "}
                        <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            ) : (
                <NoChatSelected authUser={authUser} />
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome 👋 {authUser.fullName} ❄</p>
          <p>Select a chat to start messaging</p>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    );
  };
  
  const NoRoomSelected = () => {
    const { authUser } = useAuthContext();
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome 👋 {authUser.fullName} ❄</p>
          <p>Select a room to start messaging</p>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    );
  };

// NoChatSelected and NoRoomSelected remain unchanged



// import { useState, useEffect } from "react";
// import MessagesRoom from "./MessagesRoom";
// import Room from "../sidebar/Room"; // 
// import MessageRoomInput from "./MessageRoomInput";
// import useUIStore from "../../zustand/useUIStore";
// import useConversation from "../../zustand/useConversation";
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";
// import { TiMessages } from "react-icons/ti";
// import { useAuthContext } from "../../context/AuthContext";

// const MessageContainer = () => {
//   const [messagesRoom, setMessagesRoom] = useState([]); // Store all messages
//   const [selectedRoom, setSelectedRoom] = useState(null); // Local state for selected room
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { selectedTab } = useUIStore(); // Get the current tab

//   // Clear selection on unmount
//   useEffect(() => {
//     return () => {
//       setSelectedConversation(null);
//       setSelectedRoom(null); // Clear room on unmount
//     };
//   }, [setSelectedConversation]);

//   // Function to handle sending a new message
//   const handleSendMessageRoom = (newMessage) => {
//     setMessagesRoom((prevMessages) => [...prevMessages, newMessage]);
//   };

//   // Example of selecting a room; this can be set based on your application logic
//   const handleSelectRoom = (room) => {
//     setSelectedRoom(room);
//     setMessagesRoom([]); // Clear messages when switching rooms
//   };
// console.log("selectedRoom = ",selectedRoom)
//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//       {selectedTab === "rooms" ? (
//         selectedRoom ? (
//           <>
//             {/* Room Header */}
//             <div className="bg-slate-500 px-4 py-2 mb-2">
//               <span className="label-text">Room:</span>{" "}
//               <span className="text-gray-900 font-bold">{selectedRoom.roomName}</span>
//             </div>
//             {/* MessagesRoom and MessageRoomInput components for the selected room */}
//             <MessagesRoom messagesRoom={messagesRoom} />
//             <MessageRoomInput onSendMessage={handleSendMessageRoom} />
//           </>
//         ) : (
//           <NoRoomSelected />
//         )
//       ) : selectedConversation ? (
//         <>
//           {/* Conversation Header */}
//           <div className="bg-slate-500 px-4 py-2 mb-2">
//             <span className="label-text">To:</span>{" "}
//             <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
//           </div>
//           <Messages />
//           <MessageInput />
//         </>
//       ) : (
//         <NoChatSelected />
//       )}
//     </div>
//   );
// };

// export default MessageContainer;


  

// import { useEffect, useState } from "react";
// import useConversation from "../../zustand/useConversation"; // Retain useConversation if necessary
// import useUIStore from "../../zustand/useUIStore"; // Retain if needed for UI state
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";
// import MessageRoomInput from "./MessageRoomInput";
// import MessagesRoom from "./MessagesRoom";
// import { TiMessages } from "react-icons/ti";
// import { useAuthContext } from "../../context/AuthContext";

// // Assume selectedRoom is passed as a prop or handled via state in this component
// const MessageContainer = ({ selectedRoomProp }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { selectedTab } = useUIStore();
  
//   // Local state for selectedRoom (or pass it down from a parent component)
//   const [selectedRoom, setSelectedRoom] = useState(selectedRoomProp || null);

//   useEffect(() => {
//     return () => {
//       // Cleanup when component unmounts
//       setSelectedConversation(null);
//       setSelectedRoom(null); // Reset room on unmount
//     };
//   }, [setSelectedConversation]);
// console.log("SELECTED ROOM = " + selectedRoom)
//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//       {selectedTab === "rooms" ? (
//         selectedRoom ? (
//           <>
//             {/* Room Header */}
//             <div className="bg-slate-500 px-4 py-2 mb-2">
//               <span className="label-text">Room:</span>{" "}
//               <span className="text-gray-900 font-bold">{selectedRoom.roomName}</span>
//             </div>
//             {/* MessagesRoom and MessageRoomInput components for the selected room */}
//             <MessagesRoom selectedRoom={selectedRoom} />
//             <MessageRoomInput selectedRoom={selectedRoom} />
//           </>
//         ) : (
//           <NoRoomSelected />
//         )
//       ) : selectedConversation ? (
//         <>
//           {/* Conversation Header */}
//           <div className="bg-slate-500 px-4 py-2 mb-2">
//             <span className="label-text">To:</span>{" "}
//             <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
//           </div>
//           <Messages />
//           <MessageInput />
//         </>
//       ) : (
//         <NoChatSelected />
//       )}
//     </div>
//   );
// };

// export default MessageContainer;

