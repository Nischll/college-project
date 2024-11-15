import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const navLinkStyle = ({ isActive }) => 
    isActive ? "text-[#1366D9] font-semibold" : "text-[#7A7A7A]";

  return (
    <>
    <aside className="col-span-2 flex flex-col justify-between px-2 py-[16px] h-[calc(100vh-73px)]">
      <main className="flex flex-col gap-[12px] px-3">
        <NavLink to="dashboard" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\home.png" alt="dashboard" className="h-[26px]"/>
            <h1 className="h-[30px] font-semibold text-[17px] leading-7">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink to="inventory" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\cart.png" alt="inventory" className="h-[26px]"/>
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Inventory</h1>
          </div>
        </NavLink>
        <NavLink to="reports" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\board.png" alt="reports" className="h-[26px]"/>
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Reports</h1>
          </div>
        </NavLink>
        <NavLink to="/" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\suppliers.png" alt="suppliers" className="h-[26px]"/>
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Suppliers</h1>
          </div>
        </NavLink>

        <NavLink to="orders" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\order.png" alt="orders" className="h-[26px]"/>
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Orders</h1>
          </div>
        </NavLink>
        <NavLink to="managestores" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\checklist.png" alt="manage store" className="h-[26px]"/>
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Manage Stores</h1>
          </div>
        </NavLink>
      </main>
      <footer className="flex flex-col gap-[12px] px-4">
        <NavLink to="/settings" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\settings.png" alt="suppliers" className="h-[26px]"/>
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Settings</h1>
          </div>
        </NavLink>
        <NavLink to="/" className={navLinkStyle}>
          <div className="flex items-center gap-[12px] h-[55px]">
            <img src="src\images\logout.png" alt="suppliers" className="h-[26px]"/>
            <h1 className="font-semibold text-[17px] leading-7 h-[30px]">Log Out</h1>
          </div>
        </NavLink>
      </footer>
    </aside>
    </>
  );
}
 
export default Sidebar;