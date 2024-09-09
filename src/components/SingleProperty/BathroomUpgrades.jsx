import React from 'react'
import { PriceCard } from '../PriceCard'
export const BathroomUpgrades = ({
    data,
    activeBathroomType,
    activeBathroomEnclosure,
    activeBathroomTile,
    activeSuboption,
    activeShowertiles,
    activeBathroomMirror,
    activeBathroomVanity,
    activeBathroomHardware,
  }) => {
  return (
    <div className="mt-5 pb-5">
      <p className="mt-5 font-semibold text-xl">{data.bathroom.title}</p>
      <PriceCard
        name={activeBathroomType.title}
        price={activeBathroomType.price}
        subtext={"Bathroom Type"}
      />
      <PriceCard
        name={activeBathroomEnclosure.title}
        price={activeBathroomEnclosure.price}
        subtext={"Bathroom Enclosure"}
      />
      <PriceCard
        name={activeBathroomTile.title}
        price={activeBathroomTile.price}
        subtext={"Bathroom Tiles"}
      />
      
      <div className="">
        {activeSuboption.map((item, index) => (
          <PriceCard
            key={index}
            name={item.title}
            price={item.price}
            subtext={"Structure"}
          />
        ))}
      </div>
      <PriceCard
        name={activeShowertiles.name}
        price={activeShowertiles.price}
        subtext={"Shower Tiles"}
      />
      <PriceCard
        name={activeBathroomMirror.name}
        price={activeBathroomMirror.price}
        subtext={"Bathroom Mirror"}
      />
      <PriceCard
        name={activeBathroomVanity.name}
        price={activeBathroomVanity.price}
        subtext={"Bathroom Vanity"}
      />
      <PriceCard
        name={activeBathroomHardware.title}
        price={activeBathroomHardware.price}
        subtext={"Bathroom Hardware"}
      />
    </div>
  )
}
