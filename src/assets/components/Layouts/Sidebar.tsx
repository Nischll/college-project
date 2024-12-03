import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../useContext/AuthContext";
import { useSidebar } from "../useContext/SidebarContext";

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useSidebar();

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: "home.png", visible: user?.role === "admin" },
    { name: "Inventory", path: "inventory", icon: "cart.png", visible: true },
    { name: "Reports", path: "reports", icon: "board.png", visible: user.role === "admin" },
    { name: "Suppliers", path: "/", icon: "suppliers.png", visible: true },
    { name: "Orders", path: "orders", icon: "order.png", visible: true },
  ];

  const footerItems = [{ name: "Settings", path: "settings", icon: "settings.png" }];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[#1366D9] font-semibold border border-blue-100 shadow-md shadow-blue-300 rounded-md px-2 "
      : "text-[#7A7A7A] hover:text-blue-500 hover:px-2 hover:border-2 hover:border-blue-100 hover:shadow-md hover:shadow-blue-300 active:px-2 active:shadow-inner active:shadow-blue-300 rounded-md";

  const renderSidebar = (items) =>
    items
      .filter((item) => item.visible !== false)
      .map((item) => (
        <NavLink to={item.path} key={item.name} className={navLinkStyle}>
          <li className={"flex items-center gap-[12px] h-[55px]"}>
            <img src={`src/images/${item.icon}`} alt={item.name} className={` ${sidebarOpen ? 'h-[26px]' : 'h-[30px]'}`} />
            <h1
              className={`font-semibold text-[17px] leading-7 h-[30px] ${
                sidebarOpen ? "block" : "hidden"
              }`}
            >
              {item.name}
            </h1>
          </li>
        </NavLink>
      ));

  return (
    <aside
      className={`${sidebarOpen ? "col-span-2" : "col-span-0 items-center w-20"} flex flex-col justify-between px-2 py-[10px] h-[calc(100vh-73px)]`}>
      <ul className="flex flex-col gap-[12px] px-3">
        {/* Hamburger Button */}
        <li className="h-fit w-fit mb-[-6px]">
          <button onClick={toggleSidebar} className={`px-[3px] py-[5px] text-white w-full flex items-center justify-start rounded hover:bg-gray-200 active:bg-gray-400 focus:outline-none ${sidebarOpen ? 'bg-white' : 'bg-gray-300'}`}>
            <div className="space-y-[4px]">
              <div className="w-[30px] h-[4px] bg-gray-400 rounded"></div>
              <div className="w-[30px] h-[4px] bg-gray-400 rounded"></div>
              <div className="w-[30px] h-[4px] bg-gray-400 rounded"></div>
            </div>
          </button>
        </li>
        {renderSidebar(menuItems)}
      </ul>

      <ul className="flex flex-col gap-[12px] px-4">{renderSidebar(footerItems)}
        <li
          onClick={handleLogout}
          className="flex items-center gap-[12px] h-[55px] cursor-pointer text-[#7A7A7A] hover:px-2 hover:border hover:border-red-200 hover:shadow-md hover:shadow-red-300 active:shadow-inner active:shadow-red-300 rounded-md"
        >
          <img src="src/images/logout.png" alt="Log Out" className={` ${sidebarOpen ? 'h-[26px]' : 'h-[30px]'}`} />
          <h1
            className={`font-semibold text-[17px] leading-7 h-[30px] ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            Log Out
          </h1>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
