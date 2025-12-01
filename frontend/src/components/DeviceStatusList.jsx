import { twMerge } from "tailwind-merge";
import DeviceStatusCard from "./DeviceStatusCard";
import { auth } from "../config/firebase";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { IoWarningOutline } from "react-icons/io5";
import { CiWavePulse1, CiTempHigh } from "react-icons/ci";
import { RiCelsiusFill } from "react-icons/ri";
import { LuAlarmSmoke } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { GrDocumentSound } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";

//grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
const DeviceStatusList = ({ className = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const params = new URLSearchParams(searchParams);
      if (user) {
        if (params.get("email") !== user.email) {
          params.set("email", user.email);
          setSearchParams(params);
        }
      } else {
        if (params.has("email")) {
          params.delete("email");
          setSearchParams(params);
        }
      }
    });

    return () => unsub();
    // note: searchParams here is stable from the hook, setSearchParams is stable
  }, [searchParams, setSearchParams]);

  const onClick = () => {
    setTriggered(!triggered);
  };

  return (
    <div
      className={twMerge(
        "w-full grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 justify-center justify-items-center",
        className
      )}
    >
      <DeviceStatusCard key={1} className="flex flex-col gap-5">
        <section className="w-full flex flex-row gap-2 items-center">
          <IoWarningOutline
            className="fill-green-400 stroke-green-400 size-9 
                                       bg-green-200/50 rounded-lg p-1"
          />
          <h3 className="text-black font-bold text-lg">System Status</h3>
        </section>
        <div className="bg-green-200/50 font-bold text-green-400 w-fit px-3 py-1 rounded-full flex flex-row gap-2 justify-center items-center">
          <div className="size-2 rounded-full bg-green-500"></div>
          <p>Normal</p>
        </div>
      </DeviceStatusCard>
      <DeviceStatusCard key={2} className="flex flex-col gap-5">
        <section className="w-full flex flex-row gap-2 items-center">
          <CiWavePulse1
            className="fill-blue-400 stroke-blue-400 stroke-1 size-9 
                                       bg-blue-200/50 rounded-lg p-1"
          />
          <h3 className="text-black font-bold text-lg">CO Level</h3>
        </section>
        <div className="px-3 py-1 rounded-full flex flex-col gap-2 justify-center items-start">
          <p className="text-2xl text-blue-500">
            442 <span className="text-base text-gray-500">ppm</span>
          </p>
          <div className="w-full h-2 bg-gray-400/40 rounded-full">
            <div
              style={{
                width: `60%`,
                backgroundSize: `${100 * (100 / `60`)}% 100%`,
              }}
              className="h-2 bg-linear-to-r from-green-400 from-30% via-yellow-300 via-55% to-red-500 to-100% rounded-full"
            ></div>
          </div>
        </div>
      </DeviceStatusCard>
      <DeviceStatusCard key={3} className="grid grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <section className="w-full flex flex-row gap-2 items-center">
            <CiTempHigh
              className="fill-orange-400 stroke-orange-400 size-9 
                                        bg-orange-200/50 rounded-lg p-1"
            />
            <h3 className="text-black font-bold text-lg">Temperature</h3>
          </section>
          <p className="text-2xl text-orange-500 flex flex-row items-start">
            30
            <RiCelsiusFill className="fill-gray-500 size-5" />
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <section className="w-full flex flex-row gap-2 items-center">
            <LuAlarmSmoke
              className="fill-gray-300 stroke-gray-500 size-9 
                                        bg-black/7 rounded-lg p-1"
            />
            <h3 className="text-black font-bold text-lg">System Status</h3>
          </section>
          <div className="bg-green-200/50 font-bold text-green-400 w-fit px-3 py-1 rounded-full flex flex-row gap-2 justify-center items-center">
            <div className="size-2 rounded-full bg-green-500"></div>
            <p>Clear</p>
          </div>
        </div>
      </DeviceStatusCard>
      <DeviceStatusCard
        key={4}
        className={
          "flex flex-col gap-5 group relative" +
          (triggered &&
            " bg-red-200/50 hover:bg-red-200/50 outline-offset-4 outline-3 outline-red-400 scale-102")
        }
      >
        {triggered && (
          <>
            <div className="size-4 absolute bg-red-400 top-1 right-2 rounded-full"></div>
            <div className="size-4 absolute bg-red-400 top-1 right-2 rounded-full animate-ping"></div>
          </>
        )}
        <section className="w-full flex flex-row gap-2 items-center">
          <FaRegBell
            className={twMerge(
              "fill-red-400 stroke-red-400 size-9 bg-red-200/50 rounded-lg p-1 ",
              triggered && "animate-bounce border-2 border-red-400"
            )}
          />
          <h3 className={twMerge("text-black font-bold text-lg")}>
            Emergency Control
          </h3>
        </section>
        <button
          className={twMerge(
            `bg-red-400/50 w-full group-hover:bg-red-400 transition-all duration-300 
                             hover:scale-101 hover:shadow-red-300 active:scale-95 active:outline-2 
                             hover:shadow-lg active:shadow-none
                             flex flex-row gap-2 justify-center items-center rounded-lg`,
            triggered && "bg-red-400"
          )}
          onClick={onClick}
        >
          <FaRegBell
            className="fill-white stroke-white size-4
                                        rounded-lg py-1 h-10"
          />
          <p className="text-white text-lg">
            {triggered ? "Stop" : "Trigger Alarm"}
          </p>
        </button>
      </DeviceStatusCard>
      <DeviceStatusCard key={5} className="flex flex-col gap-5 group">
        <section className="w-full flex flex-row gap-2 items-center">
          <GrDocumentSound
            className="fill-indigo-400 stroke-indigo-400 size-9 
                                       bg-indigo-200/50 rounded-lg p-1"
          />
          <h3 className="text-black font-bold text-lg">Alarm Sound</h3>
        </section>
        <select
          className="w-full h-fit bg-gray-400/20 border-none cursor-pointer
                           hover:scale-102 rounded-full text-center py-2 group-hover:bg-gray-400/50"
        >
          <option className="bg-gray-400/20 font-bold text-xl" value="sound-a">
            Sound A
          </option>
          <option className="bg-gray-400/20 font-bold text-xl" value="sound-b">
            Sound B
          </option>
          <option className="bg-gray-400/20 font-bold text-xl" value="sound-c">
            Sound C
          </option>
        </select>
      </DeviceStatusCard>
      <DeviceStatusCard key={6} className="flex flex-col gap-5 group overflow-auto">
        <section className="w-full flex flex-row gap-2 items-center">
          <HiOutlineLightBulb
            className="fill-none stroke-yellow-400 size-9 
                                       bg-yellow-200/50 rounded-lg p-1"
          />
          <h3 className="text-black font-bold text-lg">Alarm Sound</h3>
        </section>
        <div className=" text-sm text-left px-2 font-bold text-black/50 group-hover:text-black w-full h-fit py-1 bg-gray-400/20 group-hover:bg-gray-400/50 rounded-lg text-wrap">
          Trước khi rời khỏi nhà hãy tắt các thiết bị điện không cần thiết bạn nhé!
          Trước khi rời khỏi nhà hãy tắt các thiết bị điện không cần thiết bạn nhé!
        </div>        
      </DeviceStatusCard>
    </div>
  );
};

export default DeviceStatusList;
