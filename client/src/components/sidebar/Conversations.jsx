import { useState, useEffect } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import useGetLastChat from "../../hooks/useGetLastChat";

function Conversations() {
  const [allReceivers, setAllReceivers] = useState([]);
  const [conversation, setConversation] = useState(null);
  const { search, setReceiver } = useConversation();
  const { loading, conversations } = useGetConversations();
  const { userLastChat, arrayLastChat, fetching } = useGetLastChat();

  const getReceiver = async () => {
    conversations.map((conversation) => {
      setAllReceivers((prev) => [...prev, conversation._id]);
    });
  };

  useEffect(() => {
    setConversation(conversations);
    getReceiver();
    setReceiver(allReceivers);
  }, [conversation, conversations, search]);

  const getIndexLastChat = (conversation) => {
    let obj;
    userLastChat.map((user) => {
      if (
        user?.senderId === conversation._id ||
        user?.receiverId === conversation._id
      )
        obj = user;
    });

    const index = arrayLastChat.findIndex((data) => data === obj?.last_chat);
    return userLastChat[index];
  };

  return (
    <ul className="py-2 overflow-y-auto h-full list">
      {search
        ? conversations
            .filter((data) =>
              data.fullName.toLowerCase().includes(search.toLowerCase())
            )
            .map((conversation, idx) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                lastIdx={idx === conversations.length - 1}
                userLastChat={getIndexLastChat(conversation)}
                fetching={fetching}
              />
            ))
        : conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastIdx={idx === conversations.length - 1}
              userLastChat={userLastChat[idx]}
              fetching={fetching}
            />
          ))}
      {/* {loading ? <span className="loading loading-spinner"></span> : null} */}
    </ul>
  );
}

export default Conversations;
