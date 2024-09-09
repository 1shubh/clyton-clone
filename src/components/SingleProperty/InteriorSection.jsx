import React from 'react';
import {ImageBox} from '../ImageBox';

const InteriorSection = ({
  data,
  activeInteriorDoorHandles,
  setActiveInteriorDoorHandles,
  activeInteriorWindow,
  setActiveWindow,
  sectionRefs
}) => {
  return (
    <div
      className="mt-5"
      id="interior"
      ref={(el) => (sectionRefs.current["interior"] = el)}
    >
      <h2 className="text-[30px] font-semibold">{data.interior.title}</h2>

      {/* Interior Door Handles */}
      <ImageBox
        title={data.interior.doorHandles.title}
        data={data.interior.doorHandles.options}
        active={activeInteriorDoorHandles}
        setActive={setActiveInteriorDoorHandles}
      />

      {/* Interior Window Treatment */}
      <ImageBox
        title={data.interior.windowTreatment.title}
        data={data.interior.windowTreatment.options}
        active={activeInteriorWindow}
        setActive={setActiveWindow}
      />
    </div>
  );
};

export default InteriorSection;
