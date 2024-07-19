import React from "react";

export const Footer = () => {
  return (
    <div className="bg-[#e9e2e4] p-10 flex justify-around">
      <div className="w-[10%]">
        <img src="/images/logo.png" alt="logo" />
      </div>
      {/* other links */}
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="text-xl text-black flex gap-5">
          <p>Digital Assets</p>
          <p>FAQs</p>
        </div>
        <div className="text-black text-[10px] flex gap-5">
            <p>© 2024 Scenic Homes of AZ® </p>
            <p>Legal</p>
            <p>Privacy</p>
        </div>
      </div>
      {/* logo 2 */}
      <div className="w-[10%]">
        <img src="/images/logo.png" alt="logo" />
      </div>
    </div>
  );
};
