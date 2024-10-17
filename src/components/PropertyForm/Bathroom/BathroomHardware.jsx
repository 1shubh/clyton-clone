import {
  Input,
  Button,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { ImageUploader } from "../ImageUploader";
import { setUploadBathroomImage } from "../../../Redux/imageSlice"; // Action for hardware images
import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase Storage
import { IoMdArrowRoundBack } from "react-icons/io";

export const BathroomHardware = ({
  currentForm,
  setCurrentForm,
  Bathroom,
  setBathroom,
  handleSubmit,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [newHardware, setNewHardware] = useState({
    title: "",
    image: "",
    price: "",
  });

  const uploadedHardwareImage = useSelector(
    (state) => state.images.UploadBathroomImage // Update this according to your Redux state
  );

  // Update newHardware with uploaded image
  useEffect(() => {
    if (uploadedHardwareImage && uploadedHardwareImage.length > 0) {
      setNewHardware((prev) => ({
        ...prev,
        image: uploadedHardwareImage[0].url,
        filePath: uploadedHardwareImage[0].path,
      }));
    }
  }, [uploadedHardwareImage]);

  // Handle input changes for new hardware fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHardware((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new hardware
  const handleAddHardware = (e) => {
    e.preventDefault();
    if (!newHardware.title || !newHardware.image || !newHardware.price) {
      alert("Please fill all fields to add Hardware.");
      return;
    }

    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      hardware: {
        ...prevBathroom.hardware,
        options: [
          ...prevBathroom.hardware.options,
          { ...newHardware, price: parseFloat(newHardware.price) },
        ],
      },
    }));

    // Reset the form after adding
    setNewHardware({
      title: "",
      image: "",
      price: "",
    });
    setImageUploaded(false); // Reset image uploader state
  };

  // Handle price editing
  const handleEditPrice = (index) => {
    setEditingIndex(index);
    setEditPrice(Bathroom.hardware.options[index].price);
  };

  // Save edited price
  const handleSavePrice = (index) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.hardware.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return {
        ...prevBathroom,
        hardware: {
          ...prevBathroom.hardware,
          options: updatedOptions,
        },
      };
    });
    setEditingIndex(null); // Exit editing mode
  };

  // Delete hardware item and image from Firebase
  const handleDeleteItem = async (index) => {
    const hardwareToDelete = Bathroom.hardware.options[index];
    if (hardwareToDelete.filePath) {
      const storage = getStorage();
      const imageRef = ref(storage, hardwareToDelete.filePath);
      try {
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage.");
      } catch (error) {
        console.error("Error deleting image from Firebase:", error);
      }
    }

    // Remove the hardware from options
    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      hardware: {
        ...prevBathroom.hardware,
        options: prevBathroom.hardware.options.filter((_, i) => i !== index),
      },
    }));
  };

  const handleHardwareSubmit = () => {
    handleSubmit();
  };

  const isFormDisabled = Bathroom.hardware.options.length < 1;

  return (
    <div
      className={`${currentForm === "bathroomHardware" ? "block" : "hidden"}`}
    >
      <p className="text-xl font-bold text-nowrap my-5">
        Add Bathroom Hardware
      </p>
      <Button
        leftIcon={<IoMdArrowRoundBack />}
        variant={"outline"}
        onClick={() => setCurrentForm("vanityLighting")}
      >
        Back to Vanity Lighting
      </Button>
      <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
        {Bathroom?.hardware?.options?.map((ele, i) => (
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
            <p className="text-xl mt-2">{ele.title}</p>

            {/* Editing price */}
            {editingIndex === i ? (
              <div className="flex items-center">
                <InputGroup>
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

            {/* Delete button */}
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

        {/* Add new hardware form */}
        {imageUploaded ? (
          <form onSubmit={handleAddHardware}>
            <div className="w-full grid gap-2">
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={newHardware.image}
                  alt="hardwareimage"
                  className="w-full h-full object-contain"
                />
              </div>
              <Input
                type="text"
                name="title"
                placeholder="Hardware Title"
                value={newHardware.title}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={newHardware.price}
                onChange={handleInputChange}
              />
              <Button className="w-[50%]" colorScheme="yellow" type="submit">
                Add Hardware
              </Button>
            </div>
          </form>
        ) : (
          <ImageUploader
            name={"Bathroom Hardware"}
            setImageUploaded={setImageUploaded}
            setUploadedImage={setUploadBathroomImage} // Keep this consistent with the action for hardware images
            maxNumber={1}
          />
        )}
      </div>

      {/* Save and continue */}
      <div className="flex items-center justify-end">
        <Button
          className="mt-4"
          colorScheme="yellow"
          rightIcon={<GrFormNextLink />}
          type="submit"
          isDisabled={isFormDisabled}
          onClick={handleHardwareSubmit}
        >
          Submit Bathroom Details
        </Button>
      </div>
    </div>
  );
};
