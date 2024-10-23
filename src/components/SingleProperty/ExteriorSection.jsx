import React from "react";
import { OptionCard } from "../OptionCard";
import { ColorContainer } from "../ColorContainer";
import { ImageColorCard } from "../ImageColorCard";

const ExteriorSection = ({
  data,
  activeSidingType,
  setActiveSidingType,
  activeExteriorBodyColor,
  setActiveExteriorBodyColor,
  activeExteriorAccentColor,
  setActiveExteriorAccentColor,
  activeExteriorTrimColor,
  setActiveExteriorTrimColor,
  activeExteriorDoorPaint,
  setActiveExteriorDoorPaint,
  activeShinglesMaterial,
  setActiveShinglesMaterial,
  activeShinglesType,
  setActiveShinglesType,
  activeExteriorDoors,
  setActiveExteriorDoors,
  sectionRefs,
}) => {
  return (
    <div
      className="mt-5"
      id="exterior"
      ref={(el) => (sectionRefs.current["exterior"] = el)}
    >
      <h2 className="text-[30px] font-semibold">{data.exterior.title}</h2>
      <p className="text-xl font-semibold">{data.exterior.sidingType.title}</p>

      {/* Exterior Siding Type */}
      <div className="mt-5">
        {data.exterior.sidingType.options.map((ele, index) => (
          <OptionCard
            key={index}
            option={ele}
            activeObj={activeSidingType}
            setActiveObj={setActiveSidingType}
          />
        ))}
      </div>

      {/* Exterior Body Color */}
      <ColorContainer
        title={data.exterior.bodyColor.title}
        data={data.exterior.bodyColor.options}
        activeColor={activeExteriorBodyColor}
        setActiveColor={setActiveExteriorBodyColor}
      />

      {/* Exterior Accent Color */}
      <ColorContainer
        title={data.exterior.accentColor.title}
        data={data.exterior.accentColor.options}
        activeColor={activeExteriorAccentColor}
        setActiveColor={setActiveExteriorAccentColor}
      />

      {/* Exterior Trim Color */}
      <ColorContainer
        title={data.exterior.trimColor.title}
        data={data.exterior.trimColor.options}
        activeColor={activeExteriorTrimColor}
        setActiveColor={setActiveExteriorTrimColor}
      />

      {/* Exterior Door Paint */}
      <ColorContainer
        title={data.exterior.doorPaint.title}
        data={data.exterior.doorPaint.options}
        activeColor={activeExteriorDoorPaint}
        setActiveColor={setActiveExteriorDoorPaint}
      />

      {/* Shingles Material */}
      <div className="mt-5">
        <p className="text-xl font-semibold">
          {data.exterior.shiglesMaterial.title}
        </p>
        <div className="mt-5">
          {data.exterior.shiglesMaterial.options.map((ele, index) => (
            <OptionCard
              key={index}
              option={ele}
              activeObj={activeShinglesMaterial}
              setActiveObj={setActiveShinglesMaterial}
            />
          ))}
        </div>

        {/* Active Shingles Material Type */}
        <ImageColorCard
          title={activeShinglesMaterial?.subtitle}
          data={activeShinglesMaterial?.types}
          active={activeShinglesType}
          setActive={setActiveShinglesType}
        />

        {/* Exterior Doors */}
        <p className="text-xl font-semibold mt-5">
          {data.exterior.exteriorDoors.title}
        </p>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {data.exterior.exteriorDoors.options?.map((ele, i) => (
            <div
              className={`px-2 py-3 font-semibold border border-gray-300 cursor-pointer rounded-md ${
                ele === activeExteriorDoors ? "bg-[#c5e5f8]" : ""
              }`}
              key={i}
              onClick={() => setActiveExteriorDoors(ele)}
            >
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={ele.image}
                  alt={ele.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <p>{ele.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExteriorSection;
