import React from "react";

export const FloorOptionCard = ({ option, activeObj, setActiveObj }) => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div
      className={`cursor-pointer p-2 mb-2 border hover:bg-gray-100 h-[80px] rounded ${
        option.title === activeObj.title
          ? "border-blue-500 bg-[#c5e5f8]"
          : "border-gray-300"
      }`}
      onClick={() => setActiveObj(option)}
    >
      <p className="text-[16px] font-semibold">{option.title}</p>
      <div
        className={`${
          option.price === 0 ? "hidden" : "block"
        } border-black border border-opacity-70 w-fit rounded-md transition-opacity duration-300 ease-in-out px-1 mt-2 h-6 flex items-center justify-center opacity-70 text-xs font-normal`}
      >
        <p className="text-sm font-semibold text-[#000000]">
          + ${formatPrice(option.price)}
        </p>
      </div>
    </div>
  );
};
