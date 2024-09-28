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
import { setUploadKitchenFlatCabinet, setUploadedKitchenCabinetHardware } from "../../../Redux/imageSlice";
import { getStorage, ref, deleteObject } from "firebase/storage";

export const CabinetHardware = ({
  currentForm,
  kitchen,
  setKitchen,
  setCurrentForm,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState(""); // Store file path for deleting
  const [editingIndex, setEditingIndex] = useState(null); // Track which cabinet is being edited
  const [editPrice, setEditPrice] = useState("");
  const [newCabinetHardware, setnewCabinetHardware] = useState({
    name: "",
    image: "",
    price: "",
    bgImage: "",
  });

  const uploadedKitchenCabinetHardware = useSelector(
    (state) => state.images.uploadedKitchenCabinetHardware
  );
  // Update newCabinetHardware with uploaded image
  useEffect(() => {
    if (
      uploadedKitchenCabinetHardware &&
      uploadedKitchenCabinetHardware.length > 0
    ) {
      setnewCabinetHardware((prevProperty) => ({
        ...prevProperty,
        bgImage: uploadedKitchenCabinetHardware[0].url, // Update image URL
        filePath: uploadedKitchenCabinetHardware[0].path, // Store the Firebase Storage file path
      }));
    }
  }, [uploadedKitchenCabinetHardware]);

  // Handle input changes for new cabinet fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewCabinetHardware((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new cabinet
 // Add new cabinet hardware
const handleAddCabinate = (e) => {
    e.preventDefault();
    if (!newCabinetHardware.name || !newCabinetHardware.bgImage || !newCabinetHardware.price) {
      alert("Please fill all fields to add a cabinet.");
      return;
    }
  
    setKitchen((prevKitchen) => ({
      ...prevKitchen,
      cabinetHardware: {
        ...prevKitchen.cabinetHardware,
        options: [
          ...(prevKitchen.cabinetHardware?.options || []), // Ensure options is not undefined
          { ...newCabinetHardware, price: parseFloat(newCabinetHardware.price) },
        ],
      },
    }));
  
    // Reset the form after adding
    setnewCabinetHardware({
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
    setEditPrice(kitchen.cabinetHardware.options[index].price);
  };

  // Save edited price
  const handleSavePrice = (index) => {
    setKitchen((prevKitchen) => {
      const updatedOptions = [...prevKitchen.cabinetHardware.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return {
        ...prevKitchen,
        cabinetHardware: {
          ...prevKitchen.cabinetHardware,
          options: updatedOptions,
        },
      };
    });
    setEditingIndex(null); // Exit editing mode
  };

  // Delete cabinet item and image from Firebase
  const handleDeleteItem = async (index) => {
    const cabinetToDelete = kitchen.cabinetHardware.options[index];
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
      cabinetHardware: {
        ...prevKitchen.cabinetHardware,
        options: prevKitchen.cabinetHardware.options.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleFlatCabinetSubmit = () => {
    setCurrentForm("tileBacksplash");
  };
  const isFormDisabled = kitchen.cabinetHardware.options.length < 1;
  return (
    <div
      className={`${currentForm === "cabinetHardware" ? "block" : "hidden"}`}
    >
      <Button
          leftIcon={<IoMdArrowRoundBack />}
          variant={"outline"}
          onClick={() => setCurrentForm("flatPanelCabinates")}
        >
          Back to kitchen Flat panel Cabinetes
        </Button>
        <p className="text-xl font-bold text-nowrap my-5">Cabinet Hardware</p>
        <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
          {kitchen?.cabinetHardware?.options?.map((ele, i) => (
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
                    src={newCabinetHardware.bgImage}
                    alt="doorimage"
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Cabinet name"
                  value={newCabinetHardware.name}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newCabinetHardware.price}
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
              setUploadedImage={setUploadedKitchenCabinetHardware}
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
            onClick={handleFlatCabinetSubmit}
          >
            Save Cabinet Hardware
          </Button>
        </div>
    </div>
  );
};
