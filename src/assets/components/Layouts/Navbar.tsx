import { useNavigate } from "react-router-dom";
import { useAuth } from "../useContext/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user} = useAuth();

  const handleClick = () => {
    if(user.role === "admin"){
      navigate("/layout/inventory");
    }else if (user.role === "user"){
      navigate("/layout/sales");
    }else{
      navigate("/layout/dashboard");
    }
  }
  return (
    <>
    <header className="h-[65px] p-2 mr-4 flex flex-row justify-between items-center">
      <section onClick={handleClick} className="flex flex-row items-center gap-4 h-[38px] pl-3 cursor-pointer">
        <img src="src\images\lines.png" alt="Image Description" className="h-[30px]"/>
        <img src="src\images\inventory-logo.png" alt="Image Description" className="h-[30px]"/>
      </section>

      <section className="flex flex-row items-center gap-4 h-[38px] ">
        {/* <img src="src\images\bell.svg" alt="bell" className="h-[24px] cursor-pointer"/> */}
       <div className="flex justify-center items-center gap-1">
       <span className="rounded-full border border-gray-400 px-[4px] py-[3px] bg-[#2fb0eca8]">
          {user.username
            .split('.')
            .filter(
              (_: string, index: number, arr: string[]) =>
                index === 0 || index === arr.length - 1
            )
            .map((word: string) => word[0])
            .join('')
            .toUpperCase()}
        </span>
        <span className="hidden md:block text-sm">
          {user.role.toUpperCase()}
        </span>
       </div>
      </section>
    </header>
    </>
  );
}
 
export default Navbar;