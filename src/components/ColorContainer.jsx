import React from "react";
import { ColorCard } from "./ColorCard";

export const ColorContainer = ({
  title,
  data,
  activeColor,
  setActiveColor,
}) => {
  return (
    <div className="mt-5">
      <p className="text-xl font-semibold">{title}</p>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {data?.map((ele, index) => {
          return (
            <ColorCard
              key={index}
              ele={ele}
              aciveColor={activeColor}
              setActiveColor={setActiveColor}
            />
          );
        })}
      </div>
    </div>
  );
};
