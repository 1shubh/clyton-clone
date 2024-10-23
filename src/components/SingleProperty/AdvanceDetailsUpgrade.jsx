import React from "react";
import { PriceCard } from "../PriceCard";
export const AdvanceDetailsUpgrade = ({
  data,
  activeCeilingHeight,
  activeStructure,
  activeSideWall,
  activeInsulationOption,
}) => {
  return (
    <div className="mt-5 pb-5">
      <p className="font-semibold text-xl">{data.advanceDetails.title}</p>
      <PriceCard
        name={activeCeilingHeight?.title}
        price={activeCeilingHeight?.price}
        subtext={"Ceiling Height"}
      />
      <div>
        {activeStructure.map((item, index) => (
          <PriceCard
            key={index}
            name={item.title}
            price={item.price}
            subtext={"Structure"}
          />
        ))}
      </div>
      <PriceCard
        name={activeSideWall.title}
        price={activeSideWall.price}
        subtext={"Side Walls"}
      />
      <PriceCard
        name={activeInsulationOption.title}
        price={activeInsulationOption.price}
        subtext={"Insulation"}
      />
    </div>
  );
};
