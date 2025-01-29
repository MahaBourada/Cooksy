import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footers/Footer.jsx";

function Layout() {
  return (
    <div className="App flex flex-col min-h-screen bg-background bg-big-screen bg-repeat-y font-main text-black">
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;