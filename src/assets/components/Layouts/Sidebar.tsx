import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "dashboard", icon: "home.png" },
  { name: "Inventory", path: "inventory", icon: "cart.png" },
  { name: "Reports", path: "reports", icon: "board.png" },
  { name: "Suppliers", path: "/", icon: "suppliers.png" },
  { name: "Orders", path: "orders", icon: "order.png" },
  // { name: "Manage Stores", path: "managestores", icon: "checklist.png" },
  // { name: "Product List", path: "product", icon: "checklist.png" },
];

const footerItems = [
  { name: "Settings", path: "/settings", icon: "settings.png" },
  { name: "Log Out", path: "/", icon: "logout.png" },
];

const Sidebar = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[#1366D9] font-semibold"
      : "text-[#7A7A7A] hover:text-blue-500";

  const renderSidebar = (items) =>
    items.map((item) => (
      <NavLink to={item.path} key={item.name} className={navLinkStyle}>
        <li className="flex items-center gap-[12px] h-[55px]">
          <img
            src={`src/images/${item.icon}`}
            alt={item.name}
            className="h-[26px]"
          />
          <h1 className="font-semibold text-[17px] leading-7 h-[30px]">
            {item.name}
          </h1>
        </li>
      </NavLink>
    ));

  return (
    <aside className="col-span-2 flex flex-col justify-between px-2 py-[16px] h-[calc(100vh-73px)]">
      <ul className="flex flex-col gap-[12px] px-3">{renderSidebar(menuItems)}</ul>
      <ul className="flex flex-col gap-[12px] px-4">{renderSidebar(footerItems)}</ul>
    </aside>
  );
};

export default Sidebar;
