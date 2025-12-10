import { useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useHardLogout = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  
  const SESSION_DURATION = 60 * 60 * 1000;; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user === null) {
        return; 
      }

      let sessionStart = localStorage.getItem("sessionStart");

      if (sessionStart === null) {
        sessionStart = Date.now().toString();
        localStorage.setItem("sessionStart", sessionStart);
      }

      const now = Date.now();
      const timeElapsed = now - parseInt(sessionStart, 10);
      const timeRemaining = SESSION_DURATION - timeElapsed;

      if (timeRemaining <= 0) {
  
        signOut(auth).then(() => {
          localStorage.removeItem("sessionStart");
          navigate("/");
          toast.show("Session Expired", { type: "info", position: "bottom-right", autoClose: 1500 });
        });
      } else {
        const timerId = setTimeout(() => {
          console.log("Timer finished. Logging out.");
          signOut(auth).then(() => {
            localStorage.removeItem("sessionStart");
            navigate("/");
            alert("Session Expired");
          });
        }, timeRemaining);

        return () => clearTimeout(timerId);
      }
    });

    return () => unsubscribe();
  }, [navigate, auth]);
};

export default useHardLogout;