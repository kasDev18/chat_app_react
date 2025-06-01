import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

function Messages() {
  const { loading, messages } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, [loading, messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && messages.length > 0
        ? [...Array(messages.length)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))
        : loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading &&
        messages.length > 0 &&
        messages.map((message, idx) => (
          <div ref={lastMessageRef} key={message._id}>
            <Message key={message._id} message={message} />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <div className="text-center opacity-50 text-white">
          Send a message to start a conversation
        </div>
      )}
    </div>
  );
}

export default Messages;
