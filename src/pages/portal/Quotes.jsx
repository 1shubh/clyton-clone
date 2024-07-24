import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { HeadingBox } from "../../components/HeadingBox";
import { PortalTable } from "../../components/PortalTable";

export const Quotes = () => {
  return (
    <div className="flex gap-2 sm:grid">
      <Sidebar pageName={"Quotes"} />
      <div className="w-[84%] lg:w-[80%] sm:w-full sm:p-1">
        <HeadingBox pageName={"Quotes"} />
        <p className="text-sm font-bold text-black mt-4">Total Quotes : 0</p>
        <PortalTable />
      </div>
    </div>
  );
};
