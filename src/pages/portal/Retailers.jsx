import React from "react";
import { Sidebar } from "../../components/Sidebar";

import { RetailersTable } from "../../components/RetailersTable";
import { HeadingBox } from "../../components/HeadingBox";

export const Retailers = () => {
  return (
    <div className="flex gap-2">
      <Sidebar pageName={"Retailers"} />
      <div className="w-[84%]">
        <HeadingBox pageName={"Retailers"} />
        <p className="text-sm font-bold text-black mt-4 pb-5">Total Retailers : 0</p>
        <RetailersTable/>
      </div>
    </div>
  );
};
