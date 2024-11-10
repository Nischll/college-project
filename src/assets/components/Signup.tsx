import { Link } from "react-router-dom";

function Signup() {


  return(
    <>
    <div className="relative grid grid-cols-9 bg-gray-100 h-screen py-28">
      <main className="relative col-start-3 col-end-8 rounded">
        <div className="grid grid-cols-9 grid-rows-3">
          <section className="col-span-3 row-start-2 px-2">
            <div className="grid grid-cols-4 grid-rows-2 gap-y-4">
              <img src="src\images\lines.png" alt="" className="col-start-2 col-end-4 h-[45px]"/>
              <img src="src\images\inventory-logo.png" alt="inventory logo" className="row-start-2 col-span-5 h-[50px]"/>
            </div>
          </section>

          <section className="col-start-5 col-end-10 row-span-3 p-2">
            <main className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[32px]">
                <header className="flex flex-col items-center h-[120px] gap-[10px]">
                  <img src="src\images\lines.png" alt="" className="flex justify-center items-center h-[50px] w-[70px]"/>
                  <h1 className=" h-[45px] w-full flex justify-center items-center text-[32px] font-poppins font-semibold">Login to your account</h1>
                </header>
                <form className="h-[230px] flex flex-col gap-[6px]">
                <section className="flex flex-col h-[70px] font-poppins">
                    <label htmlFor="name" className="h-[21px] font-semibold text-[14px] text-[#525252]">Name</label>
                    <input type="text" id="email" placeholder="enter your name" className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC]"/>
                    <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]"></span>
                  </section>

                  <section className="flex flex-col h-[70px] font-poppins">
                    <label htmlFor="email" className="h-[21px] font-semibold text-[14px] text-[#525252]">Email</label>
                    <input type="text" id="email" placeholder="enter your email" className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC]"/>
                    <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]"></span>
                  </section>

                  <section className="flex flex-col h-[70px] font-poppins">
                    <label htmlFor="password" className="h-[21px] font-semibold text-[14px] text-[#525252]">Password</label>
                    <input type="password" id="password" placeholder="password" className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC]"/>
                    <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]"></span>
                  </section>
                </form>
                <footer className="flex flex-col items-center h-[35px] gap-[8px]">
                  <button className="h-[35px] w-full bg-white rounded border border-[#2159AB] font-poppins text-[16px] text-[#2159AB] leading-8 font-medium">Sign up</button>
                </footer>
              </div>
              <footer className="flex items-center justify-center h-[20px] text-[14px] gap-[3px]">
                <p className="text-[#292929] font-poppins">Already have an account?</p>
                <Link to="/">
                  <span className="text-[#1366D9] font-poppins">Login in</span>
                </Link>
              </footer>
            </main>
          </section>
        </div>
      </main>
    </div>
    </>
  )
}
export default Signup;