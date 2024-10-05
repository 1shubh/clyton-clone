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
  import { setUploadKitchenFlatCabinet } from "../../../Redux/imageSlice";
  import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase Storage
  
  export const FlatPanelCabinates = ({
    currentForm,
    kitchen,
    setKitchen,
    setCurrentForm,
  }) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [filePath, setFilePath] = useState(""); // Store file path for deleting
    const [editingIndex, setEditingIndex] = useState(null); // Track which cabinet is being edited
    const [editPrice, setEditPrice] = useState("");
    const [newCabinate, setNewCabinate] = useState({
      name: "",
      image: "",
      price: "",
      bgImage: "",
    });
  
    const uploadedKitchenFlatCabinetImage = useSelector(
      (state) => state.images.uploadedKitchenFlatCabinet
    );
    // Update newCabinate with uploaded image
    useEffect(() => {
        if (uploadedKitchenFlatCabinetImage && uploadedKitchenFlatCabinetImage.length > 0) {
          setNewCabinate((prevProperty) => ({
            ...prevProperty,
            bgImage: uploadedKitchenFlatCabinetImage[0].url, // Update image URL
            filePath: uploadedKitchenFlatCabinetImage[0].path, // Store the Firebase Storage file path
          }));
        }
      }, [uploadedKitchenFlatCabinetImage]);
      
  
    // Handle input changes for new cabinet fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewCabinate((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Add new cabinet
    const handleAddCabinate = (e) => {
      e.preventDefault();
      if (!newCabinate.name || !newCabinate.bgImage || !newCabinate.price) {
        alert("Please fill all fields to add a cabinet.");
        return;
      }
  
      setKitchen((prevKitchen) => ({
        ...prevKitchen,
        flatPanelCabinets: {
          ...prevKitchen.flatPanelCabinets,
          options: [
            ...prevKitchen.flatPanelCabinets.options,
            { ...newCabinate, price: parseFloat(newCabinate.price) },
          ],
        },
      }));
  
      // Reset the form after adding
      setNewCabinate({
        name: "",
        image: "",
        price: "",
        bgImage:"",
      });
      setImageUploaded(false); // Reset image uploader state
    };
  
    // Handle price editing
    const handleEditPrice = (index) => {
      setEditingIndex(index);
      setEditPrice(kitchen.flatPanelCabinets.options[index].price);
    };
  
    // Save edited price
    const handleSavePrice = (index) => {
      setKitchen((prevKitchen) => {
        const updatedOptions = [...prevKitchen.flatPanelCabinets.options];
        updatedOptions[index].price = parseFloat(editPrice);
        return {
          ...prevKitchen,
          flatPanelCabinets: {
            ...prevKitchen.flatPanelCabinets,
            options: updatedOptions,
          },
        };
      });
      setEditingIndex(null); // Exit editing mode
    };

    // Delete cabinet item and image from Firebase
    const handleDeleteItem = async (index) => {
      const cabinetToDelete = kitchen.flatPanelCabinets.options[index];
      if (cabinetToDelete.filePath) {
        const storage = getStorage();
        const imageRef = ref(storage, cabinetToDelete.filePath);
        try {
          await deleteObject(imageRef);
          console.log("Image deleted from Firebase Storage.");
        } catch (error) {
          console.error("Error deleting image from Firebase:", error);
        }
      }
  
      // Remove the cabinet from options
      setKitchen((prevKitchen) => ({
        ...prevKitchen,
        flatPanelCabinets: {
          ...prevKitchen.flatPanelCabinets,
          options: prevKitchen.flatPanelCabinets.options.filter(
            (_, i) => i !== index
          ),
        },
      }));
    };
  
    const handleFlatCabinetSubmit = () => {
        setCurrentForm("cabinetHardware")
    }
    const isFormDisabled = kitchen.flatPanelCabinets.options.length < 1;
//   console.log(kitchen.flatPanelCabinets)
    return (
      <div className={`${currentForm === "flatPanelCabinates" ? "block" : "hidden"}`}>
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          variant={"outline"}
          onClick={() => setCurrentForm("kitchenSidingType")}
        >
          Back to Kitchen Counter Top Material
        </Button>
  
        <p className="text-xl font-bold text-nowrap my-5">Flat Panel Cabinets</p>
  
        <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
          {kitchen?.flatPanelCabinets?.options?.map((ele, i) => (
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
  
          {/* Add new cabinet form */}
          {imageUploaded ? (
            <form onSubmit={handleAddCabinate}>
              <div className="w-full grid gap-2">
                <div className="w-full h-[150px] rounded-md">
                  <img
                    src={newCabinate.bgImage}
                    alt="doorimage"
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Cabinet name"
                  value={newCabinate.name}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newCabinate.price}
                  onChange={handleInputChange}
                />
                <Button className="w-[50%]" colorScheme="yellow" type="submit">
                  Add Cabinet
                </Button>
              </div>
            </form>
          ) : (
            <ImageUploader
              name={"Flat Panel Cabinet"}
              setImageUploaded={setImageUploaded}
              setUploadedImage={setUploadKitchenFlatCabinet}
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
            onClick={handleFlatCabinetSubmit}
          >
            Save and Next
          </Button>
        </div>
      </div>
    );
  };
  