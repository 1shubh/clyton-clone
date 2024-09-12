import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Button } from "@chakra-ui/react";
import {
  setLoading,
  setError,
  setUploadedExteriorImage,
} from "../../Redux/imageSlice";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
import { storage } from "../../firebase-config/config";
import { UseDispatch, useDispatch, useSelector } from "react-redux";



export const ImageUploader = ({
  setImageUploaded,
  maxNumber,
  title,
  setUploadedImage
}) => {
  const [images, setImage] = useState([]);
  const [filePath, setFilePath] = useState(""); // Store file path for deleting
  const loading = useSelector((state) => state.images.loading);

  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
  };

  const dispatch = useDispatch()
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
      dispatch(setUploadedImage(urls));
      setImageUploaded(true);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Error uploading images."));
      console.error("Error uploading images:", error);
    }
  };



  
  return (
    <div>
      <p className="font-bold text-sm mb-5">
        Upload {title} Image (jpg, png, jpeg)
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
  );
};
