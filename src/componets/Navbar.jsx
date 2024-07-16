import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Button } from "@chakra-ui/react";
export const Navbar = () => {
  return (
    <div className="bg-[#323232] w-full p-5 flex justify-between items-center">
      {/* Logo */}
      <div className="w-[15%]">
        <img src="/images/logo.svg" alt="logo" />
      </div>
      {/* profile links*/}
      <div className="flex gap-10">
        {/* Location */}
        <div className="text-white flex gap-2 items-center">
          <div className="text-3xl">
            <IoLocationOutline color="white" />
          </div>
          <div>
            <p className="uppercase text-[12px]">Current Retailer location</p>
            <div className="flex items-center gap-1 hover:text-[#928dd9]">
              <p className="text-[18px] font-bold cursor-pointer ">
                Retailer name
              </p>
              <FaAngleDown fontSize={"18px"} />
            </div>
          </div>
        </div>
        {/*Profile Dashboard */}
        <div className="text-white flex gap-2 items-center">
          <div className="text-2xl">
            <FaRegUser />
          </div>
          <div>
            <p className="uppercase text-[12px]">Hello Test User</p>
            <div className="flex items-center gap-1 hover:text-[#928dd9]">
              <p className="text-[18px] font-bold cursor-pointer ">
                Quick Links
              </p>
              <FaAngleDown fontSize={"18px"} />
            </div>
          </div>
        </div>
        {/* Button To create order  */}
        <Button>Create Order</Button>
      </div>
    </div>
  );
};
