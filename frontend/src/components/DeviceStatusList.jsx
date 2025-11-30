import { twMerge } from "tailwind-merge";
import DeviceStatusCard from "./DeviceStatusCard";
import { auth } from "../config/firebase";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";


//grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
const DeviceStatusList = ({ className = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const params = new URLSearchParams(searchParams);
      if (user) {
        if (params.get("email") !== user.email) {
          params.set("email", user.email);
          setSearchParams(params);
        }
      } 
      else {
        if (params.has("email")) {
          params.delete("email");
          setSearchParams(params);
        }
      }
    });

    return () => unsub();
    // note: searchParams here is stable from the hook, setSearchParams is stable
  }, [searchParams, setSearchParams]);

  return (
    <div
      className={twMerge(
        "w-full grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 justify-center justify-items-center",
        className
      )}
    >
      {Array.from({ length: 6 }, (v, i) => (
        <DeviceStatusCard key={i}/>
      ))}

    </div>
  );
};

export default DeviceStatusList;
