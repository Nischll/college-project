import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user} = useAuth();

  const handleClick = () => {
    if(user.role === "admin"){
      navigate("/layout/dashboard");
    }else{
      navigate("/layout/inventory");
    }
  }
  return (
    <>
    <header className="h-[65px] p-2 flex flex-row justify-between items-center">
      <section onClick={handleClick} className="flex flex-row items-center gap-4 h-[38px] pl-3 cursor-pointer">
        <img src="src\images\lines.png" alt="Image Description" className="h-[30px]"/>
        <img src="src\images\inventory-logo.png" alt="Image Description" className="h-[30px]"/>
      </section>

      <section className="flex flex-row items-center gap-4 h-[38px] ">
        <img src="src\images\bell.svg" alt="bell" className="h-[24px] cursor-pointer"/>
        <img src="src\images\user.svg" alt="user" className="h-[24px] cursor-pointer"/>
      </section>
    </header>
    </>
  );
}
 
export default Navbar;