import React from "react";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PiFloppyDisk } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Links = [
  {
    title: "Dashboard",
    icon: <LiaTachometerAltSolid />,
    href: "/dashboard",
  },
  {
    title: "Orders",
    icon: <IoCheckmarkCircleOutline />,
    href: "/orders",
  },
  {
    title: "Quotes",
    icon: <PiFloppyDisk />,
    href: "/quotes",
  },
  {
    title: "Retailers",
    icon: <IoLocationOutline />,
    href: "/retailers",
  },
  {
    title: "Account",
    icon: <FaRegUser />,
    href: "/account",
  },
];

export const Sidebar = ({ pageName }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[15%] lg:w-[25%] sm:w-full sm:h-fit h-screen bg-gray-800 text-white flex flex-col">
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {Links.map((link, index) => (
            <li
              key={index}
              className={`flex items-center p-2 rounded cursor-pointer ${
                pageName === link.title ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => navigate(link.href)}
            >
              <span className="text-xl">{link.icon}</span>
              <p className="ml-4 text-lg">
                {link.title}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
