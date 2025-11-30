import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  }
  return (
    <div className="h-fit w-30 bg-white absolute right-0 top-11 rounded-lg 
                    flex flex-col gap-2 py-2 px-2">
      <button className="text-red-600 text-lg font-bold bg-none hover:bg-red-400 hover:text-white px-2 py-1
                          rounded-lg"
              onClick={() => onClick()}>
        Log out
      </button>
    </div>
  );
};

const UserAvatar = ({ user }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="size-fit relative">
      <img src={user.avatar_url} alt={user.name + " avatar"} 
           className="cursor-pointer size-10 rounded-full object-center object-cover border-2 border-white"
           onClick={() => setShow(!show)}
           />           
      {show && <AvatarDropdown />}
    </div>    
  );
};

export default UserAvatar;
