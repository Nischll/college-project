import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../useContext/AuthContext";
import { useSidebar } from "../useContext/SidebarContext";

const Layout = () => {
  const { user } = useAuth();
  const { sidebarOpen } = useSidebar();

  return (
    <div className="relative box-border h-screen p-1">
      <Navbar />
      <div className="grid grid-cols-11 relative h-[calc(100%-65px)]">
        <Sidebar {...user.role} />

        {/* Main Content */}
        <main
          className={`overflow-hidden py-3 px-3 h-full bg-gray-200 ${sidebarOpen ? "col-span-9" : "col-span-10 ml-[-35px]"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
