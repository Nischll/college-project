import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const navLinkStyle = ({ isActive }) => 
    isActive ? "text-blue-500 font-bold" : "text-[#7A7A7A]";

  return (
    <>
    <aside className="col-span-2 flex flex-col justify-between px-2 py-[16px] h-[300px] xl:h-[947px] bg-blue-100">
      <main>
        <NavLink to="/layout/dashboard" className={navLinkStyle}>
          <div className="bg-yellow-300 h-[55px]">
            <h1 className=" h-[30px]">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink to="/layout/inventory" className={navLinkStyle}>
          <div className="h-[55px]">
            <h1 className=" h-[30px]">Inventory</h1>
          </div>
        </NavLink>
        <div>
          <h1>Reports</h1>
        </div>
      </main>
      <footer>
        <NavLink to="" className={navLinkStyle}>
          <div className="h-[55px]">
            <h1 className=" h-[30px]">Settings</h1>
          </div>
        </NavLink>
        <NavLink to="" className={navLinkStyle}>
          <div className="h-[55px]">
            <h1 className=" h-[30px]">Log Out</h1>
          </div>
        </NavLink>
      </footer>
    </aside>
    </>
  );
}
 
export default Sidebar;