import React from 'react'
import { PriceCard } from '../PriceCard'
export const InteriorUpgrades = ({
    data,
    activeInteriorDoorHandles,
    activeInteriorWindow,
  }) => {
  return (
    <div className="mt-5 pb-5">
      <p className="font-semibold text-xl">{data.interior.title}</p>
      <PriceCard
        name={activeInteriorDoorHandles.name}
        price={activeInteriorDoorHandles.price}
        subtext={"Interior Door Handles"}
      />
      <PriceCard
        name={activeInteriorWindow.name}
        price={activeInteriorWindow.price}
        subtext={"Interior Window"}
      />
    </div>
  )
}
