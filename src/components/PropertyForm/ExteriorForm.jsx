import React, { useEffect, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "../../firebase-config/config";
import { setUploadedExteriorImage } from "../../Redux/imageSlice";
import { ImageCard } from "../ImageCard";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";
import { ExteriorBodyColor } from "./Exterior/ExteriorBodyColor";
import { ExteriorAccentColors } from "./Exterior/ExteriorAccentColors";
import { ExteriorTrimColor } from "./Exterior/ExteriorTrimColor";
import { ExteriorDoorPaint } from "./Exterior/ExteriorDoorPaint";
import { ExteriorShinglesMaterial } from "./Exterior/ExteriorShinglesMaterial";
import { ExteriorDoor } from "./Exterior/ExteriorDoor";

export const ExteriorForm = ({ onSubmit,setIndex }) => {
  const [exterior, setExterior] = useState({
    title: "Exterior",
    image: "",
    sidingType: {
      title: "Exterior Siding Type",
      options: [
        {
          title: "Verticle",
          image: "https://trove.b-cdn.net/images/yzq7wyxeaml.png",
          price: 0,
        },
        {
          title: "Horizontal",
          image: "https://trove.b-cdn.net/images/bexuphncbb.png",
          price: 2300,
        },
        {
          title: "Hardboard",
          image: "",
          price: 2500,
        },
        {
          title: "Board & Batten",
          image: "",
          price: 3000,
        },
      ],
    },
    bodyColor: {
      title: "Exterior Body Color",
      options: [
        {
          name: "Foil",
          colorCode: "#c1c3c4",
          image: "",
        },
        {
          name: "Blue Print",
          colorCode: "#58697d",
          image: "",
        },
        {
          name: "Stay Calm",
          colorCode: "#c0bbb1",
          image: "",
        },
      ],
    },
    accentColor: {
      title: "Exterior Accent Color",
      options: [
        {
          name: "Foil",
          colorCode: "#c1c3c4",
          image: "",
        },
        {
          name: "Blue Print",
          colorCode: "#58697d",
          image: "",
        },
        {
          name: "Stay Calm",
          colorCode: "#c0bbb1",
          image: "",
        },
      ],
    },
    trimColor: {
      title: "Exterior Trim Color",
      options: [
        {
          name: "Foil",
          colorCode: "#c1c3c4",
          image: "",
        },
        {
          name: "Blue Print",
          colorCode: "#58697d",
          image: "",
        },
        {
          name: "Stay Calm",
          colorCode: "#c0bbb1",
          image: "",
        },
      ],
    },
    doorPaint: {
      title: "Exterior Door Paint",
      options: [
        {
          name: "White",
          colorCode: "#ffff",
          image: "",
        },
        {
          name: "Iron River",
          colorCode: "#4d504b",
          image: "",
        },
      ],
    },
    shiglesMaterial: {
      title: "Shingles Material",
      options: [
        {
          title: "Standard",
          price: 0,
          image: "",
          subtitle: "Standard Material",
          types: [
            {
              name: "Shasta White",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/sn1d0ooid99.png",
              price: 0,
            },
            {
              name: "Desert Tan",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/nairm0s2rp.png",
              price: 0,
            },
            {
              name: "Amber",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/0yum7q6wu1yp.png",
              price: 0,
            },
          ],
        },
        {
          title: "Architectural",
          price: 400,
          image: "",
          subtitle: "Architectural Shingles",
          types: [
            {
              name: "Sierra Grey",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/dgdotyuqopo.png",
              price: 0,
            },
            {
              name: "Desert Tan",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/x2cm0bywho8.png",
              price: 0,
            },
            {
              name: "Shasta White",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/fm5kn9mkk27.png",
              price: 0,
            },
            {
              name: "Amber",
              image: "",
              bgImage:
                "https://trove.b-cdn.net/images/0yum7q6wu1yp.png?height=160",
              price: 400,
            },
            {
              name: "Onyx Black",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/fgz9vjhqrr.png",
              price: 0,
            },
          ],
        },
      ],
    },
    exteriorDoors: {
      title: "Exterior Door",
      options: [
        {
          title: "Fiberglass",
          image: "https://trove.b-cdn.net/images/ysdqmq8jyir.jpeg",
          price: 0,
        },
        {
          title: "Fiberglass 9 Light",
          image: "https://trove.b-cdn.net/images/noh33cnxsiq.jpeg",
          price: 300,
        },
        {
          title: "Sedona",
          image: "https://trove.b-cdn.net/images/1xpusmaanwq.jpeg",
          price: 1100,
        },
        {
          title: "Sliding Glass",
          image: "https://trove.b-cdn.net/images/x6q56fppmjk.jpeg",
          price: 1000,
        },
        {
          title: "Double French W/Blinds",
          image: "https://trove.b-cdn.net/images/kildpnunj1.jpeg",
          price: 2550,
        },
      ],
    },
  });
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState("");
  const maxNumber = 1;
  const dispatch = useDispatch();
  const uploadedExteriorImage = useSelector(
    (state) => state.images.uploadedExteriorImage
  );
  // Sliding prices
  const [slidingPrices, setSlidingPrices] = useState({}); // To store price inputs
  const [isEditing, setIsEditing] = useState({});
  // setCurrentForm
  const [currentForm, setcurrentForm] = useState("sliding");
  // set uploaded image to exterior image
  useEffect(() => {
    if (uploadedExteriorImage.length > 0) {
      setExterior((prevProperty) => ({
        ...prevProperty,
        image: uploadedExteriorImage[0].url, // Update image in floor plan state
      }));
      setFilePath(uploadedExteriorImage[0].path); // Save the file path for later deletion
    }
  }, [uploadedExteriorImage]);

  //delete image from the server
  const deleteImage = async () => {
    if (!filePath) return;
    const imageRef = ref(storage, filePath);
    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      setExterior((prev) => ({ ...prev, image: "" }));
      setImageUploaded(false); // Reset the uploaded state
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSlidingPriceChange = (i, value) => {
    setSlidingPrices((prev) => ({
      ...prev,
      [i]: value, // Keep the user input as is
    }));
  };
  const handleAddSlidingPrice = (i) => {
    setExterior((prevExterior) => {
      const updatedOptions = prevExterior.sidingType.options.map(
        (option, index) =>
          index === i
            ? {
                ...option,
                price:
                  slidingPrices[i] !== undefined
                    ? parseFloat(slidingPrices[i])
                    : option.price,
              }
            : option
      );
      return {
        ...prevExterior,
        sidingType: {
          ...prevExterior.sidingType,
          options: updatedOptions,
        },
      };
    });

    // Once price is added, change editing state to false
    setIsEditing((prev) => ({
      ...prev,
      [i]: false,
    }));
  };

  // Handle toggling between Add/Edit modes
  const handleToggleEdit = (i) => {
    setIsEditing((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  // console.log(exterior.accentColor.options);
  // end sliding price change

  // handleFormSubmit
  const handleSlidingSubmit = (e) => {
    e.preventDefault();
    setcurrentForm("bodyColor");
  };

  const handleExteriorSubmit = () => {
     onSubmit(exterior)
     setIndex(3)
    //  console.log(exterior)
  }

  return (
    <>
      {imageUploaded ? (
        <div className="flex gap-20">
          <div className="w-[30%]">
            <ImageCard
              url={exterior.image}
              title={"Exterior"}
              deleteImage={deleteImage}
            />
          </div>
          <div className="w-[65%] border px-10 py-10 rounded-xl border-black">
            {/* Sliding Form */}
            <form
              onSubmit={handleSlidingSubmit}
              className={`${currentForm === "sliding" ? "block" : "hidden"}`}
            >
              <p className="text-xl font-bold text-nowrap">Add Siding Types</p>
              <div className="grid gap-2 mt-5">
                {exterior.sidingType.options.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="border bg-green-100 p-5 rounded-xl grid gap-2"
                    >
                      <p className="font-bold text-md">
                        {ele.title} Option Price
                      </p>
                      <div className="flex gap-5 items-center">
                        {isEditing[i] ? (
                          // Input field when editing is true
                          <InputGroup w={"20%"}>
                            <InputLeftElement>
                              <BiSolidDollarCircle fontSize={"30px"} />
                            </InputLeftElement>
                            <Input
                              border={"1px solid black"}
                              placeholder="Price"
                              type="number"
                              value={
                                slidingPrices[i] !== undefined
                                  ? slidingPrices[i]
                                  : ele.price
                              } // Check for slidingPrices[i] explicitly
                              onChange={(e) =>
                                handleSlidingPriceChange(i, e.target.value)
                              }
                            />
                          </InputGroup>
                        ) : (
                          // Text display when not editing
                          <span className="font-bold">{ele.price} $</span>
                        )}
                        <Button
                          colorScheme="yellow"
                          onClick={
                            () =>
                              isEditing[i]
                                ? handleAddSlidingPrice(i) // Add price if in edit mode
                                : handleToggleEdit(i) // Toggle to edit mode
                          }
                        >
                          {isEditing[i] ? "Add" : "Edit"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                className="mt-5"
                type="submit"
                rightIcon={<GrFormNextLink />}
              >
                Save and Next
              </Button>
              {/* <Button className="mt-5" colorScheme="orange" type="submit">
                Submit Sliding Type
              </Button> */}
            </form>
            {/* Exterior Form */}
            <ExteriorBodyColor
              currentForm={currentForm}
              exterior={exterior}
              setExterior={setExterior}
              setCurrnetForm={setcurrentForm}
            />
            <ExteriorAccentColors
              currentForm={currentForm}
              exterior={exterior}
              setExterior={setExterior}
              setCurrnetForm={setcurrentForm}
            />
            <ExteriorTrimColor
              currentForm={currentForm}
              exterior={exterior}
              setExterior={setExterior}
              setCurrnetForm={setcurrentForm}
            />
            <ExteriorDoorPaint
              currentForm={currentForm}
              exterior={exterior}
              setExterior={setExterior}
              setCurrnetForm={setcurrentForm}
            />
            <ExteriorShinglesMaterial
              currentForm={currentForm}
              exterior={exterior}
              setExterior={setExterior}
              setCurrnetForm={setcurrentForm}
            />
            <ExteriorDoor
              currentForm={currentForm}
              exterior={exterior}
              setExterior={setExterior}
              setCurrnetForm={setcurrentForm}
              handleDoorSubmit={handleExteriorSubmit}
            />
          </div>
        </div>
      ) : (
        <div>
          <ImageUploader
            setImageUploaded={setImageUploaded}
            maxNumber={maxNumber}
            setUploadedImage={setUploadedExteriorImage}
            title={"Exterior"}
          />
        </div>
      )}
    </>
  );
};
