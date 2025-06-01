import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  search: "",
  setSearch: (search) => set({ search }),
  receiver: [],
  setReceiver: (receiver) => set({ receiver }),
  userLastChat: [],
  setUserLastChat: (userLastChat) => set({ userLastChat }),
}));

export default useConversation;
