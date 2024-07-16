import React from "react";
import { LuClipboardList } from "react-icons/lu";
import { TbHomeCheck } from "react-icons/tb";
import { Button } from "@chakra-ui/react";

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
    link: "/",
    btnText: "View",
  },
  {
    title: "Quotes",
    subtitle: "View or edit your saved quotes.",
    icon: <LuClipboardList />,
    link: "/",
    btnText: "View",
  },
];
export const Home = () => {
  return (
    <>
      <div className="bg-[#4b4b4b] p-20">
        <p className="text-white text-6xl text-center">
          Welcome to the <br /> Clayton Built® Ordering Portal
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
              <div className="text-8xl text-[#51748b]">{ele.icon}</div>
              <p className="text-[30px] text-[#323232]">{ele.title}</p>
              <p className="text-[18px] text-[#939598]">{ele.subtitle}</p>
              <hr />
              <Button backgroundColor={"#323232"} color="white">{ele.btnText}</Button>
            </div>
          );
        })}
      </div>
    </>
  );
};
