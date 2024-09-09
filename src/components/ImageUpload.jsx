import { Button } from "@chakra-ui/react";
import React from "react";
import ImageUploading from "react-images-uploading";
import { storage } from "../firebase-config/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setUploadedImages, setLoading, setError } from "../Redux/imageSlice";
import { BeatLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa6";
export const ImageUpload = ({ imageUploaded, setImageUploaded }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 10;

  const dispatch = useDispatch();
  const uploadedImages = useSelector((state) => state.images.uploadedImages);
  const loading = useSelector((state) => state.images.loading);
  const error = useSelector((state) => state.images.error);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleImageUpload = async () => {
    dispatch(setLoading(true));
    try {
      const promises = images.map(async (image, index) => {
        const storageRef = ref(storage, `images/${Date.now()}_${index}`);
        const response = await fetch(image.data_url);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        return url;
      });
      const urls = await Promise.all(promises);
      dispatch(setUploadedImages(urls));
      setImageUploaded(true);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Error uploading images."));
      console.error("Error uploading images:", error);
    }
  };

  return loading ? (
    <div className="w-full h-[100%] m-auto flex items-center justify-center">
      <p className="text-center font-bold">Please Wait....</p>
      <BeatLoader color="red" />
    </div>
  ) : (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
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
              className={images.length > 0 ? "hidden" : "block"}
            >
              Select Image
            </div>
            &nbsp;
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
              className={images.length > 0 ? "flex items-center justify-center flex-col gap-3 w-[20%]" : "hidden"}
            >
              <p>Add More</p>
              <FaPlus />
            </div>
            </div>
          </div>
        )}
      </ImageUploading>
      {images.length === 0 ? (
        <></>
      ) : (
        <Button
          className="mt-5"
          colorScheme={"blue"}
          onClick={handleImageUpload}
        >
          Upload {images.length > 1 ? "Images" : "Image"}
        </Button>
      )}
    </div>
  );
};
