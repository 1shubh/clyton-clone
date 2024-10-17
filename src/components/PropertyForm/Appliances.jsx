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
import { ApplicancesTypes } from "./Appliances/ApplicancesTypes";
import { ElectricAppliances } from "./Appliances/ElectricAppliances";

export const AppliancesForm = ({ onSubmit, setIndex }) => {
  const [appliances, setAppliances] = useState({
    title: "Appliances",
    note: "Appliances may vary in style",
    image: "",
    types: [
      {
        title: "Electric only",
        subtitle: "Appliance Package",
        description:
          "All electric homes are easier to permit and have reduced site work costs. All appliances will be electric including stove, oven, dryer, furnace, and water heater.",
        package: [
          {
            title: "Standard",
            image: "",
            price: 0,
          },
          {
            title: "Premium Stainless Steel",
            image: "",
            price: 4050,
          },
          {
            title: "Custom",
            image: "",
            price: 0,
            options: {
              refrigirator: {
                title: "Refrigerator",
                category: [
                  {
                    title: "Standard",
                    // image: ["https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg"],
                    description:
                      "30-inch Wide Top Freezer Refrigerator - 18 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                  {
                    title: "Premium",
                    image: "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                    description:
                      "36-inch Wide Side-by-Side Refrigerator - 24 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        title: "Gas & Electric",
        subtitle: "Appliance Package",
        description:
          "This option will increase your site work costs and may not be allowed in your jurisdiction.",
        package: [
          {
            title: "Standard",
            image: "https://trove.b-cdn.net/images/dcr6u9q33ok.png",
            price: 0,
          },
          {
            title: "Premium Stainless Steel",
            image: "https://trove.b-cdn.net/images/w2jgs33pew.jpeg",
            price: 4050,
          },
          {
            title: "Custom",
            image: "https://trove.b-cdn.net/images/w2jgs33pew.jpeg",
            price: 0,
            options: [
              {
                title: "Refrigerator",
                category: [
                  {
                    title: "Standard",
                    // image: ["https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg"],
                    description:
                      "30-inch Wide Top Freezer Refrigerator - 18 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Gas Range",
                          description:
                            "Whirlpool® 5.1 Cu. Ft. Freestanding 4-Burner Gas Stove",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/s4qqtbhmwwj.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Gas Range",
                          description:
                            "5.0 cu. ft. gas range with SpeedHeat burner",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/qphkrwhhtra.jpeg",
                          ],
                        },
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/s4qqtbhmwwj.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                  {
                    title: "Premium",
                    image: "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                    description:
                      "36-inch Wide Side-by-Side Refrigerator - 24 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Gas Range",
                          description:
                            "Whirlpool® 5.1 Cu. Ft. Freestanding 4-Burner Gas Stove",
                          images: [
                            "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                            "https://trove.b-cdn.net/images/s4qqtbhmwwj.jpeg",
                          ],
                        },
                        {
                          title: "Standard steel Gas Range",
                          description:
                            "5.0 cu. ft. gas range with SpeedHeat burner",
                          images: [
                            "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                            "https://trove.b-cdn.net/images/qphkrwhhtra.jpeg",
                          ],
                        },
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    dishwasher: {
      title: "Dishwasher & Disposal",
      subtitle: "",
      description: "",
      package: [
        {
          title: "Kitchen Sink Disposal",
          price: 0,
          description: "",
        },
        {
          title: "Dishwasher & Sink Disposal",
          price: 0,
          description:
            "Stainless steel 4 cycle dishwasher and kitchen sink disposal",
        },
      ],
    },
  });
  const [typesData, setTypesData] = useState(appliances.types);
  const [currentForm, setCurrentForm] = useState("electricAppliances");
  const [imageUploaded, setImageUploaded] = useState(true);
  const [filePath, setFilePath] = useState("");
  const maxNumber = 1;
  const dispatch = useDispatch();
  const uploadedApplianceImage = useSelector(
    (state) => state.images.uploadAppliancesImage
  );

  useEffect(() => {
    if (uploadedApplianceImage.length > 0) {
      setAppliances((prevProperty) => ({
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
      setAppliances((prev) => ({ ...prev, image: "" }));
      setImageUploaded(false); // Reset the uploaded state
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  return (
    <>
      {imageUploaded ? (
        <div className="flex gap-20">
          <div className="w-[30%]">
            <ImageCard
              url={appliances.image}
              title={"Exterior"}
              deleteImage={deleteImage}
            />
          </div>
          <div className="w-[65%]">
            <ElectricAppliances
              typesData={typesData[0].package} // Pass only the package array of the first type
              setTypesData={(updatedData) => {
                const newTypesData = [...typesData];
                newTypesData[0].package = updatedData; // Update only the package array of the first type
                setTypesData(newTypesData); // Assuming setTypesData is a function that updates the whole state
              }}
              currentForm={currentForm}
              setCurrentForm={setCurrentForm} // Correctly set the current form state
            />

            {/* <ApplicancesTypes
              typesData={typesData}
              setTypesData={setTypesData}
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
            /> */}
          </div>
        </div>
      ) : (
        <div>
          <ImageUploader
            setImageUploaded={setImageUploaded}
            maxNumber={maxNumber}
            setUploadedImage={setUploadAppliancesImage}
            title={"Appliance"}
          />
        </div>
      )}
    </>
  );
};
