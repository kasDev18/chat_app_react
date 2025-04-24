import { useState } from "react";
import { toast } from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3)
      toast.error("Search must be at least 3 characters long");

    const conversation = conversations.find((conversation) => {
      return conversation.fullName.toLowerCase().includes(search.toLowerCase());
    });

    if (conversation) {
      console.log(conversation);

      setSelectedConversation(conversation);
    } else toast.error("No such user found");
  };

  return (
    <form className="flex items-center gap-2 px-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="input input-border rounded-full 2xl:input-xl 2xl:w-full"
      />
      <button type="submit" className="btn btn-circle text-white 2xl:btn-xl btn-primary">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
