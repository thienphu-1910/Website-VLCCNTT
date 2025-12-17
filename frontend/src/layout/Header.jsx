import { useEffect, useState } from "react";
import ShieldLogo from "../components/ShieldLogo";
import WebTitle from "../components/WebTitle";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserAvatar from "../components/UserAvatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);  
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        if (isMounted)
          setUser({
            uid: u.uid,
            email: u.email,
            avatar_url: "public/images/user1_avatar.jpeg",
          });        
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
    <header className="w-screen h-14 z-50 bg-[#151136] py-2 px-4 flex flex-row justify-between items-center">
      <section
        onClick={() => logoOnClick()}
        className="flex flex-row gap-2 h-full items-center cursor-pointer z-10"
      >
        <ShieldLogo className="size-4 md:size-7 mb-1 md:mb-0" />
        <WebTitle className="text-base md:text-2xl" />
      </section>
      <section className="absolute left-1/2 transform -translate-x-1/2 z-0">
        {user && (
          <p className="font-bold font-header text-sm md:text-lg">
            Welcome back, <strong className="text-sky-400">{user.email}</strong>
          </p>
        )}
      </section>
      <section className="z-10">        
        {user && <UserAvatar user={user} />}
      </section>
    </header>
  );
};

export default Header;
