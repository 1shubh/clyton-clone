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
import { setUploadBathroomImage } from "../../../Redux/imageSlice";
import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase Storage

export const BathroomType = ({
  currentForm,
  setCurrentForm,
  Bathroom,
  setBathroom,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState(""); // Store file path for deleting
  const [editingIndex, setEditingIndex] = useState(null); // Track which cabinet is being edited
  const [editPrice, setEditPrice] = useState("");
  const [newBathroomType, setnewBathroomType] = useState({
    title: "",
    image: "",
    price: "",
  });
  const uploadedBathroomImage = useSelector(
    (state) => state.images.UploadBathroomImage
  );
  // Update newBathroomType with uploaded image
  useEffect(() => {
    if (uploadedBathroomImage && uploadedBathroomImage.length > 0) {
      setnewBathroomType((prevProperty) => ({
        ...prevProperty,
        image: uploadedBathroomImage[0].url,
        filePath: uploadedBathroomImage[0].path, // Store the Firebase Storage file path
      }));
    }
  }, [uploadedBathroomImage]);

  // Handle input changes for new cabinet fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewBathroomType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new cabinet
  const handleAddBathroomType = (e) => {
    e.preventDefault();
    if (
      !newBathroomType.title ||
      !newBathroomType.image ||
      !newBathroomType.price
    ) {
      alert("Please fill all fields to add a Bathroom Type.");
      return;
    }

    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      bathroomType: {
        ...prevBathroom.bathroomType,
        options: [
          ...prevBathroom.bathroomType.options,
          { ...newBathroomType, price: parseFloat(newBathroomType.price) },
        ],
      },
    }));

    // Reset the form after adding
    setnewBathroomType({
      title: "",
      image: "",
      price: "",
    });
    setImageUploaded(false); // Reset image uploader state
  };

  // Handle price editing
  const handleEditPrice = (index) => {
    setEditingIndex(index);
    setEditPrice(Bathroom.bathroomType.options[index].price);
  };

  // Save edited price
  const handleSavePrice = (index) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.bathroomType.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return {
        ...prevBathroom,
        bathroomType: {
          ...prevBathroom.bathroomType,
          options: updatedOptions,
        },
      };
    });
    setEditingIndex(null); // Exit editing mode
  };

  // Delete cabinet item and image from Firebase
  const handleDeleteItem = async (index) => {
    const cabinetToDelete = Bathroom.bathroomType.options[index];
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
    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      bathroomType: {
        ...prevBathroom.bathroomType,
        options: prevBathroom.bathroomType.options.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleBathroomTypeSubmit = () => {
    setCurrentForm("bathroomEnclosure");
  };
  const isFormDisabled = Bathroom.bathroomType.options.length < 1;
  return (
    <div className={`${currentForm === "bathroomType" ? "block" : "hidden"}`}>
      <p className="text-xl font-bold text-nowrap my-5">
        Add Bathroom Type
      </p>
      {/* <Button
          leftIcon={<IoMdArrowRoundBack />}
          variant={"outline"}
          onClick={() => setCurrentForm("BathroomDoorHandles")}
        >
          Back to Bathroom door handles
        </Button> */}
      <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
        {Bathroom?.bathroomType?.options?.map((ele, i) => (
          <div
            key={i}
            className="px-2 py-4 font-semibold border border-gray-300 cursor-pointer rounded-md"
          >
            <div className="w-full h-[220px] rounded-md">
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

        {/* Add new cabinet form */}
        {imageUploaded ? (
          <form onSubmit={handleAddBathroomType}>
            <div className="w-full grid gap-2">
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={newBathroomType.image}
                  alt="doorimage"
                  className="w-full h-full object-contain"
                />
              </div>
              <Input
                type="text"
                name="title" // This was previously "name", change it to "title"
                placeholder="Bathroom type title"
                value={newBathroomType.title} // Ensure it is tied to "title"
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={newBathroomType.price}
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
          onClick={handleBathroomTypeSubmit}
        >
          Submit Bathroom Type
        </Button>
      </div>
    </div>
  );
};
