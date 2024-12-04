import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signupSchema } from "../extraComponents/Schemas";
import ConfirmDialog from "../extraComponents/ConfirmDialog";
import { useState } from "react";
import { toast } from "react-toastify";

function Signup() {
  // http://localhost:3000/signup
  const postData = useMutation({
    mutationKey:["save"],
    mutationFn(data){
      return axios.post('http://localhost:3000/signup', data)
    },
    onSuccess: () => {
      toast.success("Signup Successful!", {
        autoClose: 2000,
      }); // Success toast
    },
    onError: () => {
      toast.error("Signup Failed: user is already exist", {
        autoClose: 2000,
      }); // Error toast
    }
  });
  const {register, handleSubmit, reset, formState:{errors}} = useForm({resolver: zodResolver(signupSchema)});

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(null);  // To store the form data temporarily

  const submit = (data:any) => {
    setFormData(data); // Store the data to be submitted
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleConfirm = () => {
    if (formData) {
      postData.mutate(formData);  // Perform the form submission
      reset();  // Reset the form after submission
      setOpenDialog(false);  // Close the dialog
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);  // Close the dialog without submitting
  };
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
            <label htmlFor="name" className="h-[21px] font-semibold text-[16px] text-[#525252]">Full Name</label>
            <input type="text" id="name" placeholder="enter your name" {...register('name')} className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            {errors.name && <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-2px]">{errors.name.message}</span>}
          </section>

          <section className="flex flex-col h-[70px] font-poppins">
            <label htmlFor="email" className="h-[21px] font-semibold text-[16px] text-[#525252]">Email</label>
            <input type="text" id="email" placeholder="example@ims.np" {...register('email')} className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            {errors.email && <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-3px]">{errors.email.message}</span>}
          </section>

          <section className="flex flex-col h-[70px] font-poppins">
            <label htmlFor="password" className="h-[21px] font-semibold text-[16px] text-[#525252]">Password</label>
            <input type="password" id="password" placeholder="password" {...register('password')} className="h-[40px] py-[6px] px-[10px] rounded text-[14px] leading-5 font-normal mt-[6px] border border-[#CCCCCC] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            {errors.password && <span className="h-[15px] text-[12px] font-normal text-red-600 px-[10px] mt-[-2px]">{errors.password.message}</span>}
          </section>
          <footer className="flex items-center h-[35px] mt-4">
            <button type="submit" className="h-[35px] w-full bg-white rounded border border-[#2159AB] font-poppins text-[16px] text-[#2159AB] leading-8 font-medium hover:bg-gray-100 active:bg-gray-200">Sign up</button>
          </footer>
        </form>
      </div>
      <footer className="flex items-center justify-center h-[20px] text-[14px] gap-[3px] mt-8">
        <p className="text-[#292929] font-poppins">Already have an account?</p>
        <Link to="/">
          <span className="text-[#1366D9] font-poppins hover:underline hover:underline-offset-4">Login in</span>
        </Link>

         {/* Confirm Dialog Component */}
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        title="Confirm Your Signup"
        description="Are you sure you want to submit your signup details?"
        confirmationText="Yes, Submit"
        cancellationText="Cancel"
      />
      </footer>
    </main>
    </>
  )
}
export default Signup;