import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/layout">
      <section className="flex flex-row items-center gap-4 h-[38px]">
        <img src="src\images\lines.png" alt="Image Description" className="h-[30px]"/>
        <img src="src\images\inventory-logo.png" alt="Image Description" className="h-[30px]"/>
      </section>
      </Link>

      <section className="flex flex-row items-center gap-4 h-[38px] ">
        <img src="src\images\bell.svg" alt="bell" className="h-[24px]"/>
        <img src="src\images\user.svg" alt="user" className="h-[24px]"/>
      </section>
    </>
  );
}
 
export default Navbar;