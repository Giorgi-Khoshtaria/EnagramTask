import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

function Layout() {
  return (
    <div className="flex items-center justify-between max-md:flex-col  ">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
