
const Navbar = () => {
  return (
    <>
    <nav className="col-span-12 h-[55px] xl:h-[77px] p-2 bg-gray-200">
      <header className="flex flex-row justify-between items-center h-[55px] ">
        <section className="flex flex-row items-center gap-4 h-[38px]">
          <img src="src\images\lines.png" alt="" className="h-[30px]"/>
          <img src="src\images\inventory-logo.png" alt="" className="h-[30px]"/>
        </section>
        <section className="flex flex-row items-center gap-4 h-[38px] ">
          <img src="src\images\bell.svg" alt="bell" className="h-[24px]"/>
          <img src="src\images\user.svg" alt="user" className="h-[24px]"/>
        </section>
      </header>
    </nav>
    </>
  );
}
 
export default Navbar;