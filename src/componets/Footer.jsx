import React from "react";

export const Footer = () => {
  return (
    <div className="bg-[#323232] p-10 flex justify-around">
      <div className="w-[10%]">
        <img src="/images/logo.svg" alt="logo" />
      </div>
      {/* other links */}
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="text-xl text-white flex gap-5">
          <p>Digital Assets</p>
          <p>FAQs</p>
        </div>
        <div className="text-white text-[10px] flex gap-5">
            <p>© 2024 Clayton Home Building Group </p>
            <p>Legal</p>
            <p>Privacy</p>
        </div>
      </div>
      {/* logo 2 */}
      <div className="w-[10%]">
        <img src="/images/logo2.svg" alt="logo" />
      </div>
    </div>
  );
};
