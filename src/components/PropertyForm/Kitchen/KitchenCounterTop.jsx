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
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ImageUploader } from "../ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { setUploadedTypeImage } from "../../../Redux/imageSlice"; // Redux action to set the uploaded image
import { ref, deleteObject } from "firebase/storage"; // Import Firebase functions

export const KitchenCounterTop = ({
  currentForm,
  kitchen,
  setKitchen,
  setCurrentForm,
}) => {
  const [isEditing, setIsEditing] = useState({});
  const [counterTopPrices, setCounterTopPrice] = useState({});
  const [imageUploadFlags, setImageUploadFlags] = useState({}); // Tracks image upload status for each option

  // Separate state for new types for each option
  const [newTypes, setNewTypes] = useState(
    kitchen?.counterTopMaterial?.options?.map(() => ({
      name: "",
      image: null,
      price: 0,
      bgImage: null,
    }))
  );
  const uploadedTypeImage = useSelector(
    (state) => state.images.uploadTypeImage
  );

  useEffect(() => {
    if (uploadedTypeImage.length > 0) {
      setNewTypes((prevNewTypes) =>
        prevNewTypes.map((newType, index) => ({
          ...newType,
          bgImage: uploadedTypeImage[0].url, // Update image only for the specific option
        }))
      );
    }
  }, [uploadedTypeImage]);

  const handleBack = () => {
    setCurrentForm("");
  };

  const handleCounterTopSubmit = (e) => {
    e.preventDefault();
    setCurrentForm("flatPanelCabinates");
  };

  const handleCounterTopPriceChange = (i, value) => {
    setCounterTopPrice((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  const handleAddCounterTopPrice = (i) => {
    setKitchen((prevKitchen) => {
      const updatedOptions = prevKitchen.counterTopMaterial.options.map(
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
        ...prevKitchen,
        counterTopMaterial: {
          ...prevKitchen.counterTopMaterial,
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

  // Handle type deletion
  const handleDeleteType = async (optionIndex, typeIndex) => {
    const typeToDelete =
      kitchen.counterTopMaterial.options[optionIndex].types[typeIndex];

    if (typeToDelete.bgImage) {
      await deleteImageFromFirebase(typeToDelete.bgImage);
    }

    setKitchen((prevKitchen) => {
      const updatedOptions = prevKitchen.counterTopMaterial.options.map(
        (option, index) => {
          if (index === optionIndex) {
            return {
              ...option,
              types: option.types.filter((_, tIndex) => tIndex !== typeIndex),
            };
          }
          return option;
        }
      );
      return {
        ...prevKitchen,
        counterTopMaterial: {
          ...prevKitchen.counterTopMaterial,
          options: updatedOptions,
        },
      };
    });
  };

  // Add counter top type
  const handleAddType = async (i) => {
    if (!newTypes[i].name || !newTypes[i].bgImage) {
      alert("Please provide both a name and an image for the type.");
      return;
    }

    setKitchen((prevKitchen) => {
      const updatedOptions = prevKitchen.counterTopMaterial.options.map(
        (option, index) => {
          if (index === i) {
            return {
              ...option,
              types: [...option.types, { ...newTypes[i], price: 0 }],
            };
          }
          return option;
        }
      );

      return {
        ...prevKitchen,
        counterTopMaterial: {
          ...prevKitchen.counterTopMaterial,
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
      className={`${currentForm === "kitchenSidingType" ? "block" : "hidden"}`}
    >
      <div className="mt-5">
        <form onSubmit={handleCounterTopSubmit}>
          <p className="text-xl font-bold text-nowrap">
            Add Kitchen counter top material
          </p>
          <div className="grid gap-2 mt-5">
            {kitchen?.counterTopMaterial?.options?.map((ele, i) => (
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
                    {ele?.types?.length > 0 ? (
                      ele.types.map((type, j) => (
                        <div
                          key={j}
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
                            onClick={() => handleDeleteType(i, j)}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No types available. Add new types below.</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 w-[50%] grid gap-2">
                  <p className="font-semibold">Add More {ele.title} Types</p>
                  {imageUploadFlags[i] ? (
                    <div className="grid gap-2 mt-2">
                      <div>
                        <img src={newTypes[i].bgImage} alt="images" />
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
                      setUploadedImage={setUploadedTypeImage}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-5" type="submit" colorScheme="blue" rightIcon={<GrFormNextLink />}>
            Save and Next
          </Button>
        </form>
      </div>
    </div>
  );
};
