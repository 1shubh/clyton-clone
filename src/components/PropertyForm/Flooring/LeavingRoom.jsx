import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { storage } from "../../../firebase-config/config";
import { BiSolidDollarCircle } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { ImageUploader } from "../ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  setUploadFlooringMaterialImage,
  setUploadLeavingRoomImage,
} from "../../../Redux/imageSlice"; // Redux action to set the uploaded image
import { ref, deleteObject } from "firebase/storage"; // Import Firebase functions
import { ImageCard } from "../../ImageCard";
import { IoMdArrowRoundBack } from "react-icons/io";

export const LeavingRoom = ({
  currentForm,
  setCurrentForm,
  flooring,
  setFlooring,
}) => {
  const [isEditing, setIsEditing] = useState({});
  const [imageUploaded, setImageUploaded] = useState(true);
  const [imageUploadFlags, setImageUploadFlags] = useState({});
  const [filePath, setFilePath] = useState("");
  const maxNumber = 1;
  const [counterTopPrices, setCounterTopPrice] = useState({});
  const [newTypes, setNewTypes] = useState(
    flooring?.leavingRoomFlooringMaterial?.options?.map(() => ({
      name: "",
      image: null,
      price: 0,
      bgImage: null,
    }))
  );

  const uploadedType = useSelector(
    (state) => state.images.uploadFlooringMaterialImage
  );
  useEffect(() => {
    if (uploadedType && uploadedType.length > 0) {
      setNewTypes((prevNewTypes) =>
        prevNewTypes.map((newType, index) => ({
          ...newType,
          bgImage: uploadedType[0].url, // Update image only for the specific option
        }))
      );
    }
  }, [uploadedType]);

  const uploadedLeavingRoomImage = useSelector(
    (state) => state.images.uploadLeavingRoomImage
  );

  useEffect(() => {
    if (uploadedLeavingRoomImage && uploadedLeavingRoomImage.length > 0) {
      // Update the flooring object with the new image URL
      setFlooring((prevFlooring) => ({
        ...prevFlooring,
        leavingRoomFlooringMaterial: {
          ...prevFlooring.leavingRoomFlooringMaterial,
          image: uploadedLeavingRoomImage[0].url,
        },
      }));
      setFilePath(uploadedLeavingRoomImage[0].path);
    }
  }, [uploadedLeavingRoomImage]);

  const handleBack = () => {
    setCurrentForm("");
  };

  const handleCounterTopSubmit = (e) => {
    e.preventDefault();
    setCurrentForm("bedroomFlooringMaterial"); // Change this to your next form
  };

  const handleCounterTopPriceChange = (i, value) => {
    setCounterTopPrice((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  const handleAddCounterTopPrice = (i) => {
    setFlooring((prevFlooring) => {
      const updatedOptions = prevFlooring.leavingRoomFlooringMaterial.options.map(
        (option, index) =>
          index === i
            ? {
                ...option,
                price:
                  counterTopPrices[i] !== undefined
                    ? parseFloat(counterTopPrices[i])
                    : option.price,
              }
            : option
      );
      return {
        ...prevFlooring,
        leavingRoomFlooringMaterial: {
          ...prevFlooring.leavingRoomFlooringMaterial,
          options: updatedOptions,
        },
      };
    });

    setIsEditing((prev) => ({
      ...prev,
      [i]: false,
    }));
  };

  const handleToggleEdit = (i) => {
    setIsEditing((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  // Function to delete an image from Firebase storage
  const deleteImageFromFirebase = async (bgImage) => {
    if (bgImage.includes("firebasestorage.googleapis.com")) {
      const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
      const startIndex = bgImage.indexOf(baseUrl) + baseUrl.length;
      const [bucketPath, rest] = bgImage.substring(startIndex).split("/o/");
      const decodedPath = decodeURIComponent(rest.split("?")[0]); // Decode the file path
      const fileRef = ref(storage, decodedPath);
      try {
        await deleteObject(fileRef);
        console.log("Image deleted successfully from Firebase.");
      } catch (error) {
        console.error("Error deleting image from Firebase:", error);
      }
    }
  };

  const handleDeleteType = async (optionIndex, typeIndex) => {
    const typeToDelete =
      flooring.leavingRoomFlooringMaterial.options[optionIndex].subOptions[
        typeIndex
      ];

    if (typeToDelete.bgImage) {
      await deleteImageFromFirebase(typeToDelete.bgImage);
    }

    setFlooring((prevFlooring) => {
      const updatedOptions = prevFlooring.leavingRoomFlooringMaterial.options.map(
        (option, index) => {
          if (index === optionIndex) {
            return {
              ...option,
              subOptions: option.subOptions.filter(
                (_, tIndex) => tIndex !== typeIndex
              ),
            };
          }
          return option;
        }
      );
      return {
        ...prevFlooring,
        leavingRoomFlooringMaterial: {
          ...prevFlooring.leavingRoomFlooringMaterial,
          options: updatedOptions,
        },
      };
    });
  };

  const handleDeleteImage = async () => {
    console.log("Deleting image at path:", filePath); // Log the file path
    const imageRef = ref(storage, filePath);
    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      setFlooring((prev) => ({
        ...prev,
        leavingRoomFlooringMaterial: {
          ...prev.leavingRoomFlooringMaterial,
          image: "", // Ensure this is correct
        },
      }));
      setImageUploaded(false); // Reset the uploaded state
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleAddType = async (i) => {
    if (!newTypes[i].name || !newTypes[i].bgImage) {
      alert("Please provide both a name and an image for the type.");
      return;
    }

    setFlooring((prevFlooring) => {
      const updatedOptions = prevFlooring.leavingRoomFlooringMaterial.options.map(
        (option, index) => {
          if (index === i) {
            return {
              ...option,
              subOptions: [...option.subOptions, { ...newTypes[i], price: 0 }],
            };
          }
          return option;
        }
      );

      return {
        ...prevFlooring,
        leavingRoomFlooringMaterial: {
          ...prevFlooring.leavingRoomFlooringMaterial,
          options: updatedOptions,
        },
      };
    });

    // Reset the newType for this specific option
    setNewTypes((prevNewTypes) =>
      prevNewTypes.map((newType, index) =>
        index === i
          ? { name: "", image: null, price: 0, bgImage: null }
          : newType
      )
    );
    setImageUploadFlags((prevFlags) => ({
      ...prevFlags,
      [i]: false, // Reset image upload flag for this specific option
    }));
  };

  return (
    <div
      className={`${
        currentForm === "leavingRoomFlooringMaterial" ? "block" : "hidden"
      }`}
    >
      <Button
        leftIcon={<IoMdArrowRoundBack />}
        variant={"outline"}
        onClick={() => setCurrentForm("kitchenFlooring")}
      >
        Back to Kitchen Flooring Material
      </Button>
      <div className="flex gap-20 mt-5">
        <div className="w-[45%]">
          {/* Upload living room image here */}
          {imageUploaded ? (
            <div className="w-[80%] m-auto">
              <ImageCard
                url={flooring?.leavingRoomFlooringMaterial?.image}
                title={"Living Room Flooring Material"}
                deleteImage={handleDeleteImage}
              />
            </div>
          ) : (
            <ImageUploader
              title={"Living Room Flooring"}
              setImageUploaded={setImageUploaded}
              setUploadedImage={setUploadLeavingRoomImage}
              maxNumber={maxNumber}
            />
          )}
        </div>
        <div className="w-[50%]">
          <form onSubmit={handleCounterTopSubmit}>
            <p className="text-xl font-bold text-nowrap">
              Add living room flooring material
            </p>
            <div className="grid gap-2 mt-5">
              {flooring?.leavingRoomFlooringMaterial?.options?.map((ele, i) => (
                <div key={i} className="border rounded-xl p-5">
                  <p className="font-bold text-md">{ele.title} Option Price</p>
                  <div className="flex gap-5 items-center border bg-green-100 p-5 rounded-xl">
                    {isEditing[i] ? (
                      <InputGroup w={"20%"}>
                        <InputLeftElement>
                          <BiSolidDollarCircle fontSize={"30px"} />
                        </InputLeftElement>
                        <Input
                          border={"1px solid black"}
                          placeholder="Price"
                          type="number"
                          value={
                            counterTopPrices[i] !== undefined
                              ? counterTopPrices[i]
                              : ele.price
                          }
                          onChange={(e) =>
                            handleCounterTopPriceChange(i, e.target.value)
                          }
                        />
                      </InputGroup>
                    ) : (
                      <span className="font-bold">{ele.price} $</span>
                    )}
                    <Button
                      colorScheme="yellow"
                      onClick={() =>
                        isEditing[i]
                          ? handleAddCounterTopPrice(i)
                          : handleToggleEdit(i)
                      }
                    >
                      {isEditing[i] ? "Add" : "Edit"}
                    </Button>
                  </div>

                  <div className="mt-5">
                    <p className="font-bold">{ele.title} Types</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {ele.subOptions?.map((type, tIndex) => (
                        <div
                          key={tIndex}
                          className="border p-2 rounded-md bg-white shadow-md"
                        >
                          <img
                            src={type.bgImage}
                            alt={type.name}
                            className="w-[150px] h-[150px] object-cover rounded-t-md"
                          />
                          <p className="font-semibold text-sm my-2">
                            {type.name}
                          </p>
                          <IconButton
                            icon={<MdDelete />}
                            colorScheme="red"
                            onClick={() => handleDeleteType(i, tIndex)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <p className="font-semibold">
                        Add More {ele.title} Types
                      </p>
                      {imageUploadFlags[i] ? (
                        <div className="grid gap-2 mt-2">
                          <div className="w-[50%]">
                            <img
                              src={newTypes[i].bgImage}
                              alt="images"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <Input
                            placeholder="Type Name"
                            value={newTypes[i].name}
                            onChange={(e) =>
                              setNewTypes((prevNewTypes) =>
                                prevNewTypes.map((newType, index) =>
                                  index === i
                                    ? { ...newType, name: e.target.value }
                                    : newType
                                )
                              )
                            }
                          />
                          <Button
                            colorScheme="blue"
                            onClick={() => handleAddType(i)}
                          >
                            Add Type
                          </Button>
                        </div>
                      ) : (
                        <ImageUploader
                          title={"Type"}
                          maxNumber={1}
                          setImageUploaded={(flag) =>
                            setImageUploadFlags((prevFlags) => ({
                              ...prevFlags,
                              [i]: flag,
                            }))
                          }
                          setUploadedImage={setUploadFlooringMaterialImage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-5"
              type="submit"
              colorScheme="blue"
              isDisabled={imageUploaded === false}
              rightIcon={<GrFormNextLink />}
            >
              {imageUploaded === false
                ? "Please Upload Main Image"
                : "Save and Next"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
