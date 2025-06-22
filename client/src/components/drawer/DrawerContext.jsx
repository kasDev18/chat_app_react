import SearchInput from "../sidebar/SearchInput";

export default function DrawerContext({ icon, children, style = "" }) {
  return (
    <div className={`drawer sm:flex md:hidden justify-end w-5 ${style}`}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <button className="btn btn-soft btn-warning">
          <label htmlFor="my-drawer" className="drawer-button">
            {icon}
          </label>
        </button> */}
        {icon}
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200  text-base-content min-h-full w-3/4 list">
          <SearchInput />
          <div className="divider px-3"></div>
          {children}
        </ul>
      </div>
    </div>
  );
}
