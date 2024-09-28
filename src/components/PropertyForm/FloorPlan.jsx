import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { Button, IconButton, Input } from "@chakra-ui/react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase-config/config";
import { useDispatch, useSelector } from "react-redux";
import {
  setUploadedFloorPlanImage,
  setLoading,
  setError,
} from "../../Redux/imageSlice";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

export const FloorPlan = ({ onSubmit, setIndex }) => {
  const [images, setImage] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filePath, setFilePath] = useState(""); // Store file path for deleting
  const [floorPlan, setFloorPlan] = useState({
    title: "Floor Plan",
    subtitle: "Floor Plan orientation",
    image: "",
    options: [
      {
        title: "Standard",
        rotate: "scaleX(1) scaleY(1)",
        price: "",
      },
      {
        title: "Horizontal Flip",
        price: "",
        rotate: "scaleX(-1)",
      },
      {
        title: "Vertical Flip",
        price: "",
        rotate: "scaleY(-1)",
      },
    ],
  });
  const dispatch = useDispatch();
  const uploadedFloorPlanImage = useSelector(
    (state) => state.images.uploadedFloorPlanImage
  );
  const loading = useSelector((state) => state.images.loading);

  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
  };

  useEffect(() => {
    if (uploadedFloorPlanImage.length > 0) {
      setFloorPlan((prevProperty) => ({
        ...prevProperty,
        image: uploadedFloorPlanImage[0].url, // Update image in floor plan state
      }));
      setFilePath(uploadedFloorPlanImage[0].path); // Save the file path for later deletion
    }
  }, [uploadedFloorPlanImage]);

  // Upload image to Firebase Storage
  const handleImageUpload = async () => {
    dispatch(setLoading(true));
    try {
      const promises = images.map(async (image, index) => {
        const fileName = `images/${Date.now()}_${index}`;
        const storageRef = ref(storage, fileName);
        const response = await fetch(image.data_url);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        return { url, path: fileName }; // Store both URL and file path
      });
      const urls = await Promise.all(promises);
      dispatch(setUploadedFloorPlanImage(urls));
      setImageUploaded(true);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Error uploading images."));
      console.error("Error uploading images:", error);
    }
  };


  // Update the image
  // Delete the image from Firebase
  const deleteImage = async () => {
    if (!filePath) return;
    const imageRef = ref(storage, filePath);
    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      setFloorPlan((prev) => ({ ...prev, image: "" }));
      setImageUploaded(false); // Reset the uploaded state
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Extract the entered prices from the form
    const updatedOptions = floorPlan.options.map((option, index) => {
      const price = document.getElementById(`price-${index}`).value;
      return { ...option, price };
    });
  
    // Update the floorPlan object with the new prices
    setFloorPlan((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  
    // Call the parent onSubmit function with the updated floorPlan
    if (onSubmit) {
      onSubmit(floorPlan);
    }
    if(setIndex){
      setIndex((prev)=>prev+1)
    }
  };
  // console.log(floorPlan)
  return (
    <>
      {imageUploaded ? (
        <div className="flex gap-20">
          <div className="w-[30%]">
            <p className="font-bold text-sm">Uploaded Floor Plan</p>
            <div className="border mt-2 mb-2 rounded-xl shadow-xl">
              <img
                src={floorPlan.image}
                alt="floor plan"
                className="w-full rounded-xl"
              />
            </div>
            <div className="flex gap-5 mt-5">
              {/* Delete Button */}
              <Button
                colorScheme="yellow"
                aria-label="Delete Image"
                size="lg"
                onClick={deleteImage} // Call delete logic
                leftIcon={<MdDelete fontSize="25px" />}
              >
                Delete
              </Button>
            </div>
          </div>
          {/* Form */}
          <div className="w-[65%] border px-10 py-1 rounded-xl border-black">
            <form onSubmit={handleSubmit}>
              <p className="text-xl font-bold mt-10 text-nowrap">
                Add Price for Floor Plan Orientation
              </p>
              <div className="mt-5 flex gap-1 items-center font-semibold">
                <p className="w-[50%]">Standard Orientation Price</p>
                <Input type="number" placeholder="Standard Orientation Price"  id={`price-0`} />
              </div>
              <div className="mt-5 flex gap-1 items-center font-semibold">
                <p className="w-[50%]">Horizontal Flip Orientation Price</p>
                <Input type="number" placeholder="Standard Orientation Price"  id={`price-1`}/>
              </div>
              <div className="mt-5 flex gap-1 items-center font-semibold">
                <p className="w-[50%]">Vertical Flip Orientation Price</p>
                <Input type="number" placeholder="Standard Orientation Price"  id={`price-2`}/>
              </div>
              <div className="w-[30%] m-auto">
                <Button
                  colorScheme="yellow"
                  w={"100%"}
                  margin={"auto"}
                  marginTop={"20px"}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-bold text-sm mb-5">
            Upload Floor Plan Image (jpg, png, jpeg)
          </p>
          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              isDragging,
              dragProps,
              onImageUpdate,
              onImageRemove,
            }) => (
              <div className="upload__image-wrapper">
                {images.length === 0 && (
                  <div
                    style={{
                      border: "2px dashed #ccc",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: isDragging ? "#e0e0e0" : "#f9f9f9",
                      color: isDragging ? "red" : "#000",
                    }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Select Image
                  </div>
                )}
                <div className="flex gap-5 mt-5">
                  {imageList.map((image, index) => (
                    <div key={index} className="w-[20%] h-fit">
                      <div className="w-full h-[200px] border border-black rounded-md">
                        <img
                          src={image["data_url"]}
                          alt=""
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button
                          onClick={() => onImageUpdate(index)}
                          colorScheme="yellow"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => onImageRemove(index)}
                          colorScheme="teal"
                          variant="outline"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
          {images.length === 0 ? (
            <></>
          ) : (
            <Button
              className="mt-5"
              colorScheme="blue"
              onClick={handleImageUpload}
              isLoading={loading}
            >
              Upload {images.length > 1 ? "Images" : "Image"}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
