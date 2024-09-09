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
        />
      ),
    },
    {
      title: "Exterior",
      form: (
        <ExteriorForm
          onSubmit={(data) => handleFormSubmit("exterior", data)}
        />
      ),
    },
    {
      title: "Kitchen",
      form: (
        <KitchenForm
          onSubmit={(data) => handleFormSubmit("kitchen", data)}
        />
      ),
    },
    {
      title: "Interior",
      form: (
        <InteriorForm
          onSubmit={(data) => handleFormSubmit("interior", data)}
        />
      ),
    },
    {
      title: "Bathroom",
      form: (
        <BathroomForm
          onSubmit={(data) => handleFormSubmit("bathroom", data)}
        />
      ),
    },
    {
      title: "Flooring",
      form: (
        <FlooringForm
          onSubmit={(data) => handleFormSubmit("flooring", data)}
        />
      ),
    },
    {
      title: "Appliances",
      form: (
        <AppliancesForm
          onSubmit={(data) => handleFormSubmit("appliances", data)}
        />
      ),
    },
    {
      title: "Advance Details",
      form: (
        <AdvanceDetailsForm
          onSubmit={(data) => handleFormSubmit("advanceDetails", data)}
        />
      ),
    },
  ];

  console.log(data.propertyDetails);

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
