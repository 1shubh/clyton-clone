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
  import { useSelector } from "react-redux";
  import { ImageUploader } from "../ImageUploader";
  import { setUploadBathroomImage } from "../../../Redux/imageSlice"; // Assuming there's an action for mirrors
  import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase Storage
import { IoMdArrowRoundBack } from "react-icons/io";
  export const BathroomMirror = ({
    currentForm,
    setCurrentForm,
    Bathroom,
    setBathroom,
  }) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editPrice, setEditPrice] = useState("");
    const [newMirror, setNewMirror] = useState({
      name: "",
      image: "",
      price: "",
    });
    const uploadedMirrorImage = useSelector(
      (state) => state.images.UploadBathroomImage // Keeps the bathroom image state unchanged
    );
  
    // Update newMirror with uploaded image
    useEffect(() => {
      if (uploadedMirrorImage && uploadedMirrorImage.length > 0) {
        setNewMirror((prev) => ({
          ...prev,
          image: uploadedMirrorImage[0].url,
          filePath: uploadedMirrorImage[0].path,
        }));
      }
    }, [uploadedMirrorImage]);
  
    // Handle input changes for new mirror fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewMirror((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Add new mirror
    const handleAddMirror = (e) => {
      e.preventDefault();
      if (!newMirror.name || !newMirror.image || !newMirror.price) {
        alert("Please fill all fields to add a mirror.");
        return;
      }
  
      setBathroom((prevBathroom) => ({
        ...prevBathroom,
        mirror: {
          ...prevBathroom.mirror,
          options: [
            ...prevBathroom.mirror.options,
            { ...newMirror, price: parseFloat(newMirror.price) },
          ],
        },
      }));
  
      // Reset the form after adding
      setNewMirror({
        name: "",
        image: "",
        price: "",
      });
      setImageUploaded(false); // Reset image uploader state
    };
  
    // Handle price editing
    const handleEditPrice = (index) => {
      setEditingIndex(index);
      setEditPrice(Bathroom.mirror.options[index].price);
    };
  
    // Save edited price
    const handleSavePrice = (index) => {
      setBathroom((prevBathroom) => {
        const updatedOptions = [...prevBathroom.mirror.options];
        updatedOptions[index].price = parseFloat(editPrice);
        return {
          ...prevBathroom,
          mirror: {
            ...prevBathroom.mirror,
            options: updatedOptions,
          },
        };
      });
      setEditingIndex(null); // Exit editing mode
    };
  
    // Delete mirror item and image from Firebase
    const handleDeleteItem = async (index) => {
      const mirrorToDelete = Bathroom.mirror.options[index];
      if (mirrorToDelete.filePath) {
        const storage = getStorage();
        const imageRef = ref(storage, mirrorToDelete.filePath);
        try {
          await deleteObject(imageRef);
          console.log("Image deleted from Firebase Storage.");
        } catch (error) {
          console.error("Error deleting image from Firebase:", error);
        }
      }
  
      // Remove the mirror from options
      setBathroom((prevBathroom) => ({
        ...prevBathroom,
        mirror: {
          ...prevBathroom.mirror,
          options: prevBathroom.mirror.options.filter((_, i) => i !== index),
        },
      }));
    };
  
    const handleMirrorSubmit = () => {
      setCurrentForm("vanityLighting"); // Change this to the actual next form
    };
  
    const isFormDisabled = Bathroom.mirror.options.length < 1;
  
    return (
      <div className={`${currentForm === "mirror" ? "block" : "hidden"}`}>
        <p className="text-xl font-bold text-nowrap my-5">Add Bathroom Mirror</p>
        <Button
            leftIcon={<IoMdArrowRoundBack />}
            variant={"outline"}
            onClick={() => setCurrentForm("showerTiles")}
          >
            Back to Shower Tile
          </Button>
        <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
          {Bathroom?.mirror?.options?.map((ele, i) => (
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
  
          {/* Add new mirror form */}
          {imageUploaded ? (
            <form onSubmit={handleAddMirror}>
              <div className="w-full grid gap-2">
                <div className="w-full h-[150px] rounded-md">
                  <img
                    src={newMirror.image}
                    alt="mirrorimage"
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Mirror Name"
                  value={newMirror.name}
                  onChange={handleInputChange}
                />
  
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newMirror.price}
                  onChange={handleInputChange}
                />
                <Button className="w-[50%]" colorScheme="yellow" type="submit">
                  Add Mirror
                </Button>
              </div>
            </form>
          ) : (
            <ImageUploader
              name={"Mirror"}
              setImageUploaded={setImageUploaded}
              setUploadedImage={setUploadBathroomImage} // Keep this the same as for the bathroom image
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
            onClick={handleMirrorSubmit}
          >
            Submit Mirror
          </Button>
        </div>
      </div>
    );
  };
  