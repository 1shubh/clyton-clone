import React from "react";
import { OptionCard } from "../OptionCard";
import { ImageBox } from "../ImageBox";

const FlooringSection = ({
  data,
  activeKitchenBathroomFlooring,
  setActiveKitchenBathroomFlooring,
  activeKitchenBathroomFlooringType,
  setActiveKithcenBathroomFlooringType,
  activeLeavingRoomFlooring,
  setActiveLeavingRoomFlooring,
  leavingRoomFlooringMaterial,
  setLivingRoomFlooringMaterial,
  activeBedroomFlooringMaterial,
  setActiveBedroomFlooringMaterial,
  activeBedroomFlooringType,
  setActiveBedroomFlooringType,
  sectionRefs,
}) => {
  return (
    <div
      className="mt-5"
      id="flooring"
      ref={(el) => (sectionRefs.current["flooring"] = el)}
    >
      <h2 className="text-[30px] font-semibold">{data.flooring.title}</h2>

      {/* Kitchen and Bathroom Flooring Material */}
      <p className="text-xl font-semibold mt-5">
        {data.flooring.kitchenflooringMaterial.title}
      </p>
      {data.flooring.kitchenflooringMaterial.options.map((ele, i) => (
        <OptionCard
          key={i}
          option={ele}
          activeObj={activeKitchenBathroomFlooring}
          setActiveObj={setActiveKitchenBathroomFlooring}
        />
      ))}

      {/* Type of Kitchen and Bathroom Flooring Material */}
      <div>
        <ImageBox
          title={activeKitchenBathroomFlooring?.subheading}
          data={activeKitchenBathroomFlooring?.options}
          active={activeKitchenBathroomFlooringType}
          setActive={(option) => {
            setActiveKithcenBathroomFlooringType(option);
            // Preserve other states if needed here
          }}
        />
      </div>

      {/* Living Room Flooring */}
      <p className="text-xl font-semibold mt-5">
        {data.flooring.leavingRoomFlooringMaterial?.title}
      </p>
      <div className="mt-5">
        {data.flooring.leavingRoomFlooringMaterial.options.map((ele, i) => (
          <OptionCard
            option={ele}
            key={i}
            activeObj={activeLeavingRoomFlooring}
            setActiveObj={setActiveLeavingRoomFlooring}
          />
        ))}
      </div>
      <ImageBox
        title={activeLeavingRoomFlooring?.subheading}
        data={activeLeavingRoomFlooring?.subOptions}
        active={leavingRoomFlooringMaterial}
        setActive={setLivingRoomFlooringMaterial}
      />

      {/* Bedroom Flooring */}
      <p className="text-xl font-semibold mt-5">
        {data.flooring.bedroomFlooringMaterial.title}
      </p>
      <div className="mt-5">
        {data.flooring.bedroomFlooringMaterial.options.map((ele, i) => (
          <OptionCard
            option={ele}
            key={i}
            activeObj={activeBedroomFlooringMaterial}
            setActiveObj={setActiveBedroomFlooringMaterial}
          />
        ))}
      </div>
      <ImageBox
        title={activeBedroomFlooringMaterial?.subheading}
        data={activeBedroomFlooringMaterial?.subOptions}
        active={activeBedroomFlooringType}
        setActive={setActiveBedroomFlooringType}
      />
    </div>
  );
};

export default FlooringSection;
