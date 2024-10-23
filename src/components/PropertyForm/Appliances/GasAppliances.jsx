import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrFormNextLink } from "react-icons/gr";
import { BiSolidDollarCircle } from "react-icons/bi";
import { ImageUploader } from "../ImageUploader";
import {
  setUploadAppliancesPackageImage,
  setUploadCustomImages,
} from "../../../Redux/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImageCard } from "../../ImageCard";
import { ref, deleteObject } from "firebase/storage"; // Import Firebase functions
import { storage } from "../../../firebase-config/config";

export const GasAppliances = ({
  typesData,
  setTypesData,
  currentForm,
  setCurrentForm,
}) => {
  const [isEditing, setIsEditing] = useState({});
  const [filePath, setFilePath] = useState("");
  const [packagePrice, setPackagePrice] = useState({});
  const [customePackagePrice, setCustomePackagePrice] = useState({});
  const [customePackageIsEditing, setCustomPackageEditing] = useState({});
  const [imageUploadFlags, setImageUploadFlags] = useState({});
  const [imageUploadFlags2, setImageUploadFlags2] = useState({});
  const [newPackage, setNewPackage] = useState(
    typesData.map(() => ({
      title: "",
      image: "",
      price: 0,
    }))
  );
  const dispatch = useDispatch();

  const uploadedPackageImage = useSelector(
    (state) => state.images.uploadAppliancePackageImage
  );

  // custome image upload
  const uploadedCustomImage = useSelector(
    (state) => state.images.uploadCustomeImages
  );

  useEffect(() => {
    if (uploadedPackageImage && uploadedPackageImage.length > 0) {
      setNewPackage((prevNewPackage) =>
        prevNewPackage.map((newType, index) => ({
          ...newType,
          image: uploadedPackageImage[0]?.url,
        }))
      );
      setFilePath(uploadedPackageImage[0].path);
    }
  }, [uploadedPackageImage]);

  // Function to delete an image from Firebase storage
  const deleteImageFromFirebase = async (bgImage) => {
    if (bgImage.includes("firebasestorage.googleapis.com")) {
      try {
        const startIndex = bgImage.indexOf("/o/") + 3;
        const endIndex = bgImage.indexOf("?alt=");
        const decodedPath = decodeURIComponent(
          bgImage.substring(startIndex, endIndex)
        );

        const fileRef = ref(storage, decodedPath);

        await deleteObject(fileRef);
        console.log("Image deleted successfully from Firebase.");
      } catch (error) {
        console.error("Error deleting image from Firebase:", error);
      }
    } else {
      console.error("The provided image URL is not a Firebase Storage URL.");
    }
  };

  const handlePriceChange = (event, typeIndex) => {
    const updatedTypes = [...typesData];
    if (updatedTypes[typeIndex]) {
      updatedTypes[typeIndex].price = event.target.value;
      setTypesData(updatedTypes);
    }
  };

  const handleAddImage = (pkgIndex, imageUrl) => {
    const updatedTypes = [...typesData];
    if (updatedTypes[pkgIndex]) {
      updatedTypes[pkgIndex].image = imageUrl; // Add the image URL to the respective package
      setTypesData(updatedTypes);
    }
  };

  const handlePackagePriceChange = (i, value) => {
    setPackagePrice((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  const handleAddPackagePrice = (pkgIndex) => {
    const updatedTypes = [...typesData];
    if (updatedTypes[pkgIndex]) {
      updatedTypes[pkgIndex].price = packagePrice[pkgIndex];
    }
    setTypesData(updatedTypes);

    setIsEditing((prev) => ({
      ...prev,
      [pkgIndex]: false,
    }));
  };

  const handleToggleEdit = (i) => {
    setIsEditing((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  const handleDeleteImage = async (pkgIndex) => {
    const imageToDelete = typesData[pkgIndex]?.image;
    if (imageToDelete) {
      await deleteImageFromFirebase(imageToDelete);
    }
    const updatedTypes = [...typesData];
    if (updatedTypes[pkgIndex]) {
      updatedTypes[pkgIndex].image = ""; // Clear the image URL in typesData
      setTypesData(updatedTypes);
    }
    dispatch(setUploadAppliancesPackageImage(""));
    setNewPackage((prevNewTypes) =>
      prevNewTypes.map((newType, index) =>
        index === pkgIndex
          ? { name: "", image: null, price: 0, bgImage: null }
          : newType
      )
    );
    setImageUploadFlags((prevFlags) => ({
      ...prevFlags,
      [pkgIndex]: false,
    }));
  };

  // Custom package functions here
  const handleToggleCustomeEdit = (i) => {
    setCustomPackageEditing((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  const handleCustomePackagePriceChange = (i, value) => {
    setCustomePackagePrice((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  // Handle adding custom package price
  const handleCustomePriceAdd = (pkgIndex, catIndex) => {
    const updatedTypes = [...typesData];
    if (updatedTypes[pkgIndex]?.options?.refrigirator?.category[catIndex]) {
      updatedTypes[pkgIndex].options.refrigirator.category[catIndex].price =
        customePackagePrice[catIndex];
    }
    setTypesData(updatedTypes);

    setCustomPackageEditing((prev) => ({
      ...prev,
      [catIndex]: false,
    }));
  };

  // Add Image to the images array
  const handleAddCustomeImage = (catIndex, subCatIndex, imageUrl) => {
    const updatedTypes = [...typesData];

    // Locate the correct package that contains the custom options
    const customPackage = updatedTypes.find((pkg) => pkg.title === "Custom");

    if (
      customPackage &&
      customPackage.options?.refrigirator?.category[catIndex]?.subCategory
        ?.options[subCatIndex]
    ) {
      const selectedOption =
        customPackage.options.refrigirator.category[catIndex].subCategory
          .options[subCatIndex];

      // Check if the images array exists, then add the image to the specific subCategory option
      if (Array.isArray(selectedOption.images)) {
        selectedOption.images.push(imageUrl);
      } else {
        // If the images array does not exist, create it with the new image
        selectedOption.images = [imageUrl];
      }
    }

    // Update the typesData with the modified customPackage
    setTypesData(updatedTypes);

    // Reset the flag for the current subCatIndex
    setImageUploadFlags2((prevFlags) => ({
      ...prevFlags,
      [`${catIndex}-${subCatIndex}`]: false, // Clear the flag for this subCategory index
    }));
  };

  const handleDeleteCustomeImage = async (
    catIndex,
    subCatIndex,
    imageIndex
  ) => {
    const updatedTypes = [...typesData];

    // Find the custom package
    const customPackage = updatedTypes.find((pkg) => pkg.title === "Custom");

    if (
      customPackage &&
      customPackage.options?.refrigirator?.category[catIndex]?.subCategory
        ?.options[subCatIndex]?.images
    ) {
      const selectedOption =
        customPackage.options.refrigirator.category[catIndex].subCategory
          .options[subCatIndex];
      const imageToDelete = selectedOption.images[imageIndex];

      // Check if the image URL is from Firebase Storage
      if (imageToDelete.includes("firebasestorage.googleapis.com")) {
        try {
          // Extract the file path from the URL
          const startIndex = imageToDelete.indexOf("/o/") + 3;
          const endIndex = imageToDelete.indexOf("?alt=");
          const decodedPath = decodeURIComponent(
            imageToDelete.substring(startIndex, endIndex)
          );

          const fileRef = ref(storage, decodedPath);

          // Delete the image from Firebase Storage
          await deleteObject(fileRef);
          console.log("Image deleted successfully from Firebase.");
        } catch (error) {
          console.error("Error deleting image from Firebase:", error);
        }
      } else {
        console.error("The provided image URL is not a Firebase Storage URL.");
      }

      // Remove the image from the state
      selectedOption.images.splice(imageIndex, 1); // Remove the image at imageIndex

      // Update the typesData with the modified customPackage
      setTypesData(updatedTypes);
    }
  };
  return (
    <div className={currentForm === "gasAppliances" ? "block" : "hidden"}>
      <p className="text-xl font-bold text-nowrap">Gas Appliances Package</p>
      <div className="border p-5 rounded-xl mt-5">
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          variant={"outline"}
          onClick={() => setCurrentForm("electricAppliances")}
        >
          Back to Electric Appliances
        </Button>
        <h2 className="font-bold text-xl">{typesData.title}</h2>
        <h3 className="font-bold">{typesData.subtitle}</h3>
        <div className="grid gap-2 mt-5">
          {typesData.map((pkg, pkgIndex) => (
            <div key={pkgIndex} className="">
              <h4 className="uppercase font-bold text-md">{pkg.title}</h4>
              <div className="border bg-green-100 p-5 rounded-xl">
                {pkg.image === "" ? (
                  <div className="">
                    {imageUploadFlags[pkgIndex] ? (
                      <div className="grid gap-2 mt-2 w-[200px]">
                        <div className="w-full">
                          <img
                            src={uploadedPackageImage[0]?.url}
                            alt="images"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <Button
                          colorScheme="blue"
                          onClick={() =>
                            handleAddImage(
                              pkgIndex,
                              uploadedPackageImage[0]?.url
                            )
                          }
                        >
                          Add Image
                        </Button>
                      </div>
                    ) : (
                      <div className="w-[200px]">
                        <ImageUploader
                          title={pkg.title}
                          maxNumber={1}
                          setImageUploaded={(flag) =>
                            setImageUploadFlags((prevFlags) => ({
                              ...prevFlags,
                              [pkgIndex]: flag,
                            }))
                          }
                          setUploadedImage={setUploadAppliancesPackageImage}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-[250px]">
                    <ImageCard
                      url={pkg.image}
                      title={""}
                      deleteImage={() => handleDeleteImage(pkgIndex)}
                    />
                  </div>
                )}
                <div className="flex gap-5 items-center bg-green-100 p-5 rounded-xl">
                  {isEditing[pkgIndex] ? (
                    <InputGroup w={"20%"}>
                      <InputLeftElement>
                        <BiSolidDollarCircle fontSize={"30px"} />
                      </InputLeftElement>
                      <Input
                        border={"1px solid black"}
                        placeholder="Price"
                        type="number"
                        value={
                          packagePrice[pkgIndex] !== undefined
                            ? packagePrice[pkgIndex]
                            : pkg.price
                        }
                        onChange={(e) =>
                          handlePackagePriceChange(pkgIndex, e.target.value)
                        }
                      />
                    </InputGroup>
                  ) : (
                    <span className="font-bold">{pkg.price} $</span>
                  )}
                  <Button
                    colorScheme="yellow"
                    onClick={() =>
                      isEditing[pkgIndex]
                        ? handleAddPackagePrice(pkgIndex)
                        : handleToggleEdit(pkgIndex)
                    }
                  >
                    {isEditing[pkgIndex] ? "Add" : "Edit"}
                  </Button>
                </div>
              </div>

              {/* Custom options */}
              {pkg.options && (
                <div className="mt-5">
                  <p>Add Custom Options</p>
                  <h2 className="text-lg font-bold">
                    {pkg.options.refrigirator?.title}
                  </h2>
                  {pkg.options.refrigirator?.category?.map((ele, catIndex) => {
                    return (
                      <>
                        <div
                          key={catIndex}
                          className="bg-slate-300 p-3 mb-5 rounded-lg"
                        >
                          <h3 className="font-bold uppercase">{ele.title}</h3>
                          <div className="flex gap-5 items-center">
                            {customePackageIsEditing[catIndex] ? (
                              <InputGroup w={"20%"}>
                                <InputLeftElement>
                                  <BiSolidDollarCircle fontSize={"30px"} />
                                </InputLeftElement>
                                <Input
                                  border={"1px solid black"}
                                  placeholder="Price"
                                  type="number"
                                  value={
                                    customePackagePrice[catIndex] !== undefined
                                      ? customePackagePrice[catIndex]
                                      : ele.price
                                  }
                                  onChange={(e) =>
                                    handleCustomePackagePriceChange(
                                      catIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </InputGroup>
                            ) : (
                              <span className="font-bold">{ele.price} $</span>
                            )}
                            <Button
                              colorScheme="yellow"
                              onClick={() =>
                                customePackageIsEditing[catIndex]
                                  ? handleCustomePriceAdd(pkgIndex, catIndex)
                                  : handleToggleCustomeEdit(catIndex)
                              }
                            >
                              {customePackageIsEditing[catIndex]
                                ? "Add"
                                : "Edit"}
                            </Button>
                          </div>
                        </div>
                        <div className="p-5 rounded-xl bg-gray-200 shadow-xl mb-10">
                          {ele.subCategory.options.map((sub, subCatIndex) => {
                            return (
                              <div className="mb-5" key={subCatIndex}>
                                <p className="text-xl font-bold text-blue-500">
                                  Add {sub.title} Images
                                </p>
                                <div className="grid grid-cols-4 gap-2 mt-5">
                                  {sub.images.map((image, imageIndex) => {
                                    return (
                                      <div className="" key={imageIndex}>
                                        <ImageCard
                                          url={image}
                                          title={""}
                                          width={"150px"}
                                          height={"150px"}
                                          deleteImage={() =>
                                            handleDeleteCustomeImage(
                                              catIndex,
                                              subCatIndex,
                                              imageIndex
                                            )
                                          }
                                        />
                                      </div>
                                    );
                                  })}
                                  {imageUploadFlags2[
                                    `${catIndex}-${subCatIndex}`
                                  ] ? (
                                    <div className="grid gap-2">
                                      <div className="w-full">
                                        <img
                                          src={uploadedCustomImage[0]?.url}
                                          alt="images"
                                          className="w-full h-full object-contain"
                                        />
                                      </div>
                                      <Button
                                        colorScheme="blue"
                                        onClick={() =>
                                          handleAddCustomeImage(
                                            catIndex,
                                            subCatIndex,
                                            uploadedCustomImage[0]?.url
                                          )
                                        }
                                      >
                                        Add Image
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <ImageUploader
                                        title={pkg.title}
                                        maxNumber={1}
                                        setImageUploaded={(flag) =>
                                          setImageUploadFlags2((prevFlags) => ({
                                            ...prevFlags,
                                            [`${catIndex}-${subCatIndex}`]: flag,
                                          }))
                                        }
                                        setUploadedImage={setUploadCustomImages}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Button
            className="mt-4"
            colorScheme="blue"
            rightIcon={<GrFormNextLink />}
            onClick={() => setCurrentForm("dishwasher")}
          >
            Save Gas Appliances
          </Button>
        </div>
      </div>
    </div>
  );
};
