import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PropertyDetails } from "./PropertyForm/PropertyDetails";
import { FloorPlan } from "./PropertyForm/FloorPlan";
import { ExteriorForm } from "./PropertyForm/ExteriorForm";
import { KitchenForm } from "./PropertyForm/KitchenForm";
import { BathroomForm } from "./PropertyForm/BathroomForm";
import { InteriorForm } from "./PropertyForm/InteriorForm";
import { FlooringForm } from "./PropertyForm/FlooringForm";
import { AppliancesForm } from "./PropertyForm/Appliances";
import { AdvanceDetailsForm } from "./PropertyForm/AdvanceDetailsForm";

const ProductForm = () => {
  const [data, setData] = useState({
    propertyDetails: {},
    floorPlan: {},
    exterior: {},
    kitchen: {},
    interior: {},
    bathroom: {},
    flooring: {},
    appliances: {},
    advanceDetails: {},
  });
  const [index, setIndex] = useState(0);

  // Define handleFormSubmit function
  const handleFormSubmit = (formName, formData) => {
    setData((prevData) => ({
      ...prevData,
      [formName]: formData,
    }));
  };

  // Define the Forms array inside ProductForm to have access to handleFormSubmit
  const Forms = [
    {
      title: "Property Details",
      form: (
        <PropertyDetails
          onSubmit={(data) => handleFormSubmit("propertyDetails", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Floor Plan",
      form: (
        <FloorPlan
          onSubmit={(data) => handleFormSubmit("floorPlan", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Exterior",
      form: (
        <ExteriorForm
          onSubmit={(data) => handleFormSubmit("exterior", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Kitchen",
      form: (
        <KitchenForm
          onSubmit={(data) => handleFormSubmit("kitchen", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Interior",
      form: (
        <InteriorForm
          onSubmit={(data) => handleFormSubmit("interior", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Bathroom",
      form: (
        <BathroomForm
          onSubmit={(data) => handleFormSubmit("bathroom", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Flooring",
      form: (
        <FlooringForm
          onSubmit={(data) => handleFormSubmit("flooring", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Appliances",
      form: (
        <AppliancesForm
          onSubmit={(data) => handleFormSubmit("appliances", data)}
          setIndex={setIndex}
        />
      ),
    },
    {
      title: "Advance Details",
      form: (
        <AdvanceDetailsForm
          onSubmit={(data) => handleFormSubmit("advanceDetails", data)}
          setIndex={setIndex}
        />
      ),
    },
  ];
  return (
    <Tabs
      // variant="soft-rounded"
      colorScheme="orange"
      index={index} // Use index to control active tab
      onChange={(newIndex) => setIndex(newIndex)} // Update index when tab changes
    >
      <TabList>
        {Forms.map((ele, i) => (
          <Tab key={i}>{ele.title}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {Forms.map((ele, i) => (
          <TabPanel key={i}>{ele.form}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default ProductForm;
