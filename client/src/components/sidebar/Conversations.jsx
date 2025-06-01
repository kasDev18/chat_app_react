import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import useGetLastChat from "../../hooks/useGetLastChat";

function Conversations() {
  const [allReceivers, setAllReceivers] = useState([]);
  const { search, setReceiver } = useConversation();
  const { loading, conversations } = useGetConversations();
  const { userLastChat } = useGetLastChat();
  
  const getReceiver = async () => {
    conversations.map((conversation) => {
      setAllReceivers((prev) => [...prev, conversation._id]);
    })

  };

  useEffect(() => {
    getReceiver();
    setReceiver(allReceivers);
  }, [conversations]);
  
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
              />
            ))
        : conversations.map((conversation, idx) => (

            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastIdx={idx === conversations.length - 1}
              userLastChat={userLastChat[idx]}
            />
            ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}

export default Conversations;
