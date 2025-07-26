import { useEffect } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import useGetLastChat from "../../hooks/useGetLastChat";

function Conversations() {
  const { search, setReceiver } = useConversation();
  const { loading, conversations } = useGetConversations();
  const { userLastChat, arrayLastChat } = useGetLastChat();

  // Update receiver list when conversations change
  useEffect(() => {
    console.log("conversations", conversations);
    console.log("arrayLastChat", arrayLastChat);
    
    if (conversations && conversations.length > 0) {
      const receiverIds = conversations.map(conversation => conversation._id);
      setReceiver(receiverIds);
    }
  }, [conversations, setReceiver]);

  const getIndexLastChat = (conversation) => {
    if (!userLastChat || userLastChat.length === 0) return null;
    
    const obj = userLastChat.find((user) => 
      user?.senderId === conversation._id || user?.receiverId === conversation._id
    );

    console.log("obj", obj);
    
    if (!obj) return null;

    const index = arrayLastChat.findIndex((data) => data === obj?.last_chat);
    return userLastChat[index] || null;
  };

  // console.log("userLastChat", userLastChat);
  

  // Filter conversations based on search
  const filteredConversations = search
    ? conversations.filter((conversation) =>
        conversation.fullName.toLowerCase().includes(search.toLowerCase())
      )
    : conversations;

  return (
    <ul className="py-2 overflow-y-auto h-full list">
      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === filteredConversations.length - 1}
          userLastChat={getIndexLastChat(conversation)}
        />
      ))}
      {/* {loading && <span className="loading loading-spinner"></span>} */}
    </ul>
  );
}

export default Conversations;
