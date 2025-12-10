import { Outlet } from "react-router-dom"
import Header from "../components/Header";
import HeaderBar from "./HeaderBar";
import useHardLogout from "../router/AutoLogout";

const Handler = () => {
  useHardLogout();
  return null;
}

const MainLayout = () => {
  return (    
    <>
      <Handler />
      <Header />
      <HeaderBar />
      <Outlet />     
    </>
  );
}

export default MainLayout;