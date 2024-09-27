import { useEffect, useReducer, useRef } from 'react';
import MessageRoom from "./MessageRoom";
import MessageRoomInput from "./MessageRoomInput";
import useGetMessagesRoom from "../../hooks/useGetMessagesRoom";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessagesRoom from "../../hooks/useListenMessagesRoom";

export const ACTIONS = {
  SET_INITIAL_MSGS: 'set-initial-msgs',
  ADD_MSG: 'add-msg'
};

function reducer(msgs, action) {
  console.log("IN REDUCER = " + JSON.stringify(action))
  switch (action.type) {
    case ACTIONS.SET_INITIAL_MSGS:
      return [...action.payload.initialMessages];
    case ACTIONS.ADD_MSG:
      return [...msgs, newMsg(action.payload.msg)];
    default:
      return msgs;
  }
}

function newMsg(msg) {
  return { ...msg }; // Adjust this to match the actual message structure
}

const MessagesRoom = ({ selectedRoom }) => {
  if (!selectedRoom?._id) {
    return <div>No room selected</div>; // Early return if no valid room is selected
  }

  const [msgs, dispatch] = useReducer(reducer, []);
  const { messagesRoom: initialMessages, loading } = useGetMessagesRoom(selectedRoom);
  const lastMessageRef = useRef(null);

  // Sync fetched messages to the local state via the reducer
  useEffect(() => {
    if (initialMessages.length > 0) {
      dispatch({ type: ACTIONS.SET_INITIAL_MSGS, payload: {  initialMessages } });
    }
  }, [initialMessages]);

  useListenMessagesRoom(); //Listen to new messages

  // Scroll to the last message when messages change
  useEffect(() => {
    if (msgs.length > 0 && lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [msgs]);


  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && msgs.length > 0 &&
        msgs.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <MessageRoom message={message} />
          </div>
        ))
      }

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      
      {/* Ensure that selectedRoom is passed to MessageRoomInput */}
      <MessageRoomInput selectedRoom={selectedRoom} dispatch={dispatch} />
    </div>
  );
};

export default MessagesRoom;
