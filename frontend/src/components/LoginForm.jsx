import { Link } from "react-router-dom";
import WebTitle from "./WebTitle";
import ShieldLogo from "./ShieldLogo";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userName: "tcpt1910",
      userPassword: "19102005",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#E5ECF6] border border-[#FFFCFC]/50 shadow-2xl h-90 w-80 
                  rounded-lg flex flex-col justify-start items-center gap-2
                  py-2 px-4 "
    >
      <FormHeader />
      <main className="w-full mt-5">
        <section className="flex flex-col self-center gap-1">
          <label
            htmlFor="username"
            className="text-left text-sm font-semibold bg-linear-to-r from-[#f80344] to-[#3952F5] bg-clip-text text-transparent"
          >
            Username
          </label>
          <input
            {...register("userName", { required: true })}
            id="username"
            spellCheck="false"
            placeholder="Enter your username"
            className="w-full h-10 px-2 focus:outline-none rounded-lg bg-white transition-all duration-900 
                       focus:shadow-lg focus:shadow-blue-300 caret-black placeholder:text-gray-500 text-black"
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
            {...register("userPassword", { required: true })}
            type="password"
            id="password"
            spellCheck="false"
            placeholder="Enter you password"
            className="w-full h-10 px-2 focus:outline-none rounded-lg bg-white transition-all duration-900 
                       focus:shadow-lg focus:shadow-blue-300 caret-black placeholder:text-gray-500 text-black"
          />
        </section>
        <section className=" mt-1">
          <p className="text-left w-fit text-xs text-black cursor-pointer hover:text-blue-400 underline">
            Forgot password?
          </p>
        </section>
      </main>
      <section className="relative w-full">
        <Link
          to="/home"
          type="submit"
          className="bg-red-500 text-xl py-2 px-5 rounded-xl hover:shadow-md transition-all duration-300
                       active:outline-none text-white absolute right-0 hover:shadow-red-400"
        >
          Login
        </Link>        
      </section>
    </form>
  );
};

export default LoginForm;
