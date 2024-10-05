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
  import {setUploadKitchenFaucet } from "../../../Redux/imageSlice";
  import { getStorage, ref, deleteObject } from "firebase/storage";

export const KitchenFaucets = ({
    currentForm,
    kitchen,
    setKitchen,
    setCurrentForm,
  }) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [filePath, setFilePath] = useState(""); // Store file path for deleting
    const [editingIndex, setEditingIndex] = useState(null); // Track which tile is being edited
    const [editPrice, setEditPrice] = useState("");
    const [newBacksplashTile, setNewBacksplashTile] = useState({
      name: "",
      image: "",
      price: "",
      bgImage: "",
    });
  
    const uploadKitchenFaucet = useSelector(
      (state) => state.images.uploadKitchenFaucetImage
    );
    // console.log(kitchen.backsplashTile)
    // Update image with uploaded image
    useEffect(() => {
      if (
        uploadKitchenFaucet &&
        uploadKitchenFaucet.length > 0
      ) {
        setNewBacksplashTile((prevProperty) => ({
          ...prevProperty,
          bgImage:uploadKitchenFaucet[0].url, // Update image URL
          filePath: uploadKitchenFaucet[0].path, // Store the Firebase Storage file path
        }));
      }
    }, [uploadKitchenFaucet]);
  
    // Handle input changes for new tile fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewBacksplashTile((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Add new backsplash tile
    const handleAddBacksplashTile = (e) => {
      e.preventDefault();
      if (!newBacksplashTile.name || !newBacksplashTile.bgImage || !newBacksplashTile.price) {
        alert("Please fill all fields to add a backsplash tile.");
        return;
      }
  
      setKitchen((prevKitchen) => ({
        ...prevKitchen,
        kitchenFaucets: {
          ...prevKitchen.kitchenFaucets,
          options: [
            ...(prevKitchen.kitchenFaucets?.options || []), // Ensure options is not undefined
            { ...newBacksplashTile, price: parseFloat(newBacksplashTile.price) },
          ],
        },
      }));
  
      // Reset the form after adding
      setNewBacksplashTile({
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
      setEditPrice(kitchen.kitchenFaucets.options[index].price);
    };
  
    // Save edited price
    const handleSavePrice = (index) => {
      setKitchen((prevKitchen) => {
        const updatedOptions = [...prevKitchen.kitchenFaucets.options];
        updatedOptions[index].price = parseFloat(editPrice);
        return {
          ...prevKitchen,
          kitchenFaucets: {
            ...prevKitchen.kitchenFaucets,
            options: updatedOptions,
          },
        };
      });
      setEditingIndex(null); // Exit editing mode
    };
  
    // Delete backsplash tile item and image from Firebase
    const handleDeleteItem = async (index) => {
      const faucetToDelete = kitchen.kitchenFaucets.options[index];
      if (faucetToDelete.filePath) {
        const storage = getStorage();
        const imageRef = ref(storage, faucetToDelete.filePath);
        try {
          await deleteObject(imageRef);
          console.log("Image deleted from Firebase Storage.");
        } catch (error) {
          console.error("Error deleting image from Firebase:", error);
        }
      }
  
      // Remove the tile from options
      setKitchen((prevKitchen) => ({
        ...prevKitchen,
        kitchenFaucets: {
          ...prevKitchen.kitchenFaucets,
          options: prevKitchen.kitchenFaucets.options.filter(
            (_, i) => i !== index
          ),
        },
      }));
    };
  
    const handleBacksplashTileSubmit = () => {
      setCurrentForm("kitchenSink");
    };
    const isFormDisabled = kitchen.kitchenFaucets.options.length < 1;
  return (
    <div
    className={`${currentForm === "kitchenFaucets" ? "block" : "hidden"}`}
  >
    <Button
      leftIcon={<IoMdArrowRoundBack />}
      variant={"outline"}
      onClick={() => setCurrentForm("flooringMaterial")}
    >
      Back to Flooring Material
    </Button>
    <p className="text-xl font-bold text-nowrap my-5">Add Kitchen Faucets</p>
    <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
      {kitchen?.kitchenFaucets?.options?.map((ele, i) => (
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
        <form onSubmit={handleAddBacksplashTile}>
          <div className="w-full grid gap-2">
            <div className="w-full h-[150px] rounded-md">
              <img
                src={newBacksplashTile.bgImage}
                alt="tileimage"
                className="w-full h-full object-contain"
              />
            </div>
            <Input
              type="text"
              name="name"
              placeholder="Tile name"
              value={newBacksplashTile.name}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={newBacksplashTile.price}
              onChange={handleInputChange}
            />
            <Button className="w-full" colorScheme="yellow" type="submit">
              Add Fucet
            </Button>
          </div>
        </form>
      ) : (
        <ImageUploader
          name={"Add Faucet Image"}
          setImageUploaded={setImageUploaded}
          setUploadedImage={setUploadKitchenFaucet}
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
        onClick={handleBacksplashTileSubmit}
      >
        Save and Next
      </Button>
    </div>
  </div>
  )
}
