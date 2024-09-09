import { Checkbox } from "@chakra-ui/react";
import React, { useState } from "react";

export const CheckboxCard = ({ option, checkPackage, setPackage }) => {
  const [checked, setChecked] = useState(false);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
    if (!checked) {
      // Add to package when checked
      setPackage((prev) => [...prev, option]);
    } else {
      // Remove from package when unchecked
      setPackage((prev) => prev.filter((item) => item.title !== option.title));
    }
  };

  return (
    <div
      className={`cursor-pointer p-2 mb-2 border h-[80px] rounded flex items-center gap-3 ${
        checked ? "border-blue-500 bg-[#c5e5f8]" : "border-gray-300 hover:bg-gray-100"
      }`}
    >
      <Checkbox isChecked={checked} onChange={handleCheckboxChange} />
      <div>
        <p className="text-[16px] font-normal">{option.title}</p>
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
    </div>
  );
};
