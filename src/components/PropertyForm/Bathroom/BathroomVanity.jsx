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
import { setUploadBathroomImage } from "../../../Redux/imageSlice"; // Assuming an action for vanity images
import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase Storage
import { IoMdArrowRoundBack } from "react-icons/io";
export const BathroomVanity = ({
  currentForm,
  setCurrentForm,
  Bathroom,
  setBathroom,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [newVanityLight, setNewVanityLight] = useState({
    name: "",
    image: "",
    price: "",
  });
  const uploadedVanityImage = useSelector(
    (state) => state.images.UploadBathroomImage // Update this according to your Redux state
  );

  // Update newVanityLight with uploaded image
  useEffect(() => {
    if (uploadedVanityImage && uploadedVanityImage.length > 0) {
      setNewVanityLight((prev) => ({
        ...prev,
        image: uploadedVanityImage[0].url,
        filePath: uploadedVanityImage[0].path,
      }));
    }
  }, [uploadedVanityImage]);

  // Handle input changes for new vanity light fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVanityLight((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new vanity light
  const handleAddVanityLight = (e) => {
    e.preventDefault();
    if (
      !newVanityLight.name ||
      !newVanityLight.image ||
      !newVanityLight.price
    ) {
      alert("Please fill all fields to add a Vanity Light.");
      return;
    }

    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      vanityLighting: {
        ...prevBathroom.vanityLighting,
        options: [
          ...prevBathroom.vanityLighting.options,
          { ...newVanityLight, price: parseFloat(newVanityLight.price) },
        ],
      },
    }));

    // Reset the form after adding
    setNewVanityLight({
      name: "",
      image: "",
      price: "",
    });
    setImageUploaded(false); // Reset image uploader state
  };

  // Handle price editing
  const handleEditPrice = (index) => {
    setEditingIndex(index);
    setEditPrice(Bathroom.vanityLighting.options[index].price);
  };

  // Save edited price
  const handleSavePrice = (index) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.vanityLighting.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return {
        ...prevBathroom,
        vanityLighting: {
          ...prevBathroom.vanityLighting,
          options: updatedOptions,
        },
      };
    });
    setEditingIndex(null); // Exit editing mode
  };

  // Delete vanity light item and image from Firebase
  const handleDeleteItem = async (index) => {
    const lightToDelete = Bathroom.vanityLighting.options[index];
    if (lightToDelete.filePath) {
      const storage = getStorage();
      const imageRef = ref(storage, lightToDelete.filePath);
      try {
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage.");
      } catch (error) {
        console.error("Error deleting image from Firebase:", error);
      }
    }

    // Remove the light from options
    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      vanityLighting: {
        ...prevBathroom.vanityLighting,
        options: prevBathroom.vanityLighting.options.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleVanityLightSubmit = () => {
    setCurrentForm("bathroomHardware"); // Change this to the actual next form
  };

  const isFormDisabled = Bathroom.vanityLighting.options.length < 1;

  return (
    <div className={`${currentForm === "vanityLighting" ? "block" : "hidden"}`}>
      <p className="text-xl font-bold text-nowrap my-5">Add Vanity Lighting</p>
      <Button
        leftIcon={<IoMdArrowRoundBack />}
        variant={"outline"}
        onClick={() => setCurrentForm("mirror")}
      >
        Back to Shower Tile
      </Button>
      <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
        {Bathroom?.vanityLighting?.options?.map((ele, i) => (
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
            <p className="text-xl mt-2">{ele.name}</p>

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

        {/* Add new vanity light form */}
        {imageUploaded ? (
          <form onSubmit={handleAddVanityLight}>
            <div className="w-full grid gap-2">
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={newVanityLight.image}
                  alt="vanityimage"
                  className="w-full h-full object-contain"
                />
              </div>
              <Input
                type="text"
                name="name"
                placeholder="Vanity Light Name"
                value={newVanityLight.name}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={newVanityLight.price}
                onChange={handleInputChange}
              />
              <Button className="w-[50%]" colorScheme="yellow" type="submit">
                Add Light
              </Button>
            </div>
          </form>
        ) : (
          <ImageUploader
            name={"Vanity Light"}
            setImageUploaded={setImageUploaded}
            setUploadedImage={setUploadBathroomImage} // Keep this the same as for the vanity image
            maxNumber={1}
          />
        )}
      </div>

      {/* Save and continue */}
      <div className="flex items-center justify-end">
        <Button
          className="mt-4"
          colorScheme="blue"
          rightIcon={<GrFormNextLink />}
          type="submit"
          isDisabled={isFormDisabled}
          onClick={handleVanityLightSubmit}
        >
          Submit Vanity Lighting
        </Button>
      </div>
    </div>
  );
};
