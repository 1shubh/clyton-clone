import React from 'react';
import {OptionCard} from '../OptionCard';
import {CheckboxCard} from '../CheckboxCard';

const AdvanceDetailsSection = ({
  data,
  activeCeilingHeight,
  setActiveCeilingHeight,
  activeStructure,
  setActiveStructure,
  activeSideWall,
  setActiveSideWall,
  activeInsulationOption,
  setActiveInsulationOption,
  sectionRefs,
}) => {
  return (
    <div
      className="mt-5"
      id="advance-details"
      ref={(el) => (sectionRefs.current["advance-details"] = el)}
    >
      <h2 className="text-[30px] font-semibold">
        {data.advanceDetails.title}
      </h2>

      {/* Ceiling Height */}
      <div className="mt-5">
        <p className="text-xl font-semibold">
          {data.advanceDetails.celingHeight.title}
        </p>
        <div className="mt-5">
          {data.advanceDetails.celingHeight.options.map((ele, i) => (
            <OptionCard
              option={ele}
              key={i}
              activeObj={activeCeilingHeight}
              setActiveObj={setActiveCeilingHeight}
            />
          ))}
        </div>
      </div>

      {/* Structural Upgrades */}
      <div className="mt-5">
        <p className="text-xl font-semibold">
          {data.advanceDetails.structuralUpgrades.title}
        </p>
        <div className="mt-5">
          {data.advanceDetails.structuralUpgrades.options.map((ele, i) => (
            <CheckboxCard
              option={ele}
              key={i}
              checkPackage={activeStructure}
              setPackage={setActiveStructure}
            />
          ))}
        </div>
      </div>

      {/* Sidewall Dimensions */}
      <div className="mt-5">
        <p className="text-xl font-semibold">
          {data.advanceDetails.sidewallDimenstions.title}
        </p>
        <div className="mt-5">
          {data.advanceDetails.sidewallDimenstions.options.map((ele, i) => (
            <OptionCard
              option={ele}
              key={i}
              activeObj={activeSideWall}
              setActiveObj={setActiveSideWall}
            />
          ))}
        </div>
      </div>

      {/* Insulation Options */}
      <div className="mt-5">
        <p className="text-xl font-semibold">
          {data.advanceDetails.insulationOptions.title}
        </p>
        <div className="mt-5">
          {data.advanceDetails.insulationOptions.options.map((ele, i) => (
            <OptionCard
              option={ele}
              key={i}
              activeObj={activeInsulationOption}
              setActiveObj={setActiveInsulationOption}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvanceDetailsSection;
