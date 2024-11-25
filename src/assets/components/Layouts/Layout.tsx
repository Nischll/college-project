import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
// import { useEffect } from "react";

const Layout = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     navigate("/");
  //   }
  // }, [user, isLoading, navigate]);

  // if (isLoading) {
  //   return <div>Loading...</div>; 
  // }

  // if (!user) {
  //   return null;
  // }

  return (
    <div className="relative box-border h-screen p-1">
      <Navbar />
      <div className="grid grid-cols-11 relative h-[calc(100%-65px)]">
        <Sidebar {...user.role} />
        <main className="col-span-9 overflow-hidden pb-3 h-full bg-gray-200">
          <div className="ml-2 mt-2 mr-1 h-full pr-4 overflow-hidden hover:overflow-y-auto bg-white">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;