import React from "react";
import { PriceCard } from "../PriceCard";
export const ExteriorUpgrades = ({
  data,
  activeSidingType,
  activeExteriorBodyColor,
  activeExteriorAccentColor,
  activeExteriorTrimColor,
  activeExteriorDoorPaint,
  activeShinglesMaterial,
  activeShinglesType,
  activeExteriorDoors,
}) => {
  return (
    <div className="mt-5 pb-5">
      <p className="font-semibold text-xl">{data.exterior.title}</p>
      <PriceCard
        name={activeSidingType.title}
        price={activeSidingType.price}
        subtext={"Smart Panel Siding"}
      />
      <PriceCard
        name={activeExteriorBodyColor.name}
        price={activeExteriorBodyColor.price}
        subtext={"Exterior Body Color"}
      />
      <PriceCard
        name={activeExteriorAccentColor.name}
        subtext={"Exterior Accent Color"}
      />
      <PriceCard
        name={activeExteriorTrimColor.name}
        subtext={"Exterior Trim Color"}
      />
      <PriceCard
        name={activeExteriorDoorPaint.name}
        subtext={"Exterior Door Paint"}
      />
      <PriceCard
        name={activeShinglesMaterial?.title}
        price={activeShinglesMaterial?.price}
        subtext={"Shingles Material"}
      />
      <PriceCard
        name={activeShinglesType.name}
        price={activeShinglesType.price}
        subtext={"Shingles Type"}
      />
      <PriceCard
        name={activeExteriorDoors.title}
        price={activeExteriorDoors.price}
        subtext={"Front Doors"}
      />
    </div>
  );
};
