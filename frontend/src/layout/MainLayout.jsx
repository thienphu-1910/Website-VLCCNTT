import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center overflow-x-hidden overflow-y-auto">      
      <header className="flex flex-col gap-5">
        <Header />      
        <HeaderBar/>                
      </header>
      <Outlet />                    
      <Footer />      
    </div>
  );
};

export default MainLayout;
