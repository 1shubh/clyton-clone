import React from 'react'
import { PriceCard } from '../PriceCard'
export const AppliancesUpgrade = ({
    data,
    activeAppliances,
    activeAppliancesPackage,
    activeCustomAppliances,
    activeCustomRefrigirator,
    activeRange,
    activeDishwasher,
  }) => {
  return (
    <div className="mt-5 pb-5">
    <p className="font-semibold text-xl">{data.appliances.title}</p>
    <PriceCard
      name={activeAppliances.title}
      price={activeAppliances.price}
      subtext={""}
    />
    <PriceCard
      name={activeAppliancesPackage.title}
      price={activeAppliancesPackage.price}
      subtext={"Appliance Package"}
    />
    <PriceCard
      name={activeCustomAppliances?.title}
      price={activeCustomAppliances?.price}
      subtext={""}
    />
    <PriceCard
      name={activeCustomRefrigirator?.title}
      price={activeCustomRefrigirator?.price}
      subtext={"Refrigerator"}
    />
    <PriceCard
      name={activeRange?.title}
      price={activeRange?.price}
      subtext={""}
    />
    <PriceCard
      name={activeDishwasher.title}
      price={activeDishwasher.price}
      subtext={""}
    />
  </div>
  )
}
