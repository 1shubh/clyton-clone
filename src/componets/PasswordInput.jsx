import React from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

export function PasswordInput({ value, setpassword }) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        className="text-white"
        value={value}
        onChange={(e) => setpassword(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <div
          className="w-full h-full flex items-center justify-center text-white cursor-pointer text-xl"
          onClick={handleClick}
        >
          {show ? <BsEyeSlashFill /> : <IoEyeSharp />}
        </div>
      </InputRightElement>
    </InputGroup>
  );
}
