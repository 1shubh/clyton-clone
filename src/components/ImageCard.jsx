import React from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "@chakra-ui/react";

export const ImageCard = ({ title, url, deleteImage, width, height }) => {
  return (
    <>
      <p className="font-bold text-sm">Uploaded {title} Image</p>
      <div
        className={`border mt-2 mb-2 rounded-xl shadow-xl w-[${width}] h-[${height}]`}
      >
        <img
          src={url}
          alt={title}
          className="w-full h-full rounded-xl object-contain"
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
    </>
  );
};
