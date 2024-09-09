import React from "react";
import { OptionCard } from "../OptionCard";
import { AppliancesPackageCard } from "../AppliancesPackageCard";

const AppliancesSection = ({
  data,
  activeAppliances,
  setActiveAppliances,
  activeAppliancesPackage,
  setActiveAppliancesPackage,
  activeCustomAppliances,
  setActiveCustomAppliances,
  activeCustomRefrigirator,
  setActiveRefrigirator,
  activeRange,
  setActiveRange,
  activeDishwasher,
  setActiveDishwasher,
  sectionRefs,
}) => {
  return (
    <div
      className="mt-5"
      id="appliances"
      ref={(el) => (sectionRefs.current["appliances"] = el)}
    >
      <h2 className="text-[30px] font-semibold">{data.appliances.title}</h2>
      <p className="text-base font-normal text-gray-600 text-[16px]">
        {data.appliances.note}
      </p>

      {/* Appliance Types */}
      <div className="mt-5">
        {data.appliances.types.map((ele, i) => (
          <OptionCard
            option={ele}
            key={i}
            activeObj={activeAppliances}
            setActiveObj={setActiveAppliances}
          />
        ))}
      </div>

      {/* Appliance Package */}
      <p className="text-xl font-semibold mt-5">{activeAppliances.subtitle}</p>
      <div className="mt-5">
        {activeAppliances.package.map((ele, i) => (
          <AppliancesPackageCard
            key={i}
            option={ele}
            activeObj={activeAppliancesPackage}
            setActiveObj={setActiveAppliancesPackage}
            setActiveCustom={setActiveCustomAppliances}
          />
        ))}
      </div>

      {/* Refrigerator Custom Selection */}
      <p className="text-xl font-semibold mt-5">
        {activeCustomAppliances?.refrigirator?.title || ""}
      </p>
      <div className="mt-5">
        {activeCustomAppliances?.refrigirator?.category.map((ele, i) => (
          <OptionCard
            key={i}
            option={ele}
            activeObj={activeCustomRefrigirator}
            setActiveObj={setActiveRefrigirator}
          />
        ))}
      </div>

      {/* Choose Your Range */}
      <p className="text-xl font-semibold mt-5">
        {activeCustomRefrigirator?.subCategory?.title || ""}
      </p>
      <div className="mt-5">
        {activeCustomRefrigirator?.subCategory?.options.map((ele, i) => (
          <OptionCard
            key={i}
            option={ele}
            activeObj={activeRange}
            setActiveObj={setActiveRange}
          />
        ))}
      </div>

      {/* Dishwasher */}
      <p className="text-xl font-semibold mt-5">
        {data.appliances.dishwasher.title}
      </p>
      <div className="mt-5">
        {data.appliances.dishwasher.package.map((ele, i) => (
          <OptionCard
            key={i}
            option={ele}
            activeObj={activeDishwasher}
            setActiveObj={setActiveDishwasher}
          />
        ))}
      </div>
    </div>
  );
};

export default AppliancesSection;
