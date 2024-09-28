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
  import { setUploadKitchenTileBacksplash } from "../../../Redux/imageSlice"; // Changed action import
  import { getStorage, ref, deleteObject } from "firebase/storage";

export const Tilebackspash = ({
  currentForm,
  kitchen,
  setKitchen,
  setCurrentForm,
}) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [filePath, setFilePath] = useState(""); // Store file path for deleting
    const [editingIndex, setEditingIndex] = useState(null); // Track which tile backsplash is being edited
    const [editPrice, setEditPrice] = useState("");
    const [newTileBacksplash, setNewTileBacksplash] = useState({
      name: "",
      image: "",
      price: "",
      bgImage: "",
    });
  
    const uploadKitchenTileBacksplash = useSelector(
      (state) => state.images.uploadKitchenTileBacksplash // Updated state selector
    );

    // Update newTileBacksplash with uploaded image
    useEffect(() => {
      if (
        uploadKitchenTileBacksplash &&
        uploadKitchenTileBacksplash.length > 0
      ) {
        setNewTileBacksplash((prevProperty) => ({
          ...prevProperty,
          bgImage: uploadKitchenTileBacksplash[0].url, // Update image URL
          filePath: uploadKitchenTileBacksplash[0].path, // Store the Firebase Storage file path
        }));
      }
    }, [uploadKitchenTileBacksplash]);
  
    // Handle input changes for new tile backsplash fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTileBacksplash((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Add new tile backsplash
    const handleAddTileBacksplash = (e) => {
      e.preventDefault();
      if (!newTileBacksplash.name || !newTileBacksplash.bgImage || !newTileBacksplash.price) {
        alert("Please fill all fields to add a tile backsplash.");
        return;
      }
    
      setKitchen((prevKitchen) => ({
        ...prevKitchen,
        tileBacksplash: {
          ...prevKitchen.tileBacksplash,
          options: [
            ...(prevKitchen.tileBacksplash?.options || []), // Ensure options is not undefined
            { ...newTileBacksplash, price: parseFloat(newTileBacksplash.price) },
          ],
        },
      }));
    
      // Reset the form after adding
      setNewTileBacksplash({
        name: "",
        image: "",
        price: "",
        bgImage: "",
      });
      setImageUploaded(false); // Reset image uploader state
    };
  
    // Handle price editing
    const handleEditPrice = (index) => {
      setEditingIndex(index);
      setEditPrice(kitchen.tileBacksplash.options[index].price); // Update to tileBacksplash
    };
  
    // Save edited price
    const handleSavePrice = (index) => {
      setKitchen((prevKitchen) => {
        const updatedOptions = [...prevKitchen.tileBacksplash.options]; // Update to tileBacksplash
        updatedOptions[index].price = parseFloat(editPrice);
        return {
          ...prevKitchen,
          tileBacksplash: {
            ...prevKitchen.tileBacksplash,
            options: updatedOptions,
          },
        };
      });
      setEditingIndex(null); // Exit editing mode
    };
  
    // Delete tile backsplash item and image from Firebase
    const handleDeleteItem = async (index) => {
      const tileToDelete = kitchen.tileBacksplash.options[index]; // Update to tileBacksplash
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
  
      // Remove the tile backsplash from options
      setKitchen((prevKitchen) => ({
        ...prevKitchen,
        tileBacksplash: {
          ...prevKitchen.tileBacksplash,
          options: prevKitchen.tileBacksplash.options.filter(
            (_, i) => i !== index
          ),
        },
      }));
    };
  
    const handleTileBacksplashSubmit = () => {
      setCurrentForm("backsplashTile");
    };
    
    const isFormDisabled = kitchen.tileBacksplash.options.length < 1; // Update to tileBacksplash
  return (
    <div
      className={`${currentForm === "tileBacksplash" ? "block" : "hidden"}`}
    >
      <Button
          leftIcon={<IoMdArrowRoundBack />}
          variant={"outline"}
          onClick={() => setCurrentForm("flatPanelCabinates")}
        >
          Back to kitchen Flat panel Cabinets
        </Button>
        <p className="text-xl font-bold text-nowrap my-5">Tile Backsplash</p>
        <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
          {kitchen?.tileBacksplash?.options?.map((ele, i) => ( // Update to tileBacksplash
            <div
              key={i}
              className="px-2 py-4 font-semibold border border-gray-300 cursor-pointer rounded-md"
            >
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={ele.bgImage}
                  alt="img"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm mt-2">{ele.name}</p>
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
  
          {/* Add new tile backsplash form */}
          {imageUploaded ? (
            <form onSubmit={handleAddTileBacksplash}>
              <div className="w-full grid gap-2">
                <div className="w-full h-[150px] rounded-md">
                  <img
                    src={newTileBacksplash.bgImage}
                    alt="tileimage"
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Tile Backsplash name"
                  value={newTileBacksplash.name}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newTileBacksplash.price}
                  onChange={handleInputChange}
                />
                <Button className="w-[50%]" colorScheme="yellow" type="submit">
                  Add Tile
                </Button>
              </div>
            </form>
          ) : (
            <ImageUploader
              name={"Tile Backsplash"}
              setImageUploaded={setImageUploaded}
              setUploadedImage={setUploadKitchenTileBacksplash} // Updated action dispatcher
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
            onClick={handleTileBacksplashSubmit}
          >
            Save Tile Backsplash
          </Button>
        </div>
    </div>
  );
};
