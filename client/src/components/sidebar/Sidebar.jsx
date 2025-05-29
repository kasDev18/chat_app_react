import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="md:flex flex-col w-[35%] hidden p-5 border-r-2 border-gray-700">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations/>

      <LogoutButton/>
    </div>
  );
};

export default Sidebar;
