import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import useGetLastChat from "../../hooks/useGetLastChat";

function Conversations() {
  const [allReceivers, setAllReceivers] = useState([]);
  const { search, setReceiver } = useConversation();
  const { loading, conversations } = useGetConversations();
  const { userLastChat, fetching, arrayLastChat } = useGetLastChat();

  const getReceiver = async () => {
    conversations.map((conversation) => {
      setAllReceivers((prev) => [...prev, conversation._id]);
    });
  };

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

  useEffect(() => {
    getReceiver();
    setReceiver(allReceivers);
  }, [conversations, search, loading]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
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
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}

export default Conversations;
