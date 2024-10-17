import {
  Input,
  Button,
  Text,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { ImageUploader } from "../ImageUploader";
import {
  setUploadBathroomImage,
} from "../../../Redux/imageSlice"; // Redux action for image uploading
import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase Storage

export const ShowerTiles = ({
  currentForm,
  setCurrentForm,
  Bathroom,
  setBathroom,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [newShowerTile, setNewShowerTile] = useState({
    name: "",
    image: "",
    price: "",
  });
  const uploadedShowerTileImage = useSelector(
    (state) => state.images.UploadBathroomImage
  );

  // Update newShowerTile with uploaded image
  useEffect(() => {
    if (uploadedShowerTileImage && uploadedShowerTileImage.length > 0) {
      setNewShowerTile((prev) => ({
        ...prev,
        image: uploadedShowerTileImage[0].url,
        filePath: uploadedShowerTileImage[0].path,
      }));
    }
  }, [uploadedShowerTileImage]);

  // Handle input changes for new shower tile fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShowerTile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new shower tile
  const handleAddShowerTile = (e) => {
    e.preventDefault();
    if (!newShowerTile.name || !newShowerTile.image || !newShowerTile.price) {
      alert("Please fill all fields to add a Shower Tile.");
      return;
    }

    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      showerAndTiles: {
        ...prevBathroom.showerAndTiles,
        options: [
          ...prevBathroom.showerAndTiles.options,
          { ...newShowerTile, price: parseFloat(newShowerTile.price) },
        ],
      },
    }));

    // Reset the form after adding
    setNewShowerTile({
      name: "",
      image: "",
      price: "",
    });
    setImageUploaded(false); // Reset image uploader state
  };

  // Handle price editing
  const handleEditPrice = (index) => {
    setEditingIndex(index);
    setEditPrice(Bathroom.showerAndTiles.options[index].price);
  };

  // Save edited price
  const handleSavePrice = (index) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.showerAndTiles.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return {
        ...prevBathroom,
        showerAndTiles: {
          ...prevBathroom.showerAndTiles,
          options: updatedOptions,
        },
      };
    });
    setEditingIndex(null); // Exit editing mode
  };

  // Delete tile item and image from Firebase
  const handleDeleteItem = async (index) => {
    const tileToDelete = Bathroom.showerAndTiles.options[index];
    if (tileToDelete.filePath) {
      const storage = getStorage();
      const imageRef = ref(storage, tileToDelete.filePath);
      try {
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage.");
      } catch (error) {
        console.error("Error deleting image from Firebase:", error);
      }
    }

    // Remove the tile from options
    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      showerAndTiles: {
        ...prevBathroom.showerAndTiles,
        options: prevBathroom.showerAndTiles.options.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleShowerTileSubmit = () => {
    setCurrentForm("mirror"); // Adjust this to the actual next form
  };

  const isFormDisabled = Bathroom.showerAndTiles.options.length < 1;

  return (
    <div className={`${currentForm === "showerTiles" ? "block" : "hidden"}`}>
      <p className="text-xl font-bold text-nowrap my-5">Add Shower Tiles</p>
      <Button
            leftIcon={<IoMdArrowRoundBack />}
            variant={"outline"}
            onClick={() => setCurrentForm("bathroomTiles")}
          >
            Back to Bathroom Tiles
          </Button>
      <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
        {Bathroom?.showerAndTiles?.options?.map((ele, i) => (
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

        {/* Add new tile form */}
        {imageUploaded ? (
          <form onSubmit={handleAddShowerTile}>
            <div className="w-full grid gap-2">
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={newShowerTile.image}
                  alt="tileimage"
                  className="w-full h-full object-contain"
                />
              </div>
              <Input
                type="text"
                name="name"
                placeholder="Shower Tile Name"
                value={newShowerTile.name}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={newShowerTile.price}
                onChange={handleInputChange}
              />
              <Button className="w-[50%]" colorScheme="yellow" type="submit">
                Add Tile
              </Button>
            </div>
          </form>
        ) : (
          <ImageUploader
            name={"Shower Tile"}
            setImageUploaded={setImageUploaded}
            setUploadedImage={setUploadBathroomImage}
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
          onClick={handleShowerTileSubmit}
        >
          Submit Shower Tiles
        </Button>
      </div>
    </div>
  );
};
