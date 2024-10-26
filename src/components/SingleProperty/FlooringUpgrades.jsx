import React from "react";
import { PriceCard } from "../PriceCard";
export const FlooringUpgrades = ({
  data,
  activeKitchenBathroomFlooring,
  activeKitchenBathroomFlooringType,
  activeLeavingRoomFlooring,
  leavingRoomFlooringMaterial,
  activeBedroomFlooringMaterial,
}) => {
  return (
    <div className="mt-5 pb-5">
      <p className="mt-5 font-semibold text-xl">{data.flooring.title}</p>
      <PriceCard
        name={activeKitchenBathroomFlooring?.title}
        price={activeKitchenBathroomFlooring?.price}
        subtext={"Kitchen & Bathroom Flooring"}
      />
      <PriceCard
        name={activeKitchenBathroomFlooringType?.name}
        price={activeKitchenBathroomFlooringType?.price}
        subtext={"Kitchen Linoleum Flooring"}
      />
      <PriceCard
        name={activeLeavingRoomFlooring?.title}
        price={activeLeavingRoomFlooring?.price}
        subtext={"Leaving Room Flooring"}
      />
      <PriceCard
        name={leavingRoomFlooringMaterial?.name}
        price={leavingRoomFlooringMaterial?.price}
        subtext={"Living Room Carpet Takeaway-Non FHA"}
      />
      <PriceCard
        name={activeBedroomFlooringMaterial?.title}
        price={activeBedroomFlooringMaterial?.price}
        subtext={"Bedroom Flooring"}
      />
    </div>
  );
};
