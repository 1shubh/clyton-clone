import {
  Input,
  Button,
  Text,
  IconButton,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { ImageUploader } from "../ImageUploader";
import { setUploadExteriorDoorImage } from "../../../Redux/imageSlice";
import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase Storage

export const ExteriorDoor = ({
  currentForm,
  exterior,
  setExterior,
  setCurrnetForm,
  handleDoorSubmit,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState(""); // Store file path for deleting

  // New door state
  const [newDoor, setNewDoor] = useState({
    title: "",
    image: "",
    price: "",
    filePath: "", // Add filePath for tracking image in Firebase Storage
  });

  // Track which door is being edited
  const [editingIndex, setEditingIndex] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  const uploadedDoorImage = useSelector(
    (state) => state.images.uploadExteriorDoorImage
  );

  useEffect(() => {
    if (uploadedDoorImage.length > 0) {
      setNewDoor((prevProperty) => ({
        ...prevProperty,
        image: uploadedDoorImage[0].url, // Update image URL
        filePath: uploadedDoorImage[0].path, // Store the Firebase Storage file path
      }));
    }
  }, [uploadedDoorImage]);

  // Handle form input changes for new door
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add new door to the options list
  const handleAddDoor = (e) => {
    e.preventDefault();

    if (!newDoor.title || !newDoor.image || !newDoor.price) {
      alert("Please fill all the fields to add a door.");
      return;
    }

    setExterior((prevExterior) => ({
      ...prevExterior,
      exteriorDoors: {
        ...prevExterior.exteriorDoors,
        options: [
          ...prevExterior.exteriorDoors.options,
          { ...newDoor, price: parseFloat(newDoor.price) },
        ],
      },
    }));

    setNewDoor({
      title: "",
      image: "",
      price: "",
      filePath: "", // Reset after adding
    });
    setImageUploaded(false); // Reset image uploader state
  };

  // Edit the price of the door
  const handleEditPrice = (index) => {
    setEditingIndex(index);
    setEditPrice(exterior.exteriorDoors.options[index].price);
  };

  // Save the updated price
  const handleSavePrice = (index) => {
    setExterior((prevExterior) => {
      const updatedOptions = [...prevExterior.exteriorDoors.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return {
        ...prevExterior,
        exteriorDoors: {
          ...prevExterior.exteriorDoors,
          options: updatedOptions,
        },
      };
    });
    setEditingIndex(null);
  };

  // Delete door item and image from Firebase Storage
  const handleDeleteItem = async (index) => {
    const doorToDelete = exterior.exteriorDoors.options[index];

    // Check if there is a file path to delete from Firebase Storage
    if (doorToDelete.filePath) {
      const storage = getStorage();
      const imageRef = ref(storage, doorToDelete.filePath);

      try {
        // Delete the image from Firebase Storage
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage.");
      } catch (error) {
        console.error("Error deleting image from Firebase Storage:", error);
      }
    }

    // Delete the door item from the list
    setExterior((prevExterior) => ({
      ...prevExterior,
      exteriorDoors: {
        ...prevExterior.exteriorDoors,
        options: prevExterior.exteriorDoors.options.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const isFormDisabled = exterior.bodyColor.options.length < 1;

  return (
    <div className={`${currentForm === "exteriorDoors" ? "block" : "hidden"}`}>
      <Button
        leftIcon={<IoMdArrowRoundBack />}
        variant={"outline"}
        onClick={() => setCurrnetForm("exteriorShinglesMaterial")}
      >
        Back to Exterior Slidings Types
      </Button>

      <p className="text-xl font-bold text-nowrap my-5">
        {exterior.exteriorDoors.title}
      </p>

      <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
        {exterior.exteriorDoors.options.map((ele, i) => (
          <div
            key={i}
            className="px-2 py-4 font-semibold border border-gray-300 cursor-pointer rounded-md"
          >
            <div className="w-full h-[150px] rounded-md">
              <img
                src={ele.image}
                alt="img"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm mt-2">{ele.title}</p>

            {/* Show input if editing this door's price */}
            {editingIndex === i ? (
              <div className="flex items-center">
                <InputGroup display={"flex"} placeItems={"center"}>
                  <InputLeftElement h={"full"}>
                    <BiSolidDollarCircle fontSize={"25px"} />
                  </InputLeftElement>
                  <Input
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    size="sm"
                  />
                </InputGroup>

                <Button
                  colorScheme="blue"
                  size="sm"
                  ml={2}
                  onClick={() => handleSavePrice(i)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm mt-2 font-bold">$ {ele.price}</p>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={() => handleEditPrice(i)}
                >
                  Edit Price
                </Button>
              </div>
            )}

            <div className="flex items-center">
              <IconButton
                colorScheme="orange"
                className="mt-1"
                icon={<MdDelete />}
                onClick={() => handleDeleteItem(i)}
              />
            </div>
          </div>
        ))}
        {imageUploaded ? (
          <form onSubmit={handleAddDoor}>
            <div className="w-full grid gap-2">
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={newDoor.image}
                  alt="doorimage"
                  className="w-full h-full object-contain"
                />
              </div>
              <Input
                type="text"
                name="title"
                placeholder="Door name"
                value={newDoor.title}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={newDoor.price}
                onChange={handleInputChange}
              />
              <Button className="w-[50%]" colorScheme="yellow" type="submit">
                Add Door
              </Button>
            </div>
            {isFormDisabled && (
              <Text color="red.500" mt={2}>
                Please add at least one Door.
              </Text>
            )}
          </form>
        ) : (
          <ImageUploader
            title={"Exterior Door"}
            setImageUploaded={setImageUploaded}
            setUploadedImage={setUploadExteriorDoorImage}
            maxNumber={1}
          />
        )}
      </div>

      <div className="flex items-center justify-end">
        <Button
          className="mt-4"
          colorScheme="blue"
          rightIcon={<GrFormNextLink />}
          type="submit"
          isDisabled={isFormDisabled}
          onClick={handleDoorSubmit}
        >
          Save Exterior Details
        </Button>
      </div>
    </div>
  );
};
