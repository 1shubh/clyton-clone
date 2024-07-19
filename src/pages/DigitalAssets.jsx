import { Button } from '@chakra-ui/react';
import React from 'react'
import { TbHomeDown } from "react-icons/tb";
import { FiFolderMinus } from "react-icons/fi";
import { FaHelmetSafety } from "react-icons/fa6";
const homeLinks = [
    {
      title: "Model Assets",
      subtitle: "Floor Plans, Images, Sales Sheets, and Virtual Tours.",
      icon:<TbHomeDown />,
      link: "/",
      btnText: "View",
    },
    {
      title: "Logos/Branding",
      subtitle: "EPS, SVGs, PNGs, JPGs",
      icon:<FiFolderMinus />,
      link: "/",
      btnText: "View",
    },
    {
      title: "Builder Resources",
      subtitle: "Foundation Systems, Site Construction, & Homeowner Manuals.",
      icon: <FaHelmetSafety />,
      link: "/",
      btnText: "View",
    },
  ];

export const DigitalAssets = () => {
  return (
    <>
    <div className="bg-[#fd211e] p-20">
      <p className="text-white text-6xl text-center">
        Digital Assets
      </p>
    </div>
    {/* Links */}
    <div className="flex items-center justify-around p-20">
      {homeLinks.map((ele, i) => {
        return (
          <div
            key={i}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <div className="text-8xl text-[#fd211e]">{ele.icon}</div>
            <p className="text-[30px] text-[#323232]">{ele.title}</p>
            <p className="text-[18px] text-[#939598]">{ele.subtitle}</p>
            <div className="w-full border bg-red-500 h-1"></div>
            <Button colorScheme='orange'>{ele.btnText}</Button>
          </div>
        );
      })}
    </div>
  </>
  )
}
