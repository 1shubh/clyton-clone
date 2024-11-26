import React from "react";
import { LuClipboardList } from "react-icons/lu";
import { TbHomeCheck } from "react-icons/tb";
import { Button } from "@chakra-ui/react";
import { RiHomeOfficeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const homeLinks = [
  {
    title: "Start Order",
    subtitle: "Start an Order Request or Quote.",
    icon: <LuClipboardList />,
    link: "/models",
    btnText: "Start",
  },
  {
    title: "Orders",
    subtitle: "View your submitted orders.",
    icon: <TbHomeCheck />,
    link: "/orders",
    btnText: "View",
  },
  {
    title: "Quotes",
    subtitle: "View or edit your saved quotes.",
    icon: <RiHomeOfficeLine />,
    link: "/quotes",
    btnText: "View",
  },
];
export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#fd211e] p-20 lg:p-10 sm:p-10">
        <p className="text-white text-6xl lg:text-5xl text-center sm:text-3xl">
          Welcome to the <br /> Scenic Homes of AZ® Ordering Portal
        </p>
      </div>
      {/* Links */}
      <div className="sm:w-full flex items-center justify-around lg:justify-between gap-10 p-20 sm:grid sm:gap-5">
        {homeLinks.map((ele, i) => {
          return (
            <div
              key={i}
              className="grid place-items-center gap-3 lg:gap-2 justify-center items-center sm:grid sm:place-items-center w-full"
            >
              <div className="text-8xl sm:text-6xl lg:text-[6xl] text-[#fd211e]">
                {ele.icon}
              </div>
              <p className="text-[30px] sm:text-[25px] lg:text-[25px] text-[#323232]">
                {ele.title}
              </p>
              <p className="text-[18px] sm:text-[15px] lg:text-[15px] text-[#939598] text-nowrap">
                {ele.subtitle}
              </p>
              <div className="w-full border bg-red-500 h-1"></div>
              <Button colorScheme="orange" onClick={() => navigate(ele.link)}>
                {ele.btnText}
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};
