import React, { useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";

export const ProductItem = ({ product, deleteProduct, editProduct }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        className="border rounded-md px-9 py-5 mt-2 cursor-pointer hover:bg-slate-300 flex items-center justify-between gap-5"
        onClick={() => onOpen()}
      >
        <div className="flex items-center gap-5">
          <div className="w-[10%]">
            <img src={product.images[0]} alt="" className="w-full" />
          </div>
          <div>
            <p>{product.name}</p>
            <p className="font-bold">$ {product.price}</p>
            <p>{product.address}</p>
            <p className="text-black font-semibold">
                  {product.bedroom} beds | {product.bathroom} bath |{" "}
                  {product.area} sq. ft. | {product.length}{" "} x {product.bredth}
                </p>
          </div>
        </div>
        <div>
          <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
          {/* <Button onClick={() => editProduct(product)}>Edit</Button> */}
        </div>
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex gap-5">
              {/* selected image */}
              <div className="w-[40%]">
                <div className="w-full">
                  <img src={currentImage} alt="" className="w-full" />
                </div>
                {/* all images */}
                <div
                  className={`grid grid-cols-${product.images.length} w-full gap-3 mt-2`}
                >
                  {product.images.map((ele, i) => (
                    <div
                      key={i}
                      className={`cursor-pointer hover:border-black hover:border-2 ${
                        currentImage === ele ? "border-2 border-black" : ""
                      }`}
                      onClick={() => setCurrentImage(ele)}
                    >
                      <img src={ele} alt="img" />
                    </div>
                  ))}
                </div>
              </div>
              {/* property details */}
              <div>
                <p>{product.name}</p>
                <p>${product.price}</p>
                <p>{product.address}</p>
                <p className="text-black font-semibold">
                  {product.bedroom} beds | {product.bathroom} bath |{" "}
                  {product.area} sq. ft. | {product.length}{" "} x {product.bredth}
                </p>
                <p>{product.description}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
