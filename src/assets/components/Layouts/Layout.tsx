import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Dashboard from "../Pages/Dashboard";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="relative box-border p-2 bg-gray-400">
        <div className="grid grid-cols-11 relative h-full bg-white">
          <Navbar/>
          <Sidebar/>     

          <main className="col-start-3 col-end-12 mx-4 mt-4 bg-green-100">
          {/* <Dashboard/> */}
            <Outlet/>
          </main>     
        </div>
      </div>
    </>
  );
}
 
export default Layout;