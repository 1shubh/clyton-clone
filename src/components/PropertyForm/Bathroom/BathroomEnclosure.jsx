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

export const BathroomEnclosure = ({
  currentForm,
  setCurrentForm,
  Bathroom,
  setBathroom,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState(""); // Store file path for deleting
  const [editingIndex, setEditingIndex] = useState(null); // Track which cabinet is being edited
  const [editPrice, setEditPrice] = useState("");
  const [newbathroomEnclosure, setnewbathroomEnclosure] = useState({
    title: "",
    image: "",
    price: "",
  });
  const uploadedBathroomImage = useSelector(
    (state) => state.images.UploadBathroomImage
  );
  // Update newbathroomEnclosure with uploaded image
  useEffect(() => {
    if (uploadedBathroomImage && uploadedBathroomImage.length > 0) {
      setnewbathroomEnclosure((prevProperty) => ({
        ...prevProperty,
        image: uploadedBathroomImage[0].url,
        filePath: uploadedBathroomImage[0].path, // Store the Firebase Storage file path
      }));
    }
  }, [uploadedBathroomImage]);

  // Handle input changes for new cabinet fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewbathroomEnclosure((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new cabinet
  const handleAddbathroomEnclosure = (e) => {
    e.preventDefault();
    if (
      !newbathroomEnclosure.title ||
      !newbathroomEnclosure.image ||
      !newbathroomEnclosure.price
    ) {
      alert("Please fill all fields to add a Bathroom Type.");
      return;
    }

    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      bathroomEnclosure: {
        ...prevBathroom.bathroomEnclosure,
        options: [
          ...prevBathroom.bathroomEnclosure.options,
          { ...newbathroomEnclosure, price: parseFloat(newbathroomEnclosure.price) },
        ],
      },
    }));

    // Reset the form after adding
    setnewbathroomEnclosure({
      title: "",
      image: "",
      price: "",
    });
    setImageUploaded(false); // Reset image uploader state
  };

  // Handle price editing
  const handleEditPrice = (index) => {
    setEditingIndex(index);
    setEditPrice(Bathroom.bathroomEnclosure.options[index].price);
  };

  // Save edited price
  const handleSavePrice = (index) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.bathroomEnclosure.options];
      updatedOptions[index].price = parseFloat(editPrice);
      return {
        ...prevBathroom,
        bathroomEnclosure: {
          ...prevBathroom.bathroomEnclosure,
          options: updatedOptions,
        },
      };
    });
    setEditingIndex(null); // Exit editing mode
  };

  // Delete cabinet item and image from Firebase
  const handleDeleteItem = async (index) => {
    const cabinetToDelete = Bathroom.bathroomEnclosure.options[index];
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
      bathroomEnclosure: {
        ...prevBathroom.bathroomEnclosure,
        options: prevBathroom.bathroomEnclosure.options.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handlebathroomEnclosureSubmit = () => {
    setCurrentForm("bathroomTiles");
  };
  const isFormDisabled = Bathroom.bathroomEnclosure.options.length < 1;
  return (
    <div
      className={`${currentForm === "bathroomEnclosure" ? "block" : "hidden"}`}
    >
      <p className="text-xl font-bold text-nowrap my-5">Add Bathroom Enclosure</p>
      <Button
            leftIcon={<IoMdArrowRoundBack />}
            variant={"outline"}
            onClick={() => setCurrentForm("bathroomType")}
          >
            Back to Bathroom Type
          </Button>
      <div className="grid grid-cols-4 gap-2 pb-4 mt-5">
        {Bathroom?.bathroomEnclosure?.options?.map((ele, i) => (
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
          <form onSubmit={handleAddbathroomEnclosure}>
            <div className="w-full grid gap-2">
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={newbathroomEnclosure.image}
                  alt="doorimage"
                  className="w-full h-full object-contain"
                />
              </div>
              <Input
                type="text"
                name="title" // This was previously "name", change it to "title"
                placeholder="Bathroom Enclosure title"
                value={newbathroomEnclosure.title} // Ensure it is tied to "title"
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={newbathroomEnclosure.price}
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
          onClick={handlebathroomEnclosureSubmit}
        >
          Submit Bathroom Enclosure
        </Button>
      </div>
    </div>
  );
};
