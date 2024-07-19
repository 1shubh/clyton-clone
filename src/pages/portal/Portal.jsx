import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { PortalRoutes } from "../../routes/PortalRoutes";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export const Portal = () => {
  return (
    <div className="flex flex-grow">
      <Sidebar />
      <div className="flex-grow">
        <PortalRoutes />
      </div>
    </div>
  );
};
