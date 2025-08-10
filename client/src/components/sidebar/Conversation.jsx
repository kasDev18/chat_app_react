import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { extractTime } from "../../utils/extractTime";
import useGetLastChat from "../../hooks/useGetLastChat";

function Conversation({ conversation, lastIdx, userLastChat, fetching }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const formattedDateTime = extractTime(
    userLastChat?.updatedAt || userLastChat?.createdAt
  );

  return (
    <>
      <li
        className={`list-row w-full cursor-pointer p-1 md:p-3 md:gap-3 hover:bg-[#2e2e2e] ${
          isSelected ? "bg-[#2e2e2e]" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        {fetching ? (
          <SidebarSkeleton />
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
              <div className="w-8 md:w-12 rounded-full overflow-hidden">
                <img
                  src="https://th.bing.com/th/id/OIP.Ai9h_6D7ojZdsZnE4_6SDgAAAA?r=0&rs=1&pid=ImgDetMain"
                  alt="user avatar"
                  loading="lazy"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <p className="font-bold text-gray-200 text-xs 2xl:text-lg truncate">
                {conversation.fullName}
              </p>
              <div className="hidden md:flex justify-between w-full">
                {userLastChat?.last_chat ? (
                  <>
                    <p className="text-gray-400 text-xs 2xl:text-md italic truncate w-44 md:w-56 2xl:w-72">
                      {userLastChat.last_chat}
                    </p>
                    <p className="text-gray-400 text-xs 2xl:text-md italic text-end whitespace-nowrap">
                      {formattedDateTime}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400 text-xs 2xl:text-md italic">
                    Send a message to start a conversation
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </li>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
