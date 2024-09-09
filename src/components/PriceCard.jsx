import React from "react";

export const PriceCard = ({ name, price, subtext }) => {
  return (
    <div className="flex items-center justify-between">
      <p>
        {name} {subtext}
      </p>
      <p>{price > 0 ? `$${price}` : ""}</p>
    </div>
  );
};
