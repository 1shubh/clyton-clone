import React from "react";
import { OptionCard } from "../OptionCard";
import { BathroomTypeCard } from "../BathroomTypeCard";
import { CheckboxCard } from "../CheckboxCard";
import { ImageBox } from "../ImageBox";

const BathroomSection = ({
  data,
  activeBathroomType,
  setActiveBathroomType,
  activeBathroomEnclosure,
  setActiveBathroomEnclosure,
  activeBathroomTile,
  setActiveBathroomTile,
  activeBathroomTileType,
  setActiveBathroomTileType,
  activeSuboption,
  setActiveSuboption,
  activeShowertiles,
  setActiveShowerTiles,
  activeBathroomMirror,
  setActiveBathroomMirror,
  activeBathroomVanity,
  setActiveBathroomVanity,
  activeBathroomHardware,
  setActiveBathroomHardware,
  sectionRefs,
}) => {
  return (
    <div
      className="mt-5"
      id="bathroom"
      ref={(el) => (sectionRefs.current["bathroom"] = el)}
    >
      <h2 className="text-[30px] font-semibold">{data.bathroom.title}</h2>

      {/* Bathroom Type */}
      <p className="text-xl font-semibold">
        {data.bathroom.bathroomType.title}
      </p>
      <div className="mt-5">
        {data.bathroom.bathroomType.options.map((ele, i) => (
          <OptionCard
            key={i}
            option={ele}
            activeObj={activeBathroomType}
            setActiveObj={setActiveBathroomType}
          />
        ))}
      </div>

      {/* Bathroom Enclosure */}
      <p className="text-xl font-semibold mt-5">
        {data.bathroom.bathroomEnclosure.title}
      </p>
      <div className="mt-5">
        {data.bathroom.bathroomEnclosure.options.map((ele, i) => (
          <OptionCard
            key={i}
            option={ele}
            activeObj={activeBathroomEnclosure}
            setActiveObj={setActiveBathroomEnclosure}
          />
        ))}
      </div>

      {/* Bathroom Tile */}
      <p className="text-xl font-semibold mt-5">
        {data.bathroom.bathroomTile.title}
      </p>
      <div className="mt-5">
        {data.bathroom.bathroomTile.options?.map((ele, i) => (
          <BathroomTypeCard
            key={i}
            option={ele}
            activeObj={activeBathroomTile}
            setActiveObj={setActiveBathroomTile}
            activeType={activeBathroomTileType}
            setActiveType={setActiveBathroomTileType}
            activeSuboption={activeSuboption}
            setActiveSuboption={setActiveSuboption}
          />
        ))}
      </div>

      {/* Bathroom Tile Walls Options */}
      <div className="mt-5">
        <p className="text-xl font-semibold mt-5">
          {activeBathroomTileType?.title}
        </p>
        <div className="mt-5">
          {Object.keys(activeBathroomTileType).length === 0 ? (
            <></>
          ) : (
            activeBathroomTileType.subOptions.map((ele, i) => (
              <CheckboxCard
                key={i}
                option={ele}
                package={activeSuboption}
                setPackage={setActiveSuboption}
              />
            ))
          )}
        </div>
      </div>

      {/* Shower and Tiles */}
      <ImageBox
        title={data.bathroom.showerAndTiles.title}
        data={data.bathroom.showerAndTiles.options}
        active={activeShowertiles}
        setActive={setActiveShowerTiles}
      />

      {/* Bathroom Mirror */}
      <ImageBox
        title={data.bathroom.mirror.title}
        data={data.bathroom.mirror.options}
        active={activeBathroomMirror}
        setActive={setActiveBathroomMirror}
      />

      {/* Vanity Lighting */}
      <ImageBox
        title={data.bathroom.vanityLighting.title}
        data={data.bathroom.vanityLighting.options}
        active={activeBathroomVanity}
        setActive={setActiveBathroomVanity}
      />

      {/* Bathroom Hardware */}
      <ImageBox
        title={data.bathroom.hardware.title}
        data={data.bathroom.hardware.options}
        active={activeBathroomHardware}
        setActive={setActiveBathroomHardware}
      />
    </div>
  );
};

export default BathroomSection;
