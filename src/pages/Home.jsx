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
    link: "/portal/orders",
    btnText: "View",
  },
  {
    title: "Quotes",
    subtitle: "View or edit your saved quotes.",
    icon: <RiHomeOfficeLine />,
    link: "/portal/quotes",
    btnText: "View",
  },
];
export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="bg-[#fd211e] p-20">
        <p className="text-white text-6xl text-center">
          Welcome to the <br />  Scenic Homes of AZ® Ordering Portal
        </p>
      </div>
      {/* Links */}
      <div className="flex items-center justify-around p-20">
        {homeLinks.map((ele, i) => {
          return (
            <div
              key={i}
              className="flex flex-col gap-1 justify-center items-center"
            >
              <div className="text-8xl text-[#fd211e]">{ele.icon}</div>
              <p className="text-[30px] text-[#323232]">{ele.title}</p>
              <p className="text-[18px] text-[#939598]">{ele.subtitle}</p>
              <div className="w-full border bg-red-500 h-1"></div>
              <Button colorScheme='orange' onClick={()=>navigate(ele.link)}>{ele.btnText}</Button>
            </div>
          );
        })}
      </div>
    </>
  );
};
