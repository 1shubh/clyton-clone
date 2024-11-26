import React from "react";
import { Sidebar } from "../../components/Sidebar";
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
    link: "/",
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
export const Dashborad = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 sm:grid">
      <Sidebar pageName={"Dashboard"} />
      <div className="flex justify-around w-[84%] lg:w-[80%] py-10 sm:grid sm:w-full sm:gap-5">
        {homeLinks.map((ele, i) => {
          return (
            <div key={i} className="flex flex-col items-center gap-5 sm:gap-2">
              <div className="text-8xl text-[#fd211e]">{ele.icon}</div>
              <p className="text-[30px] text-[#323232]">{ele.title}</p>
              <p className="text-[18px] text-[#939598]">{ele.subtitle}</p>
              <div className="w-full border bg-red-500 h-1"></div>
              <Button colorScheme="orange" onClick={() => navigate(ele.link)}>
                {ele.btnText}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
