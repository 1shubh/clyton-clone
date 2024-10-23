import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from "@chakra-ui/react";
import { PropertyDetails } from "./PropertyForm/PropertyDetails";
import { FloorPlan } from "./PropertyForm/FloorPlan";
import { ExteriorForm } from "./PropertyForm/ExteriorForm";
import { KitchenForm } from "./PropertyForm/KitchenForm";
import { BathroomForm } from "./PropertyForm/BathroomForm";
import { InteriorForm } from "./PropertyForm/InteriorForm";
import { FlooringForm } from "./PropertyForm/FlooringForm";
import { AppliancesForm } from "./PropertyForm/Appliances";
import { AdvanceDetailsForm } from "./PropertyForm/AdvanceDetailsForm";
import { db } from "../firebase-config/config";
import { collection, addDoc } from "firebase/firestore";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Loader } from "./Loader";

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
  const [index, setIndex] = useState(0); // Initial index is 0
  const [loading, setLoading] = useState(false); // Default no loading
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Form submission handler
  const handleFormSubmit = (formName, formData) => {
    setData((prevData) => ({
      ...prevData,
      [formName]: formData,
    }));

    // If advanceDetails form is submitted, trigger data submission
    if (formName === "advanceDetails") {
      setLoading(true); // Start loading
    }
  };

  useEffect(() => {
    const submitData = async () => {
      if (loading && data.advanceDetails) {
        try {
          // Save the data to Firestore
          await addDoc(collection(db, "properties"), data);
          console.log("Data successfully written to Firestore!");

          // Reset index and retain the data
          setIndex(0); // Move back to the first tab (index 0)

          // Reset the data state to clear forms
          setData({
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

          setLoading(false); // Stop loading
          onOpen(); // Open modal for success message

          // Refresh the page after a short delay to allow modal to show
          setTimeout(() => {
            window.location.reload(); // Refresh the page
          }, 1500); // Adjust delay as needed
        } catch (e) {
          console.error("Error adding document: ", e);
          setLoading(false); // Stop loading on error
        }
      }
    };

    submitData();
  }, [loading, data, onOpen]);

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
    <div className="relative">
      <Tabs
        colorScheme="orange"
        index={index} // Controlled tab index
        onChange={(newIndex) => setIndex(newIndex)} // Update index on tab change
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
      {loading && (
        <div className="w-full h-screen absolute ml-0 mr-0 mb-0 mt-0 m-auto">
          <Loader />
        </div>
      )}
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Submission Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Spinner size={"xl"} />
            ) : (
              <p>Property saved successfully!</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductForm;
