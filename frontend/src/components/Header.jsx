import { useEffect, useState } from "react";
import ShieldLogo from "./ShieldLogo";
import WebTitle from "./WebTitle";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { http } from "../libs/http";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        const loadData = async () => {
          try {
            console.log("User found:", u.email); 
            
            const res = await http.get(`/users`);
            
            if (isMounted) {
              setUser(res.data.find((user) => user.email === u.email));
              console.log("Data loaded:", res);
              setTimeout(() => { 
                setLoading(false); 
              }, 3000);
            }
          } catch (error) {
            console.error("Load user fail: ", error);
            if (isMounted) {
              setError(error);
              setLoading(false);
            }
          }
        };

        loadData();
      } else {
        console.log("No user logged in");
        if (isMounted) setUser(null);
      }
    });

    return () => {
      isMounted = false;
      unsub(); 
    };

}, []); 
  const logoOnClick = () => {
    navigate("/home");
  };

  return (
    <header className="w-full h-14 z-50 fixed top-0 left-0 right-0 bg-[#151136] py-2 px-4 flex flex-row justify-between items-center">
      <section
        onClick={() => logoOnClick()}
        className="flex flex-row gap-2 h-full items-center w-fit cursor-pointer z-10"
      >
        <ShieldLogo className="size-4 md:size-7 mb-1 md:mb-0" />
        <WebTitle className="text-base md:text-2xl" />
      </section>
      <section className="absolute mx-auto w-full">
        {!error && user && loading === false && (
          <p className="font-bold font-header text-sm md:text-lg">
            Welcome back, <strong className="text-sky-400">{user.name}</strong>
          </p>
        )}
      </section>
      <section className="z-10">
        {error && <></>}
        {!error && user && loading === false && <UserAvatar user={user} />}
      </section>
    </header>
  );
};

export default Header;
