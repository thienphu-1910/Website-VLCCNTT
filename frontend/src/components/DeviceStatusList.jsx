import { twMerge } from "tailwind-merge";
import DeviceStatusCard from "./DeviceStatusCard";


//grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
const DeviceStatusList = ({ className = "" }) => {
  return (
    <div
      className={twMerge(
        "w-full grid grid-cols-3 justify-center justify-items-center",
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
