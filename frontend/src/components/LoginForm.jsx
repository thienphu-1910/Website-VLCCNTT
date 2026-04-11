import WebTitle from "./WebTitle";
import ShieldLogo from "./ShieldLogo";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FormHeader = () => {
  return (
    <header className="flex flex-col gap-4 w-full justify-center items-center">
      <section className="flex flex-row gap-2">
        <ShieldLogo className="size-5 self-center" />
        <WebTitle className="text-xl self-center" />
      </section>
      <h2
        className="uppercase bg-linear-to-b from-[#f80344] to-[#3952F5] 
                     bg-clip-text text-transparent text-5xl"
      >
        SIGN IN
      </h2>
    </header>
  );
};

const LoginForm = () => {
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      userEmail: localStorage.getItem("email"),
      userPassword: ""
    }
  });
  

  const navigate = useNavigate();

  const onSubmit = async () => {        
    try {
      const userEmail = getValues('userEmail');
      const userPassword = getValues('userPassword');

      localStorage.setItem("email", userEmail);
      //localStorage.setItem("password", userPassword);

      await signInWithEmailAndPassword(auth, userEmail, userPassword);      
      toast.success("Signed in successfully", { position: "bottom-right", autoClose: 1500 });
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in.", { position: "bottom-right", autoClose: 1500 });
    }
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#E5ECF6] border border-[#FFFCFC]/50 shadow-2xl h-fit w-80 
                  rounded-3xl flex flex-col justify-start items-center gap-2
                  py-3 px-4"
      >
        <FormHeader />
        <main className="w-full mt-5">
          <section className="flex flex-col self-center gap-1">
            <label
              htmlFor="email"
              className="text-left text-md font-semibold bg-linear-to-r from-[#f80344] to-[#3952F5] bg-clip-text text-transparent"
            >
              Email
            </label>
            <input                            
              id="email"
              type="email"
              spellCheck="false"
              placeholder="Enter your email"
              className="w-full h-10 px-2 focus:outline-none rounded-lg bg-white transition-all duration-900 
                       focus:shadow-lg focus:shadow-blue-300 caret-black placeholder:text-gray-500 text-black"              
              {...register("userEmail", { required: true })}
            />
          </section>
          <section className="flex flex-col self-center gap-1 mt-2">
            <label
              htmlFor="password"
              className="text-left text-md font-semibold bg-linear-to-r from-[#f80344] to-[#3952F5] bg-clip-text text-transparent"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              spellCheck="false"
              placeholder="Enter you password"
              className="w-full h-10 px-2 focus:outline-none rounded-lg bg-white transition-all duration-900 
                       focus:shadow-lg focus:shadow-blue-300 caret-black placeholder:text-gray-500 text-black"
              {...register("userPassword", { required: true })}                                          
            />
          </section>
          
        </main>
        <section className="w-fit self-end mt-4">
          <button
            type="submit"
            className="bg-red-500 text-xl py-2 px-5 rounded-xl hover:shadow-md transition-all duration-300
                       active:outline-none active:scale-98 active:bg-red-300 text-white hover:shadow-red-400 hover:scale-102"
          >
            Login
          </button>
        </section>
      </form>
    </div>
  );
};

export default LoginForm;
