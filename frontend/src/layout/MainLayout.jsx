import { Outlet } from "react-router-dom"
import Header from "../components/Header";
import HeaderBar from "./HeaderBar";

const MainLayout = () => {
  return (    
    <>
      <Header />
      <HeaderBar />
      <Outlet />     
    </>
  );
}

export default MainLayout;