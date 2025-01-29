import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "./utils/cookies";
import AdminFooter from "./components/Footers/AdminFooter";

function PrivateRoute() {
  const phpSessionId = getCookie("PHPSESSID");

  return phpSessionId ? (
    <div className="App flex flex-col min-h-screen bg-background bg-big-screen bg-repeat-y font-main text-black">
      <Outlet />
      <AdminFooter />
    </div>
  ) : (
    <Navigate to="/connexion" />
  );
}

export default PrivateRoute;
