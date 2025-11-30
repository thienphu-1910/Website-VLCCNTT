import WebTitle from "./WebTitle";
import ShieldLogo from "./ShieldLogo";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../config/firebase";

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: ''
  });

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ show: false, message: '', type: '' });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      showToast('Signed in successfully!', 'success');

      setTimeout(() => {
        navigate('/home');
      }, 1500);

    } catch (error) {
      console.error("Error signing in:", error);
      showToast('Failed to sign in.', 'error');
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="bg-[#E5ECF6] border border-[#FFFCFC]/50 shadow-2xl h-90 w-80 
                  rounded-lg flex flex-col justify-start items-center gap-2
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

    {toast.show && ReactDOM.createPortal(
        <div 
          className={`fixed bottom-5 right-5 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl z-9999 animate-bounce
            ${toast.type === 'success' 
              ? 'bg-green-600 text-white shadow-green-900/20 border border-green-500' 
              : 'bg-red-600 text-white shadow-red-900/20 border border-red-500'
            }`}
          style={{ animation: 'slideIn 0.5s ease-out' }} // Inline style for simple animation
        >
          <span className="text-2xl">
            {toast.type === 'success' ? '✅' : '⚠️'}
          </span>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider">
                {toast.type === 'success' ? 'Success' : 'Error'}
            </h4>
            <p className="text-sm font-medium opacity-90">
                {toast.message}
            </p>
          </div>
        </div>,
        document.body 
      )}
    </>
  );
};

export default LoginForm;
