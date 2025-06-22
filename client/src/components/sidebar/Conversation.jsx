import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { extractTime } from "../../utils/extractTime";

function Conversation({ conversation, lastIdx, userLastChat, fetching }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext(); /* Get online users */
  const isOnline = onlineUsers.includes(
    conversation._id
  ); /* Check if user is online */

  /* Convert to local time */
  const formattedDateTime = extractTime(
    userLastChat?.updatedAt || userLastChat?.createdAt
  );

  return (
    <>
      <li
        className={`list-row md:gap-3 ${
          isSelected ? "bg-[#2e2e2e]" : ""
        } hover:bg-[#2e2e2e] p-1 md:p-3 cursor-pointer `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="flex items-center md:gap-3">
          <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
            <div className="md:w-12 w-8 rounded-full">
              {/* <img
                src={conversation.profilePic}
                alt="user avatar"
                loading="lazy"
              /> */}
              <img
                src="https://th.bing.com/th/id/OIP.Ai9h_6D7ojZdsZnE4_6SDgAAAA?r=0&rs=1&pid=ImgDetMain"
                alt="user avatar"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-between">
              <p className="font-bold text-gray-200 text-xs 2xl:text-lg">
                {conversation.fullName}
              </p>
              <div className="md:flex justify-between hidden w-full">
                {userLastChat?.last_chat ? (
                  <>
                    <p className="text-gray-400 text-xs 2xl:text-md italic w-45">
                      {fetching ? "..." : userLastChat.last_chat}
                    </p>
                    <p className="text-gray-400 text-xs 2xl:text-md italic w-[20%]">
                      {fetching ? "" : formattedDateTime}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-400 text-xs 2xl:text-md italic">
                      {fetching
                        ? "..."
                        : "Send a message to start a conversation"}
                    </p>
                  </>
                )}
              </div>
              {/* <span className="text-xl">🥕</span> */}
            </div>
          </div>
        </div>
      </li>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
