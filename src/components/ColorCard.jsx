import React from "react";

export const ColorCard = ({ ele, aciveColor, setActiveColor }) => {
  return (
    <div
      className={`px-2 py-3 font-semibold border border-gray-300 cursor-pointer rounded-md ${ele===aciveColor ? "bg-[#c5e5f8]" : ""}`}
      onClick={() => setActiveColor(ele)}
    >
      <div
        className={`w-full h-[150px] rounded-md`}
        style={{ backgroundColor: ele.colorCode }}
      ></div>
      <p className="text-sm">{ele.name}</p>
    </div>
  );
};
