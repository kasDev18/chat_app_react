import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

/**
 * DOCU: This hook is used to get the last chat from the conversaation of sender and receiver <br>
 * This is being called in Conversations.jsx and applied in Conversation.jsx <br>
 * Last Updated Date: June 6, 2025 <br>
 * @function
 * @author Kas
 */
function useGetLastChat() {
  const [fetching, setFetching] = useState(false);
  const { userLastChat, setUserLastChat, receiver, setArrayLastChat, arrayLastChat } = useConversation();

  useEffect(() => {
    const getLastChat = async () => {
      setFetching(true);
      try {
        let messages = [];
        let arrMessages = [];

        for(let i = 0; i < receiver.length; i++) {
          const res = await fetch(`/api/messages/${receiver[i]}`);
          const data = await res.json();

          if (data.error) throw new Error(data.error); /* Handle Error */

          
          if(data.length === 0){
            /* If no message, push empty object */
            messages.push({
              last_chat: "",
            });
            arrMessages.push("");
          }else{
            /* If message, push last message */
            messages.push({
              senderId: data[data.length - 1].senderId,
              receiverId: data[data.length - 1].receiverId,
              last_chat: data[data.length - 1].message,
              createdAt: data[data.length - 1].createdAt,
              updatedAt: data[data.length - 1].updatedAt
            });
            arrMessages.push(data[data.length - 1].message);
          }
        };
        setUserLastChat(messages); /* Set User Last Chat object */
        setArrayLastChat(arrMessages); /* Set Array Last Chat */
      } catch (error) {
        toast.error(error.message);
      } finally {
        setTimeout(() => {
          setFetching(false);
        }, 1000);
      }
    };

    getLastChat();
  }, [receiver, setUserLastChat]);

  return { fetching, userLastChat, arrayLastChat };
}

export default useGetLastChat;
