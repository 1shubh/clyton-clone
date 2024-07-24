import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { Button, Input, Select } from "@chakra-ui/react";
export const Account = () => {
  return (
    <div className="flex gap-2 sm:grid sm:pb-5">
      <Sidebar pageName={"Account"} />
      <div className="w-[84%] px-2 sm:w-full">
        <div className="border-b-2 border-black pb-2">
          <p className="text-2xl font-bold">Account</p>
        </div>
        <p className="mt-4 font-bold text-xl">Account Information</p>
        <div className="grid grid-cols-2 gap-5 w-[60%] xl:w-[80%] sm:w-full">
          <div>
            <p className="font-semibold text-sm">First Name *</p>
            <Input placeholder="First Name" />
          </div>
          <div>
            <p className="font-semibold text-sm">Last Name *</p>
            <Input placeholder="Last Name" />
          </div>
          <div>
            <p className="font-semibold text-sm">Mobile Number</p>
            <Input placeholder="Mobile Number" type="number" />
          </div>
          <div>
            <p className="font-semibold text-sm">Email</p>
            <Input placeholder="Email" type="email" />
          </div>
        </div>
        <p className="font-bold text-2xl mt-5">Default Selections</p>
        <div className="grid grid-cols-2 gap-5 mt-5 w-[60%] xl:w-[80%] sm:w-full">
          <div>
            <p className="font-semibold text-sm ">Windzone</p>
            <Select>
              <option value="windzone1">Wind Zone 1</option>
              <option value="windzone2">Wind Zone 2</option>
              <option value="windzone3">Wind Zone 3</option>
            </Select>
          </div>
          <div>
            <p className="font-bold text-2xl"></p>
            <p className="font-semibold text-sm ">Thermal zone</p>
            <Select>
              <option value="windzone1">Thermal Zone 1</option>
              <option value="windzone2">Thermal Zone 2</option>
              <option value="windzone3">Thermal Zone 3</option>
            </Select>
          </div>
        </div>
        <div className="w-[30%] xl:w-[40%] sm:w-[80%]">
          <p className="font-bold text-2xl mt-5">Password</p>
          <p className="font-semibold text-sm mt-2">
            Enter new password to update
          </p>
          <Input placeholder="Password" type="password" />
        </div>
        <Button colorScheme="orange" marginTop={"20px"}>Update</Button>
      </div>
    </div>
  );
};
