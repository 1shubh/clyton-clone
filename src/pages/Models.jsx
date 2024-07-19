import { Select } from "@chakra-ui/react";
import React from "react";

export const Models = () => {
  return (
    <>
      <div className="bg-[#fd211e] p-20">
        <p className="text-white text-6xl text-center">
        Order/Quote Builder
        </p>
      </div>
      {/* Orders data */}
      <div className="py-10">
        <Select w={"20%"} margin={"auto"}>
            <option>All Sizes</option>
            <option>Single-Section</option>
            <option>Multi-Section</option>
        </Select>
      </div>
    </>
  );
};
