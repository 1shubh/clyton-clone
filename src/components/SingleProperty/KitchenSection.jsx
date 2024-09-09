import React from 'react';
import { OptionCard } from '../OptionCard';
import { ImageBox } from '../ImageBox';

const KitchenSection = ({
  data,
  activeKitchenCounterTop,
  setActiveKitchenCounterTop,
  activeCounterTopMaterial,
  setActiveCounterTopMaterial,
  activeFlatCabinates,
  setActiveFlatCabinates,
  activeCabinateHardware,
  setActiveCabinateHardware,
  activeTileBacksplash,
  setActiveTileBacksplash,
  activeBacksplashtile,
  setActiveBacksplashtile,
  activeKitchenFlooringMaterial,
  setActiveKitchenFlooringMaterial,
  activeFlooringType,
  setActiveFlooringType,
  activeKitchenFaucet,
  setActiveKitchenFaucet,
  activeKitchenSinks,
  setActiveKitchenSinks,
  sectionRefs
}) => {
  return (
    <div
      className="mt-5"
      id="kitchen"
      ref={(el) => (sectionRefs.current["kitchen"] = el)}
    >
      <h2 className="text-[30px] font-semibold">{data.kitchen.title}</h2>

      {/* Countertop Material */}
      <div className="mt-5">
        <p className="text-xl font-semibold">Countertop material</p>
        <div className="mt-5">
          {data.kitchen.counterTopMaterial.options.map((ele, i) => (
            <OptionCard
              key={i}
              option={ele}
              activeObj={activeKitchenCounterTop}
              setActiveObj={setActiveKitchenCounterTop}
            />
          ))}
        </div>
        <ImageBox
          title={activeKitchenCounterTop.subTitle}
          data={activeKitchenCounterTop.types}
          active={activeCounterTopMaterial}
          setActive={setActiveCounterTopMaterial}
        />
      </div>

      {/* Flat Panel Cabinets */}
      <ImageBox
        title={data.kitchen.flatPanelCabinets.title}
        data={data.kitchen.flatPanelCabinets.options}
        active={activeFlatCabinates}
        setActive={setActiveFlatCabinates}
      />

      {/* Cabinet Hardware */}
      <ImageBox
        title={data.kitchen.cabinetHardware.title}
        data={data.kitchen.cabinetHardware.options}
        active={activeCabinateHardware}
        setActive={setActiveCabinateHardware}
      />

      {/* Tile Backsplash */}
      <ImageBox
        title={data.kitchen.tileBacksplash.title}
        data={data.kitchen.tileBacksplash.options}
        active={activeTileBacksplash}
        setActive={setActiveTileBacksplash}
      />

      {/* Backsplash Tile */}
      <ImageBox
        title={data.kitchen.backsplashTile.title}
        data={data.kitchen.backsplashTile.options}
        active={activeBacksplashtile}
        setActive={setActiveBacksplashtile}
      />

      {/* Flooring Material */}
      <p className="text-xl font-semibold mt-5">
        {data.kitchen.flooringMaterial.title}
      </p>
      <div className="mt-5">
        {data.kitchen.flooringMaterial.options.map((ele, i) => (
          <OptionCard
            key={i}
            option={ele}
            activeObj={activeKitchenFlooringMaterial}
            setActiveObj={setActiveKitchenFlooringMaterial}
          />
        ))}
        <ImageBox
          title={activeKitchenFlooringMaterial.subtitle}
          data={activeKitchenFlooringMaterial.types}
          active={activeFlooringType}
          setActive={setActiveFlooringType}
        />
      </div>

      {/* Kitchen Faucets */}
      <ImageBox
        title={data.kitchen.kitchenFaucets.title}
        data={data.kitchen.kitchenFaucets.options}
        active={activeKitchenFaucet}
        setActive={setActiveKitchenFaucet}
      />

      {/* Kitchen Sinks */}
      <ImageBox
        title={data.kitchen.kitchenSinks.title}
        data={data.kitchen.kitchenSinks.options}
        active={activeKitchenSinks}
        setActive={setActiveKitchenSinks}
      />
    </div>
  );
};

export default KitchenSection;
