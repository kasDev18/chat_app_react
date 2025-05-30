import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import SearchInput from "../sidebar/SearchInput";
import Conversation from "../sidebar/Conversation";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { useAuthContext } from "../../context/AuthContext";
import { FaUsers } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import LogoutButton from "../sidebar/LogoutButton";
import DrawerContext from "../drawer/DrawerContext";

const MessageContainer = () => {
  const { loading, conversations } = useGetConversations();
  const { selectedConversation, setSelectedConversation, search } =
    useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const NoChatSelected = () => {
    return (
      <div className="flex items-center justify-center md:w-full md:h-full w-screen md:mx-3 md:rounded-2xl ">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome 👋 {authUser.fullName}</p>
          <p>Select a chat to start a conversation</p>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    );
  };

  const sidebar = () => {
    return (
      <>
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
              />
            ))}
        {loading ? <span className="loading loading-spinner"></span> : null}
        <LogoutButton />
      </>
    );
  };

  return (
    <>
      {!selectedConversation ? (
        <>
          <DrawerContext
            icon={
              <button className="btn btn-soft btn-warning">
                <label htmlFor="my-drawer" className="drawer-button">
                  <MdNavigateNext />
                </label>
              </button>
            }
            style="absolute top-3 left-3"
          >
            {sidebar()}
          </DrawerContext>
          <NoChatSelected />
        </>
      ) : (
        <div className="w-full flex flex-col md:mx-3 md:rounded-2xl bg-gray-800">
          <>
            {/* Header */}
            <div className="flex items-center justify-between bg-purple-800 border-b-4 border-b-[#FFD966] px-4 py-2 shadow-2xl">
              <div className="flex items-center gap-2">
                <img
                  src=""
                  alt="receiver_image"
                  className="w-10 h-10 rounded-full bg-white"
                />
                <span className="font-bold text-lg text-gray-100">
                  {selectedConversation.fullName}
                </span>
              </div>
              <DrawerContext
                icon={
                  <label htmlFor="my-drawer" className="drawer-button">
                    <FaUsers className="text-2xl" />
                  </label>
                }
              >
                {sidebar()}
              </DrawerContext>
            </div>

            <Messages />
            <MessageInput />
          </>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
