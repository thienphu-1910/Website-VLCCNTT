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
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const unsub = onAuthStateChanged(auth, (u) => {
      const loadData = async () => {
        try {
          const res = await http.get(`/users`);
          console.log(u.email);
          if (isMounted) {
            setUser(res.data[0]);
            console.log(res);
          }
        } catch (error) {
          console.log("Load user fail: ", error);
          if (isMounted) {
            setError(error);
          }
        }
      };

      loadData();
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
    <header className="w-full h-14 fixed top-0 left-0 right-0 bg-[#151136] py-2 px-4 flex flex-row justify-between items-center">
      <section
        onClick={() => logoOnClick()}
        className="flex flex-row gap-2 h-full items-center w-fit cursor-pointer z-10"
      >
        <ShieldLogo className="size-7" />
        <WebTitle className="text-2xl" />
      </section>
      <section className="absolute mx-auto w-full">
        {!error && user && (
          <p className="font-bold font-header">
            Welcome back, <strong className="text-sky-400">{user.name}</strong>
          </p>
        )}
      </section>
      <section className="z-10">
        {error && <></>}
        {!error && user && <UserAvatar user={user} />}
      </section>
    </header>
  );
};

export default Header;
