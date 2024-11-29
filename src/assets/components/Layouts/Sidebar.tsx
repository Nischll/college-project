import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Sidebar = ({}) => {
  const {user, setUser} = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: "home.png", visible: user?.role === "admin" },
    { name: "Inventory", path: "inventory", icon: "cart.png", visible: true },
    { name: "Reports", path: "reports", icon: "board.png", visible: user.role === "admin" },
    { name: "Suppliers", path: "/", icon: "suppliers.png", visible: true },
    { name: "Orders", path: "orders", icon: "order.png", visible: true },
    // { name: "Manage Stores", path: "managestores", icon: "checklist.png" },
    // { name: "Product List", path: "product", icon: "checklist.png" },
  ];
  
  const footerItems = [
    { name: "Settings", path: "settings", icon: "settings.png" },
    // { name: "Log Out", path: "/", icon: "logout.png" },
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[#1366D9] font-semibold"
      : "text-[#7A7A7A] hover:text-blue-500";

  const renderSidebar = (items) =>
    items.filter(item => item.visible !== false) 
      .map(item => (
        <NavLink to={item.path} key={item.name} className={navLinkStyle}>
          <li className="flex items-center gap-[12px]  h-[55px] hover:border-2 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-300 rounded-md">
            <img src={`src/images/${item.icon}`} alt={item.name} className="h-[26px]" />
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">{item.name}</h1>
          </li>
        </NavLink>
      ));
  return (
    <aside className="col-span-2 flex flex-col justify-between px-2 py-[16px] h-[calc(100vh-73px)]">
      <ul className="flex flex-col gap-[12px] px-3">{renderSidebar(menuItems)}</ul>
      <ul className="flex flex-col gap-[12px] px-4">
        {renderSidebar(footerItems)}

        <li onClick={handleLogout} className="flex items-center gap-[12px] h-[55px] cursor-pointer text-[#7A7A7A] hover:border hover:shadow-inner hover:shadow-slate-300 hover:text-red-400">
          <img src="src/images/logout.png" alt="Log Out" className="h-[26px]" />
          <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Log Out</h1>
        </li>
        </ul>
    </aside>
  );
};

export default Sidebar;
