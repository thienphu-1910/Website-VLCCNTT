import WebTitle from "./WebTitle";
import ShieldLogo from "./ShieldLogo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Signed in successfully!", { position: "top-right", autoClose: 1500 });
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      toast.error("Failed to sign in.", { position: "top-right", autoClose: 1500 });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-[#E5ECF6] border border-[#FFFCFC]/50 shadow-2xl h-90 w-80 
                  rounded-3xl flex flex-col justify-start items-center gap-2
                  py-2 px-4 "
      >
        <FormHeader />
        <main className="w-full mt-5">
          <section className="flex flex-col self-center gap-1">
            <label
              htmlFor="email"
              className="text-left text-sm font-semibold bg-linear-to-r from-[#f80344] to-[#3952F5] bg-clip-text text-transparent"
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </section>
          <section className="flex flex-col self-center gap-1 mt-2">
            <label
              htmlFor="password"
              className="text-left text-sm font-semibold bg-linear-to-r from-[#f80344] to-[#3952F5] bg-clip-text text-transparent"
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </section>
          <section className=" mt-1">
            <p className="text-left w-fit text-xs text-black cursor-pointer hover:text-blue-400 underline">
              Forgot password?
            </p>
          </section>
        </main>
        <section className="relative w-full">
          <button
            type="submit"
            className="bg-red-500 text-xl py-2 px-5 rounded-xl hover:shadow-md transition-all duration-300
                       active:outline-none text-white absolute right-0 hover:shadow-red-400"
          >
            Login
          </button>
        </section>
      </form>
    </>
  );
};

export default LoginForm;
