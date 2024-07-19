import React from "react";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PiFloppyDisk } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Links = [
  {
    title: "Dashboard",
    icon: <LiaTachometerAltSolid />,
    href: "/portal/dashboard",
  },
  {
    title: "Orders",
    icon: <IoCheckmarkCircleOutline />,
    href: "/portal/orders",
  },
  {
    title: "Quotes",
    icon: <PiFloppyDisk />,
    href: "/portal/quotes",
  },
  {
    title: "Retailers",
    icon: <IoLocationOutline />,
    href: "/portal/retailers",
  },
  {
    title: "Account",
    icon: <FaRegUser />,
    href: "/portal/account",
  },
];

export const Sidebar = ({ pageName }) => {
  return (
    <div className="w-[15%] h-screen bg-gray-800 text-white flex flex-col">
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {Links.map((link, index) => (
            <li
              key={index}
              className={`flex items-center p-2 rounded cursor-pointer ${
                pageName === link.title ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <a href={link.href} className="ml-4 text-lg">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
