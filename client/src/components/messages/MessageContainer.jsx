import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import Conversation from "../sidebar/Conversation";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { useAuthContext } from "../../context/AuthContext";
import { FaUsers } from "react-icons/fa";
import LogoutButton from "../sidebar/LogoutButton";

const MessageContainer = () => {
  const { loading, conversations } = useGetConversations();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const NoChatSelected = () => {
    return (
      <div className="flex items-center justify-center w-full h-full mx-3 rounded-2xl bg-purple-950">
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
        <div className="w-full flex flex-col mx-3 rounded-2xl bg-purple-950 p-5">
          <>
            {/* Header */}
            <div className="flex items-center justify-between bg-slate-500 px-4 py-2 mb-2">
              <div className="">
                <span className="label-text">To: </span>
                <span className="text-gray-900 font-bold">
                  {selectedConversation.fullName}
                </span>
              </div>

              <div className="drawer sm:flex md:hidden justify-end w-5">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer" className="drawer-button">
                    <FaUsers className="hover:bg-amber-400"/>
                  </label>
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
                  {/*
                  <ul className="menu bg-base-200  text-base-content min-h-full w-3/4 p-4">
                    <li>
                      <a>Sidebar Item 1</a>
                    </li>
                    <li>
                      <a>Sidebar Item 2</a>
                    </li>
                  </ul>
                  */}
                </div>
              </div>
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
