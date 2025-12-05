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
    authenticated && !loading && (
      <ul className="w-fit mx-auto bg-white py-1 text-black mt-20 rounded-full flex flex-row gap-3 px-2">      
        <li className=" px-5">
          <NavLink to="/home" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }>Home</NavLink>          
        </li>
        <li className=" px-5">
          <NavLink to="/history" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }>History</NavLink>
        </li>
      </ul>
    )
  );
}

export default HeaderBar;