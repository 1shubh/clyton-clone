import React, { useEffect, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase-config/config";
import { setUploadAppliancesImage } from "../../Redux/imageSlice";
import { ImageCard } from "../ImageCard";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";
import { CielingHeight } from "./AdvanceDetails/CielingHeight";
import { StructuralUpgrades } from "./AdvanceDetails/StructuralUpgrades";
import { SidewallDimensions } from "./AdvanceDetails/SidewallDimensions";
import { InsulationOptions } from "./AdvanceDetails/InsulationOptions";

export const AdvanceDetailsForm = ({ onSubmit, setIndex }) => {
  const [advanceDetails, setAdvanceDetails] = useState({
    title: "Advance Details",
    image: "",
    celingHeight: {
      title: "Celing Height",
      options: [
        {
          title: "8' Flat",
          price: 0,
        },
        {
          title: "9' Flat",
          price: 2050,
        },
      ],
    },
    structuralUpgrades: {
      title: "Structural Upgrades",
      options: [
        {
          title: "Fire Sprinklers",
          price: 4050,
          description: "",
        },
        {
          title: "Reverse Hitch",
          price: 0,
          description:
            "This upgrade is sometimes needed for the delivery of the home. Talk to your builder before selecting this upgrade.",
        },
      ],
    },
    sidewallDimensions: {
      title: "Sidewall Dimensions",
      options: [
        {
          title: "Standard",
          price: 0,
        },
        {
          title: `2" X 6" - 90" Sidewalls`,
          price: 1100,
        },
        {
          title: `2" X 6" - 96" Sidewalls`,
          price: 700,
        },
        {
          title: `2" X 6" - 108" Sidewalls`,
          price: 700,
        },
      ],
    },
    insulationOptions: {
      title: "Insulation Options",
      options: [
        {
          title: "Standard",
          price: 0,
        },
        {
          title: "Insulation R33",
          price: 0,
        },
      ],
    },
  });
  const [currentForm, setCurrentForm] = useState("cielingHeight");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState("");
  const maxNumber = 1;
  const dispatch = useDispatch();
  const uploadedApplianceImage = useSelector(
    (state) => state.images.uploadAppliancesImage
  );

  useEffect(() => {
    if (uploadedApplianceImage.length > 0) {
      setAdvanceDetails((prevProperty) => ({
        ...prevProperty,
        image: uploadedApplianceImage[0].url, // Update image in floor plan state
      }));
      setFilePath(uploadedApplianceImage[0].path); // Save the file path for later deletion
    }
  }, [uploadedApplianceImage]);

  //delete image from the server
  const deleteImage = async () => {
    if (!filePath) return;
    const imageRef = ref(storage, filePath);
    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      setAdvanceDetails((prev) => ({ ...prev, image: "" }));
      setImageUploaded(false); // Reset the uploaded state
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleApplianceSubmit = () => {
    onSubmit(advanceDetails);
  };
  return (
    <>
      {imageUploaded ? (
        <div className="flex gap-20">
          <div className="w-[30%]">
            <ImageCard
              url={advanceDetails.image}
              title={"Exterior"}
              deleteImage={deleteImage}
            />
          </div>
          <div className="w-[65%]">
            <CielingHeight
              data={advanceDetails}
              setData={setAdvanceDetails}
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
            />
            <StructuralUpgrades
              data={advanceDetails}
              setData={setAdvanceDetails}
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
            />
            <SidewallDimensions
              data={advanceDetails}
              setData={setAdvanceDetails}
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
            />
            <InsulationOptions
              data={advanceDetails}
              setData={setAdvanceDetails}
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
              handleSubmit={handleApplianceSubmit}
            />
          </div>
        </div>
      ) : (
        <div>
          <ImageUploader
            setImageUploaded={setImageUploaded}
            maxNumber={1}
            setUploadedImage={setUploadAppliancesImage}
            title={"Floor Plan for Advance Details"}
          />
        </div>
      )}
    </>
  );
};
