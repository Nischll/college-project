import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Signup() {
  // http://localhost:3000/signup
  const postData = useMutation({
    mutationKey:["save"],
    mutationFn(data){
      return axios.post('http://localhost:3000/signup', data)
    }
  });
  const {register, handleSubmit, reset} = useForm();
  const submit = (data:any) => {
    postData.mutate(data);
    reset();
    // console.log(data);
  }
  return (
    <>
    <main className="flex flex-col gap-[35px]">
      <div className="flex flex-col gap-[25px]">
        <header className="flex flex-col items-center h-[120px] gap-[10px]">
          <img src="src\images\lines.png" alt="" className="flex justify-center items-center h-[50px] w-[70px]"/>
          <h1 className=" h-[45px] w-full flex justify-center items-center text-[32px] font-poppins font-semibold">Signup to your account</h1>
        </header>
        <form onSubmit={handleSubmit(submit)} className="h-[230px] flex flex-col gap-[6px]">
          <section className="flex flex-col h-[70px] font-poppins">
            <label htmlFor="name" className="h-[21px] font-semibold text-[16px] text-[#525252]">Name</label>
            <input type="text" id="name" placeholder="enter your name" {...register('name')} className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]"></span>
          </section>

          <section className="flex flex-col h-[70px] font-poppins">
            <label htmlFor="email" className="h-[21px] font-semibold text-[16px] text-[#525252]">Email</label>
            <input type="text" id="email" placeholder="enter your email" {...register('email')} className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]"></span>
          </section>

          <section className="flex flex-col h-[70px] font-poppins">
            <label htmlFor="password" className="h-[21px] font-semibold text-[16px] text-[#525252]">Password</label>
            <input type="password" id="password" placeholder="password" {...register('password')} className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]"></span>
          </section>
          <footer className="flex items-center h-[35px] mt-4">
            <button type="submit" className="h-[35px] w-full bg-white rounded border border-[#2159AB] font-poppins text-[16px] text-[#2159AB] leading-8 font-medium">Sign up</button>
          </footer>
        </form>
      </div>
      <footer className="flex items-center justify-center h-[20px] text-[14px] gap-[3px] mt-8">
        <p className="text-[#292929] font-poppins">Already have an account?</p>
        <Link to="/">
          <span className="text-[#1366D9] font-poppins">Login in</span>
        </Link>
        {/* <a href="/" className="text-[#1366D9] font-poppins">Login in</a> */}
      </footer>
    </main>
    </>
  )
}
export default Signup;