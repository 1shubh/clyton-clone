import React, { useContext, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { quickLinksSubheading } from "../RouterLinks/NavLinks";
import { AuthContext } from "../hoc/AuthContext";

const retailerSubheading = [
  {
    title: "Retailers",
    href: "/portal/retailers",
  },
];

export const Navbar = () => {
  const [retailerOver, setRetailerOver] = useState(false);
  const [quickLinksOver, setQuickLinksOver] = useState(false);
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRetailerMouseOver = () => {
    setRetailerOver(true);
  };

  const handleRetailerMouseOut = () => {
    setRetailerOver(false);
  };

  const handleQuickLinksMouseOver = () => {
    setQuickLinksOver(true);
  };

  const handleQuickLinksMouseOut = () => {
    setQuickLinksOver(false);
  };

  const handleQuickLinksClick = (ele) => {
    if (ele.title === "Sign Out") {
      logoutUser();
      navigate("/");
    } else {
      navigate(ele.href);
    }
  };

  return (
    <div className="bg-[#e9e2e4] w-full p-5 pl-20 pr-20 flex justify-between items-center">
      {/* Logo */}
      <div className="w-[10%] cursor-pointer" onClick={() => navigate("/")}>
        <img src="/images/logo.png" alt="logo" />
      </div>
      {/* profile links*/}
      <div className="flex gap-10">
        {/* Location */}
        <div
          className="relative"
          onMouseOver={handleRetailerMouseOver}
          onMouseOut={handleRetailerMouseOut}
        >
          {/* Heading */}
          <div className="text-black flex gap-2 items-center">
            <div className="text-3xl">
              <IoLocationOutline color="black" />
            </div>
            <div>
              <p className="uppercase text-[12px]">Current Retailer location</p>
              <div className="flex items-center gap-1 hover:text-[#fd211e]">
                <p className="text-[18px] font-bold cursor-pointer">
                  Retailer name
                </p>
                <FaAngleDown fontSize={"18px"} />
              </div>
            </div>
          </div>
          {/* subheading */}
          <div
            className={`absolute z-10 left-0 right-0 top-[4em] w-full transition-all duration-300 rounded-sm bg-[#e9e2e4] py-0 nav-subMenu-shadow ${
              retailerOver ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
            }`}
            onMouseOver={handleRetailerMouseOver}
            onMouseOut={handleRetailerMouseOut}
          >
            {/* Subheading content goes here */}
            {retailerSubheading.map((ele, i) => (
              <div
                key={i}
                className="hover:bg-[red] py-2 px-2 hover:text-white cursor-pointer"
                onClick={() => navigate(ele.href)}
              >
                <p className="font-semibold text-[18px]">{ele.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Dashboard */}
        <div
          className="text-black flex gap-2 items-center relative"
          onMouseOver={handleQuickLinksMouseOver}
          onMouseOut={handleQuickLinksMouseOut}
        >
          <div className="text-2xl">
            <FaRegUser />
          </div>
          <div>
            <p className="uppercase text-[12px]">Hello Test User</p>
            <div className="flex items-center gap-1 hover:text-[#fd211e]">
              <p className="text-[18px] font-bold cursor-pointer">
                Quick Links
              </p>
              <FaAngleDown fontSize={"18px"} />
            </div>
          </div>
          {/* Quick Links subheading */}
          <div
            className={`absolute z-10 left-0 right-0 top-[4em] w-full transition-all duration-300 rounded-sm bg-[#e9e2e4] py-0 nav-subMenu-shadow ${
              quickLinksOver ? "opacity-100" : "opacity-0 max-h-0"
            }`}
            onMouseOver={handleQuickLinksMouseOver}
            onMouseOut={handleQuickLinksMouseOut}
          >
            {/* Quick Links content goes here */}
            {quickLinksSubheading.map((ele, i) => (
              <div
                key={i}
                className="hover:bg-[red] py-2 px-2 hover:text-white cursor-pointer"
                onClick={() => handleQuickLinksClick(ele)}
              >
                <p className="font-semibold text-[18px]">{ele.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Button To create order */}
        <Button colorScheme="orange" onClick={() => navigate("/models")}>
          Create Order
        </Button>
      </div>
    </div>
  );
};
