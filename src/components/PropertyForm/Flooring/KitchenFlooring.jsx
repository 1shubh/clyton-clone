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
import {
  setUploadFlooringMaterialImage,
  setUploadKitchenFlooringImage,
} from "../../../Redux/imageSlice"; // Redux action to set the uploaded image
import { ref, deleteObject } from "firebase/storage"; // Import Firebase functions
import { ImageCard } from "../../ImageCard";

export const KitchenFlooring = ({
  currentForm,
  setCurrentForm,
  flooring,
  setFlooring,
}) => {
  const [isEditing, setIsEditing] = useState({});
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState("");
  const maxNumber = 1;
  const [counterTopPrices, setCounterTopPrice] = useState({});
  const [imageUploadFlags, setImageUploadFlags] = useState({});
  const [newTypes, setNewTypes] = useState(
    flooring?.kitchenflooringMaterial?.options?.map(() => ({
      name: "",
      image: null,
      price: 0,
      bgImage: null,
    }))
  );

  const uploadedTypeImage = useSelector(
    (state) => state.images.uploadFlooringMaterialImage
  );

  //   uploaded kitchen image
  const uploadedKitchenImage = useSelector(
    (state) => state.images.uploadKitchenFlooringImage
  );
  //   upload kitchen flooring image
  useEffect(() => {
    if (uploadedKitchenImage && uploadedKitchenImage.length > 0) {
      // Update the flooring object with the new image URL
      setFlooring((prevFlooring) => ({
        ...prevFlooring,
        kitchenflooringMaterial: {
          ...prevFlooring.kitchenflooringMaterial,
          image: uploadedKitchenImage[0].url, // Assign the uploaded image URL
        },
      }));
      setFilePath(uploadedKitchenImage[0].path);
    }
  }, [uploadedKitchenImage]);

  useEffect(() => {
    if (uploadedTypeImage && uploadedTypeImage.length > 0) {
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
    setCurrentForm("leavingRoomFlooringMaterial");
  };

  const handleCounterTopPriceChange = (i, value) => {
    setCounterTopPrice((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  const handleAddCounterTopPrice = (i) => {
    setFlooring((prevflooring) => {
      const updatedOptions = prevflooring.kitchenflooringMaterial.options.map(
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
        ...prevflooring,
        kitchenflooringMaterial: {
          ...prevflooring.kitchenflooringMaterial,
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
      flooring.kitchenflooringMaterial.options[optionIndex].options[typeIndex];

    if (typeToDelete.bgImage) {
      await deleteImageFromFirebase(typeToDelete.bgImage);
    }

    setFlooring((prevflooring) => {
      const updatedOptions = prevflooring.kitchenflooringMaterial.options.map(
        (option, index) => {
          if (index === optionIndex) {
            return {
              ...option,
              options: option.options.filter(
                (_, tIndex) => tIndex !== typeIndex
              ),
            };
          }
          return option;
        }
      );
      return {
        ...prevflooring,
        kitchenflooringMaterial: {
          ...prevflooring.kitchenflooringMaterial,
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
        kitchenflooringMaterial: {
          ...prev.kitchenflooringMaterial,
          image: "", // Ensure this is correct
        },
      }));
      setImageUploaded(false); // Reset the uploaded state
      //   alert("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
      //   alert("Error deleting image. Please try again.");
    }
  };

  // Add counter top type
  const handleAddType = async (i) => {
    if (!newTypes[i].name || !newTypes[i].bgImage) {
      alert("Please provide both a name and an image for the type.");
      return;
    }

    setFlooring((prevflooring) => {
      const updatedOptions = prevflooring.kitchenflooringMaterial.options.map(
        (option, index) => {
          if (index === i) {
            return {
              ...option,
              options: [...option.options, { ...newTypes[i], price: 0 }],
            };
          }
          return option;
        }
      );

      return {
        ...prevflooring,
        kitchenflooringMaterial: {
          ...prevflooring.kitchenflooringMaterial,
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
        currentForm === "kitchenFlooring" ? "flex gap-20" : "hidden"
      }`}
    >
      <div className="w-[45%]">
        {/* upload kitchen image here */}
        {imageUploaded ? (
          <div className="w-[80%] m-auto">
            <ImageCard
              url={flooring?.kitchenflooringMaterial?.image}
              title={"Kitchen Flooring Material"}
              deleteImage={handleDeleteImage}
            />
          </div>
        ) : (
          <ImageUploader
            title={"Kitchen Flooring"}
            setImageUploaded={setImageUploaded}
            setUploadedImage={setUploadKitchenFlooringImage}
            maxNumber={maxNumber}
          />
        )}
      </div>
      <div className="w-[50%]">
        <form onSubmit={handleCounterTopSubmit}>
          <p className="text-xl font-bold text-nowrap">
            Add Kitchen Flooring Material
          </p>
          <div className="grid gap-2 mt-5">
            {flooring?.kitchenflooringMaterial?.options?.map((ele, i) => (
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
                    {ele?.options?.length > 0 ? (
                      ele.options.map((type, j) => (
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

                <div className="mt-5 w-[30%] grid gap-2">
                  <p className="font-semibold">Add More {ele.title} Types</p>
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
  );
};
