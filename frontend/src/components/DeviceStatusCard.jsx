import { twMerge } from "tailwind-merge";
//grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
const DeviceStatusCard = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "bg-white/35 hover:bg-white border-2 border-white/50 py-5 px-5 rounded-xl h-35 w-100 hover:scale-102 hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DeviceStatusCard;
