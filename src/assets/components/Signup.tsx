import { Link } from "react-router-dom";

function Signup() {


  return(
    <>
      <section className="col-start-5 col-end-10 row-span-3">
            <main className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[42px]">
                <header className="flex flex-col items-center h-[120px] gap-[10px]">
                  <img src="src\images\lines.png" alt="" className="flex justify-center items-center h-[50px] w-[70px] mt-[5px] "/>
                  <h1 className=" h-[45px] w-full flex justify-center items-center text-[32px] font-poppins font-semibold">Signup to your account</h1>
                </header>
                <form className="h-[154px] bg-red-400">
                <section className="flex flex-col">
                    <label htmlFor="name" className="font-poppins">Name</label>
                    <input type="text" id="name"/>
                  </section>

                  <section className="flex flex-col">
                    <label htmlFor="email" className="font-poppins">Email</label>
                    <input type="text" id="email"/>
                  </section>

                  <section className="flex flex-col">
                    <label htmlFor="password" className="font-poppins">Password</label>
                    <input type="password" id="password" />
                  </section>
                </form>
                <footer className="flex flex-col items-center h-[78px] gap-[8px]">
                  <button className="h-[35px] w-full bg-white rounded border border-[#2159AB] font-poppins">Sign up</button>
                </footer>
              </div>
              <footer className="flex items-center justify-center h-[20px] text-[14px]">
                <p className="text-[#292929] font-poppins">Already have an account?</p>
                <Link to="/">
                  <span className="text-[#1366D9] font-poppins">Login in</span>
                </Link>
              </footer>
            </main>
          </section>
    </>
  )
}
export default Signup;