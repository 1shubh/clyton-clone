import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrFormNextLink } from "react-icons/gr";
import { useSelector } from "react-redux";
import { ImageUploader } from "./PropertyForm/ImageUploader";
import { getStorage, ref, deleteObject } from "firebase/storage"; // Firebase storage
import { setUploadOptionImage } from "../Redux/imageSlice";

export const OptionsForm = ({
  currentForm,
  currentFormTitle,
  data,
  setData,
  setCurrentForm,
  prevForm,
  nextForm
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState(""); // Store file path for deleting
  const [editingIndex, setEditingIndex] = useState(null); // Track which option is being edited
  const [editPrice, setEditPrice] = useState("");
  const [newOption, setNewOption] = useState({
    name: "",
    image: "",
    price: "",
    bgImage: "",
  });

  const uploadedOptionImage = useSelector(
    (state) => state.images.uploadOptionImage
  );

  useEffect(() => {
    if (uploadedOptionImage && uploadedOptionImage.length > 0) {
      setNewOption((prevOption) => ({
        ...prevOption,
        bgImage: uploadedOptionImage[0].url,
        image: uploadedOptionImage[0].url,
        filePath: uploadedOptionImage[0].path, // Store file path for deleting
      }));
    }
  }, [uploadedOptionImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    if (!newOption.name || !newOption.bgImage || !newOption.price) {
      alert("Please fill all fields to add an option.");
      return;
    }

    setData((prevData) => ({
      ...prevData,
      options: [
        ...prevData.options,
        { ...newOption, price: parseFloat(newOption.price) },
      ],
    }));

    // Reset the form after adding
    setNewOption({
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
    setEditPrice(data.options[index].price);
  };

  // Save edited price
  const handleSavePrice = (index) => {
    setData((prevData) => {
      const updatedOptions = [...prevData.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return { ...prevData, options: updatedOptions };
    });
    setEditingIndex(null); // Exit editing mode
  };

  // Delete option and image from Firebase
  const handleDeleteOption = async (index) => {
    const optionToDelete = data.options[index];
    if (optionToDelete.filePath) {
      const storage = getStorage();
      const imageRef = ref(storage, optionToDelete.filePath);
      try {
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage.");
      } catch (error) {
        console.error("Error deleting image from Firebase:", error);
      }
    }

    // Remove the option from the list
    setData((prevData) => ({
      ...prevData,
      options: prevData.options.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = () => {
    setCurrentForm({nextForm});
  };

  const isFormDisabled = data.options.length < 1;

  return (
    <div className={`${currentForm === {currentFormTitle} ? "block" : "hidden"}`}>
      <p className="text-xl font-bold text-nowrap my-5">Add Options</p>
      <Button
        leftIcon={<IoMdArrowRoundBack />}
        variant={"outline"}
        onClick={() => setCurrentForm({prevForm})}
      >
        Back to Previous Form
      </Button>

      <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
        {data?.options?.map((ele, i) => (
          <div
            key={i}
            className="px-2 py-4 font-semibold border border-gray-300 cursor-pointer rounded-md"
          >
            <div className="w-full h-[150px] rounded-md">
              <img
                src={ele.bgImage}
                alt="optionimage"
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
                onClick={() => handleDeleteOption(i)}
              />
            </div>
          </div>
        ))}

        {/* Add new option form */}
        {imageUploaded ? (
          <form onSubmit={handleAddOption}>
            <div className="w-full grid gap-2">
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={newOption.bgImage}
                  alt="optionimage"
                  className="w-full h-full object-contain"
                />
              </div>
              <Input
                type="text"
                name="name"
                placeholder="Option name"
                value={newOption.name}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={newOption.price}
                onChange={handleInputChange}
              />
              <Button className="w-[50%]" colorScheme="yellow" type="submit">
                Add Option
              </Button>
            </div>
          </form>
        ) : (
          <ImageUploader
            name={"Option"}
            setImageUploaded={setImageUploaded}
            setUploadedImage={setUploadOptionImage}
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
          onClick={handleFormSubmit}
        >
          Submit Options
        </Button>
      </div>
    </div>
  );
};
