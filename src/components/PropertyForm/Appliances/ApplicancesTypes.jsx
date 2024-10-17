import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { ImageUploader } from "../ImageUploader";
import { setUploadAppliancesPackageImage } from "../../../Redux/imageSlice";
import { useSelector } from "react-redux";

export const ApplicancesTypes = ({
  typesData,
  setTypesData,
  currentForm,
  setCurrentForm,
}) => {
  const [imageUploadFlags, setImageUploadFlags] = useState({});
  const [newPackage, setnewPackage] = useState(
    typesData?.package?.map(() => ({
      title: "",
      image: "",
      price: 0,
    })) || []
  );


  // Package image
  const uploadedPackageImage = useSelector(
    (state) => state.images.uploadAppliancePackageImage
  );

  useEffect(() => {
    if (uploadedPackageImage && uploadedPackageImage.length > 0) {
      setnewPackage((prevnewPackage) =>
        prevnewPackage.map((newType, index) => ({
          ...newType,
          image: uploadedPackageImage[0]?.url || "", // Safely access the URL
        }))
      );
    }
  }, [uploadedPackageImage]);


  // Handle price change for Premium Stainless Steel
  const handlePriceChange = (event, typeIndex, pkgIndex) => {
    const updatedTypes = [...typesData];
    if (updatedTypes[typeIndex]?.package?.[pkgIndex]) {
      updatedTypes[typeIndex].package[pkgIndex].price = event.target.value;
      setTypesData(updatedTypes);
    }
  };

  const handleAddImage = (i) => {};
  
  // Handle adding new refrigerator category
  const handleAddCategory = (typeIndex, pkgIndex) => {
    const newCategory = {
      title: "New Category",
      description: "New category description",
      price: 0,
      subCategory: {
        title: "Choose your range",
        options: [],
      },
    };

    const updatedTypes = [...typesData];
    if (updatedTypes[typeIndex]?.package?.[pkgIndex]?.options?.refrigerator?.category) {
      updatedTypes[typeIndex].package[pkgIndex].options.refrigerator.category.push(newCategory);
      setTypesData(updatedTypes);
    }
  };

  // Handle image and price update for a category
  const handleCategoryUpdate = (event, typeIndex, pkgIndex, catIndex, field) => {
    const updatedTypes = [...typesData];
    if (updatedTypes[typeIndex]?.package?.[pkgIndex]?.options?.refrigerator?.category?.[catIndex]) {
      updatedTypes[typeIndex].package[pkgIndex].options.refrigerator.category[catIndex][field] = event.target.value;
      setTypesData(updatedTypes);
    }
  };

  return (
    <div className="">
      <p className="text-xl font-bold text-nowrap">Add Appliances Package types</p>
      <div className="border p-5 rounded-xl mt-5">
        {typesData?.map((type, typeIndex) => (
          <div key={typeIndex}>
            <h2 className="font-bold text-xl">{type.title}</h2>
            <h3 className="font-bold">{type.subtitle}</h3>
            <div className="grid gap-2 mt-5">
              {type?.package?.map((pkg, pkgIndex) => (
                <div key={pkgIndex} className="">
                  <h4 className="uppercase font-bold text-md">{pkg.title}</h4>
                  <div className="flex gap-5 items-center border bg-green-100 p-5 rounded-xl">
                    <div className="flex gap-20">
                      {imageUploadFlags[pkgIndex] ? (
                        <div className="grid gap-2 mt-2">
                          <div className="w-[50%]">
                            <img
                              src={newPackage[pkgIndex]?.image || ""}
                              alt="images"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleAddImage(pkgIndex)}
                          >
                            Add Image
                          </Button>
                        </div>
                      ) : (
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
                      )}
                      {pkg.title === "Premium Stainless Steel" ? (
                        <div>
                          <label>Price: </label>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) =>
                              handlePriceChange(e, typeIndex, pkgIndex)
                            }
                          />
                        </div>
                      ) : (
                        <p>Price: ${pkg.price}</p>
                      )}
                    </div>
                  </div>

                  {pkg.title === "Custom" && pkg?.options?.refrigerator && (
                    <div>
                      <h5>{pkg.options.refrigerator.title}</h5>
                      {pkg.options.refrigerator.category?.map((cat, catIndex) => (
                        <div key={catIndex}>
                          <h6>{cat.title}</h6>
                          <p>{cat.description}</p>
                          <label>Price: </label>
                          <input
                            type="number"
                            value={cat.price}
                            onChange={(e) =>
                              handleCategoryUpdate(
                                e,
                                typeIndex,
                                pkgIndex,
                                catIndex,
                                "price"
                              )
                            }
                          />
                          <br />
                          <label>Image URL: </label>
                          <input
                            type="text"
                            value={cat.image}
                            onChange={(e) =>
                              handleCategoryUpdate(
                                e,
                                typeIndex,
                                pkgIndex,
                                catIndex,
                                "image"
                              )
                            }
                          />
                        </div>
                      ))}
                      <button onClick={() => handleAddCategory(typeIndex, pkgIndex)}>
                        Add Category
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
