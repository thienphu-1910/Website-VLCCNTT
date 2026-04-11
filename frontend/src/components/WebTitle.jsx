import { twMerge } from "tailwind-merge";

const WebTitle = ({ title = "FireGuard", className = "" }) => {
  return (
    <h2
      className={twMerge(
        "bg-linear-to-b from-[#FC4778] to-[#3952F5] bg-clip-text text-transparent",
        className
      )}
    >
      {title}
    </h2>
  );
};

export default WebTitle;
