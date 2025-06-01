import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { extractTime } from "../../utils/extractTime";

function Conversation({ conversation, lastIdx, userLastChat }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext(); /* Get online users */
  const isOnline = onlineUsers.includes(conversation._id); /* Check if user is online */

  /* Convert to local time */
  const formattedDateTime = extractTime(
    userLastChat?.updatedAt || userLastChat?.createdAt
  );

  return (
    <>
      <div
        className={`flex gap-2 items-center ${
          isSelected ? "bg-[#2e2e2e]" : ""
        } hover:bg-[#2e2e2e] p-3 cursor-pointer `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="md:w-12 w-8 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-col justify-between">
            <p className="font-bold text-gray-200 text-xs 2xl:text-lg">
              {conversation.fullName}
            </p>
            <div className="md:flex justify-between hidden">
              {userLastChat?.message ? (
                <>
                  <p className="text-gray-400 text-xs 2xl:text-md italic">
                    {userLastChat.message}
                  </p>
                  <p className="text-gray-400 text-xs 2xl:text-md italic">
                    {formattedDateTime}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-xs 2xl:text-md italic">
                    Send a message to start a conversation
                  </p>
                </>
              )}
            </div>
            {/* <span className="text-xl">🥕</span> */}
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
