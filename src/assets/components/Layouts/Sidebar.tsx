import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const navLinkStyle = ({ isActive }) => 
    isActive ? "text-blue-500 font-bold" : "text-[#7A7A7A] filter bluescale brightness-90";

  return (
    <>
      <main className="flex flex-col gap-[12px] px-4">
        <NavLink to="dashboard" className={navLinkStyle}>
          <div className=" h-[55px]">
            <img src="src\images\home.png" alt="dashboard" />
            <h1 className=" h-[30px]">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink to="inventory" className={navLinkStyle}>
          <div className="h-[55px]">
            <img src="src\images\cart.png" alt="inventory" />
            <h1 className=" h-[30px]">Inventory</h1>
          </div>
        </NavLink>
        <NavLink to="reports" className={navLinkStyle}>
          <div className="h-[55px]">
            <img src="src\images\board.png" alt="reports" />
            <h1 className=" h-[30px]">Reports</h1>
          </div>
        </NavLink>
        <NavLink to="" className={navLinkStyle}>
          <div className="h-[55px]">
            <img src="src\images\suppliers.png" alt="suppliers" />
            <h1 className=" h-[30px]">Suppliers</h1>
          </div>
        </NavLink>

        <NavLink to="" className={navLinkStyle}>
          <div className="h-[55px]">
            <img src="src\images\order.png" alt="orders" />
            <h1 className=" h-[30px]">Orders</h1>
          </div>
        </NavLink>
        <NavLink to="" className={navLinkStyle}>
          <div className="h-[55px]">
            <img src="src\images\checklist.png" alt="manage store" />
            <h1 className=" h-[30px]">Manage Stores</h1>
          </div>
        </NavLink>
      </main>
      <footer>
        <NavLink to="" className={navLinkStyle}>
          <div className="h-[55px]">
            <img src="src\images\settings.png" alt="suppliers" />
            <h1 className=" h-[30px]">Settings</h1>
          </div>
        </NavLink>
        <NavLink to="/" className={navLinkStyle}>
          <div className="h-[55px] bg-red-200">
            <img src="src\images\logout.png" alt="suppliers" />
            <h1 className=" h-[30px]">Log Out</h1>
          </div>
        </NavLink>
      </footer>
    </>
  );
}
 
export default Sidebar;