import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const {loading, messages} = useGetMessages();
  const messageRef = useRef();
  useListenMessages();
  useEffect(() => {
    setTimeout(() => messageRef.current?.scrollIntoView({behaviour: "smooth"}));
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={messageRef}> 
          <Message key={message._id} message={message} />
        </div>
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a conversation</p>
      )}
    </div>
  )
}

export default Messages;