import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="relative box-border h-screen p-1">
        <Navbar/>
        <div className="grid grid-cols-11 relative h-[calc(100%-65px)]">
            <Sidebar/>            
          <main className="col-span-9 overflow-hidden pb-3 h-full">
            <div className="ml-2 mt-2 mr-1 h-full pr-4 overflow-hidden hover:overflow-y-auto">
              <Outlet />
            </div>
          </main> 
        </div>
      </div>
    </>
  );
}
 
export default Layout;