import React, { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";
import { Input, Button, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config/config"; // Import Firestore instance

const ProductForm = ({
  addProduct,
  updateProduct,
  currentProduct,
  setCurrentProduct,
}) => {
  const [property, setProperty] = useState({
    images: [],
    name: "",
    price: "",
    bundlePrice:"",
    address: "",
    bedroom: "",
    bathroom: "",
    area: "",
    size: "",
    length: "",
    bredth: "",
    description: "",
    modelNum: "",
  });
  const [imageUploaded, setImageUploaded] = useState(false);
  const [formLoading, setFormLoading] = useState(false); // Add form loading state
  const uploadedImages = useSelector((state) => state.images.uploadedImages);
  const loading = useSelector((state) => state.images.loading);
  const error = useSelector((state) => state.images.error);

  useEffect(() => {
    if (currentProduct) {
      setProperty(currentProduct);
    }
  }, [currentProduct]);

  useEffect(() => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      images: uploadedImages,
    }));
  }, [uploadedImages]);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true); // Set form loading to true
    try {
      if (currentProduct) {
        // Update existing product
        const productRef = doc(db, "properties", currentProduct.id);
        await updateDoc(productRef, property);
        updateProduct(property);
        setCurrentProduct(null);
      } else {
        // Add new product
        await addDoc(collection(db, "properties"), property);
        addProduct(property);
      }
      setProperty({
        images: [],
        name: "",
        price: "",
        bundlePrice:"",
        address: "",
        bedroom: "",
        bathroom: "",
        area: "",
        size: "",
        length: "",
        bredth: "",
        description: "",
        modelNum: "",
      });
      setImageUploaded(false);
    } catch (err) {
      console.error("Error adding document: ", err);
    } finally {
      setFormLoading(false); // Reset form loading state
    }
  };

  return (
    <div>
      <p className={`text-sm ${imageUploaded ? "block" : "hidden"}`}>
        Property Images
      </p>
      <div
        className={`mt-3 grid grid-cols-8 gap-5 pb-5 ${
          imageUploaded ? "block" : "hidden"
        }`}
      >
        {uploadedImages.map((ele, i) => {
          return (
            <div key={i}>
              <img src={ele} alt={"img"} />
            </div>
          );
        })}
      </div>
      {imageUploaded ? (
        <form onSubmit={handleSubmit} className="w-[50%] grid gap-3">
          <Input
            type="text"
            name="modelNum"
            placeholder="Model Number of the Property"
            value={property.modelNum}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="name"
            placeholder="Property Name"
            value={property.name}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2">
          <Input
            type="text"
            name="price"
            placeholder="Property Base Price"
            value={property.price}
            onChange={handleChange}
            required
            w={"48%"}
          />
          <Input
            type="text"
            name="bundlePrice"
            placeholder="Property Bundle Price"
            value={property.bundlePrice}
            onChange={handleChange}
            required
            w={"48%"}
          />
          </div>
          
          <Input
            type="text"
            name="address"
            placeholder="Property Address"
            value={property.address}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="bedroom"
            placeholder="No. of Bedrooms"
            value={property.bedroom}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="bathroom"
            placeholder="No. of Bathrooms"
            value={property.bathroom}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="area"
            placeholder="Area Of the Property (sq. ft.)"
            value={property.area}
            onChange={handleChange}
            required
          />
          {/* <Input
            type="number"
            name="size"
            placeholder="Size Of the Property"
            value={property.size}
            onChange={handleChange}
            required
          /> */}
          <div className="flex gap-2">
            <Input
              type="number"
              name="length"
              placeholder="Length Of the Property"
              value={property.length}
              onChange={handleChange}
              required
              w={"48%"}
            />
            <Input
              type="number"
              name="bredth"
              placeholder="Breadth Of the Property"
              value={property.bredth}
              onChange={handleChange}
              required
              w={"48%"}
            />
          </div>

          <Input
            type="text"
            name="description"
            placeholder="Description Of the Property"
            value={property.description}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            w={"50%"}
            colorScheme="orange"
            isLoading={formLoading} // Indicate loading
          >
            {currentProduct ? "Update" : "Add"} Property
          </Button>
        </form>
      ) : (
        <>
          <p className="text-black font-bold pb-2">Add Property Images</p>
          <ImageUpload setImageUploaded={setImageUploaded} />
        </>
      )}
    </div>
  );
};

export default ProductForm;
