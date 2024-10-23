import React from "react";
import { PriceCard } from "../PriceCard";
export const KitchenUpgrades = ({
  data,
  activeKitchenCounterTop,
  activeCounterTopMaterial,
  activeFlatCabinates,
  activecabinateHardware,
  activeTileBacksplash,
  activeBacksplashtile,
  activeKitchenFlooringMaterial,
  activeFlooringType,
  activeKitchenFucet,
  activeKitchenSinks,
}) => {
  return (
    <div className="mt-5 pb-5">
      <p className="font-semibold text-xl">{data.kitchen.title}</p>
      <PriceCard
        name={activeKitchenCounterTop.title}
        price={activeKitchenCounterTop.price}
        subtext={"Countertop"}
      />
      <PriceCard
        name={activeCounterTopMaterial?.title}
        price={activeCounterTopMaterial?.price}
        subtext={"Countertop Material"}
      />
      <PriceCard
        name={activeFlatCabinates.name}
        price={activeFlatCabinates.price}
        subtext={"Flat Cabinates"}
      />
      <PriceCard
        name={activecabinateHardware.name}
        price={activecabinateHardware.price}
        subtext={"Cabinates Hardware"}
      />
      <PriceCard
        name={activeTileBacksplash.name}
        price={activeTileBacksplash.price}
        subtext={"Tile Backsplash"}
      />
      <PriceCard
        name={activeBacksplashtile.name}
        price={activeBacksplashtile.price}
        subtext={"Backsplash Tile"}
      />
      <PriceCard
        name={activeKitchenFlooringMaterial.title}
        price={activeKitchenFlooringMaterial.price}
        subtext={"Kitchen Flooring Material"}
      />
      <PriceCard
        name={activeFlooringType.name}
        price={activeFlooringType.price}
        subtext={"Kitchen Flooring Type"}
      />
      <PriceCard
        name={activeKitchenFucet.name}
        price={activeKitchenFucet.price}
        subtext={"Kitchen Faucet"}
      />
      <PriceCard
        name={activeKitchenSinks.name}
        price={activeKitchenSinks.price}
        subtext={"Kitchen Sink"}
      />
    </div>
  );
};
