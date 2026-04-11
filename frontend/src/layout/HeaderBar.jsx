import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const HeaderBar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(user ? true : false);
      setLoading(user ? false : true);
    })    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <></>
  }
  
  return (
    (authenticated && !loading) ? (
      <ul className="w-fit mx-auto bg-white py-2 px-2 text-black font-bold rounded-full flex flex-row gap-3">      
        <li className="">
          <NavLink to="/home" className={({ isActive, isPending }) =>
            isPending ? "py-1 px-5" : isActive ? "text-blue-500 bg-gray-100 py-1 px-5 rounded-full" : "py-1 px-5"
          }>Home</NavLink>          
        </li>
        <li className="">
          <NavLink to="/history" className={({ isActive, isPending }) =>
            isPending ? "py-1 px-5" : isActive ? "text-blue-500 bg-gray-100 py-1 px-5 rounded-full" : "py-1 px-5"
          }>History</NavLink>
        </li>
      </ul>
    ) : (<></>)
  );
}

export default HeaderBar;