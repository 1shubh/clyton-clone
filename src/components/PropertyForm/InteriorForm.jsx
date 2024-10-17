import React, { useState } from "react";
import { InteriorDoorHandles } from "./Interior/InteriorDoorHandles";
import { InteriorWindowTreatment } from "./Interior/InteriorWindowTreatment";

export const InteriorForm = ({ onSubmit, setIndex }) => {
  const [interior, setInterior] = useState({
    title: "Interior",
    doorHandles: {
      title: "Interior Door Handles",
      options: [
        {
          name: "Black Round",
          bgImage: "https://trove.b-cdn.net/images/ym9alipcl5.jpeg?height=160",
          price: 0,
          image: "https://trove.b-cdn.net/images/ym9alipcl5.jpeg?height=160",
        },
        {
          name: "Brushed",
          bgImage: "https://trove.b-cdn.net/images/jhpx3820utp.jpeg?height=160",
          price: 0,
          image: "",
        },
      ],
    },
    windowTreatment: {
      title: "Window Treatment",
      options: [
        {
          name: "Factory Build valance",
          bgImage: "https://trove.b-cdn.net/images/399rj0on95w.png",
          price: 0,
          image: "",
        },
        {
          name: "Faux Wood Blinds",
          bgImage: "https://trove.b-cdn.net/images/su1rsuer0ck.png",
          price: 0,
          image: "",
        },
      ],
    },
  });
  const [currentForm, setcurrentForm] = useState("interiorDoorHandles");

  const handleSubmit = () => {
      onSubmit(interior)
      setIndex(5)
  }
  return (
    <div className="">
      {/* Door Hanldes */}
      <InteriorDoorHandles
        Interior={interior}
        setInterior={setInterior}
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
      />
      <InteriorWindowTreatment
        Interior={interior}
        setInterior={setInterior}
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        handleSubmit={handleSubmit}
      />
    
    </div>
  );
};
