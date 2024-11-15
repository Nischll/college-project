import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="relative box-border h-screen p-1 bg-gray-400">
        <header className="h-[65px] p-2 bg-gray-200 flex flex-row justify-between items-center">
          <Navbar/>
        </header>
        <div className="grid grid-cols-11 relative h-[calc(100%-65px)] bg-white">
          <aside className="col-span-2 sticky flex flex-col justify-between px-2 py-[16px] h-[calc(100vh-73px)] bg-blue-100">
            <Sidebar/>  
          </aside>   
          
          <main className="col-span-9 overflow-hidden pb-3 h-full">
            <div className="ml-2 mt-2 mr-1 h-full pr-4 bg-green-400 overflow-hidden hover:overflow-y-auto">
              <Outlet />
            </div>
          </main> 
        </div>
      </div>
    </>
  );
}
 
export default Layout;