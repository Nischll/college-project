import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../useContext/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { baseSchema } from '../GenericComponents/Schemas';
import { toast } from 'react-toastify';

function Login (){
  const { handleSubmit, reset, register, formState: {errors} } = useForm({resolver: zodResolver(baseSchema)});
  const navigate = useNavigate();
  const {setUser} = useAuth();

  // useEffect(() => {
  //   // Redirect to dashboard if the user is already logged in
  //   if (user?.token) {
  //     navigate("/layout/dashboard");
  //   }
  // }, [user, navigate]);

  const postData = useMutation({
    mutationKey: ["save"],
    mutationFn: (data: any) => {
      return axios.post("http://localhost:3000/login", data);
    },
    onSuccess: (response) => {
      const { token, user } = response.data;
      setUser({ ...user, token });
      reset();
      toast.success("Login Successful!", {
        autoClose: 2000,
      });
      if(user.role === "admin"){
        navigate("/layout/dashboard");
      }else{
        navigate("/layout/inventory");
      }
    },
    onError: (error) => {
      console.error("Submission failed:", error);
      toast.error("Login Failed", {
        autoClose: 2000,
      });
    },
  });
  const submit = (data:any) => {
    postData.mutate(data);
    // console.log(data);
  }
  
  return(
    <>
    <main className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[42px]">
        <header className="flex flex-col items-center h-[120px] gap-[10px]">
          <img src="src\images\lines.png" alt="" className="flex justify-center items-center h-[50px] w-[70px]"/>
          <h1 className=" h-[45px] w-full flex justify-center items-center text-[32px] font-poppins font-semibold">Login to your account</h1>
        </header>
        <form onSubmit={handleSubmit(submit)} className="h-[250px] flex flex-col gap-[6px]">
          <section className="flex flex-col h-[70px] font-poppins">
            <label htmlFor="username" className="h-[21px] font-semibold text-[18px] text-[#525252]">Username</label>
            <input type="text" id="username" placeholder="enter your username" {...register('username')} className="h-[45px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            {errors.username && <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-2px]">{errors.username.message}</span>}
          </section>

          <section className="flex flex-col h-[70px] font-poppins">
            <label htmlFor="password" className="h-[21px] font-semibold text-[18px] text-[#525252]">Password</label>
            <input type="password" id="password" placeholder="password" {...register('password')} className="h-[45px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            {errors.password && <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]"> {errors.password.message}</span>}
          </section>
          <footer className="flex flex-col items-center h-[78px] gap-[8px] my-[30px]">
            <button type="submit" className="h-[35px] w-full bg-customBlue rounded border border-customBlue font-poppins text-white text-[16px] leading-8 font-medium hover:bg-blue-700 active:bg-blue-800">Login</button>
          <Link to="/signup" className='w-full'>
            <button className="h-[35px] w-full bg-white rounded border border-[#2159AB] font-poppins text-[16px] text-[#2159AB] leading-8 font-medium hover:bg-gray-100 active:bg-gray-200">Sign up</button>
          </Link>
        </footer>
        </form>
      </div>
      <footer className="flex items-center justify-center h-[20px] text-[14px] gap-[3px]">
        <p className="text-[#292929] font-poppins">Already have an account?</p>
        <Link to="/signup">
          <span className="text-[#1366D9] font-poppins hover:underline hover:underline-offset-4">Sign up</span>
        </Link>
      </footer>
    </main>
    </>
  )
}
export default Login;