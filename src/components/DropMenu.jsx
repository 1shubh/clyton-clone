import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hoc/AuthContext";


export const DropMenu = ({ links, name }) => {
    const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLinks = (ele) => {
    if (ele.title === "Sign Out") {
      logoutUser();
      navigate("/");
    } else {
      navigate(ele.href);
    }
  };
  return (
    <Menu>
      <MenuButton variant={"ghost"}>
        <div className="flex items-center gap-2">
          <p className="text-[18px] font-bold hover:text-[#fd211e]">{name}</p>
          <FaAngleDown fontSize={"18px"} />
        </div>
      </MenuButton>
      <MenuList backgroundColor={"#e9e2e4"}>
        {links.map((link, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => handleLinks(link)}
              backgroundColor={"transparent"}
              _hover={{ backgroundColor: "#fd211e", color: "white" }}
              className="font-semibold text-[18px]"
            >
              {link.title}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
