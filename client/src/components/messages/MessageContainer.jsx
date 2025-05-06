import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
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
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const NoChatSelected = () => {
    return (
      <div className="flex items-center justify-center md:w-full md:h-full w-screen md:mx-3 md:rounded-2xl bg-purple-950">
        {/* <div className="drawer sm:flex md:hidden justify-end w-5 absolute top-3 left-3">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <button className="btn btn-soft btn-warning">
              <label htmlFor="my-drawer" className="drawer-button">
                <MdNavigateNext />
              </label>
            </button>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu bg-base-200  text-base-content min-h-full w-3/4 p-4  ">
              {conversations.map((conversation, idx) => (
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  lastIdx={idx === conversations.length - 1}
                />
              ))}
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : null}
              <LogoutButton />
            </div>
          </div>
        </div> */}

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
          {conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastIdx={idx === conversations.length - 1}
            />
          ))}
          {loading ? <span className="loading loading-spinner"></span> : null}
          <LogoutButton />
        </DrawerContext>
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome 👋 {authUser.fullName}</p>
          <p>Select a chat to start a conversation</p>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    );
  };

  return (
    <>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="w-full flex flex-col md:mx-3 md:rounded-2xl bg-purple-950 md:p-5">
          <>
            {/* Header */}
            <div className="flex items-center justify-between bg-purple-800 border-b-4 border-b-[#FFD966] px-4 py-2 shadow-2xl">
              <div className="flex items-center gap-2">
                <img src="" alt="receiver image" className="w-10 h-10 rounded-full bg-white" />
                <span className="font-bold text-lg text-gray-100">
                  {selectedConversation.fullName}
                </span>
              </div>
              <DrawerContext
                icon={
                  <label htmlFor="my-drawer" className="drawer-button">
                    <FaUsers className="text-2xl"/>
                  </label>
                }
              >
                {conversations.map((conversation, idx) => (
                  <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastIdx={idx === conversations.length - 1}
                  />
                ))}
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : null}
                <LogoutButton />
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
