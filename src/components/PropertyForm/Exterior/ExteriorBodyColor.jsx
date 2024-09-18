import { Input, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

export const ExteriorBodyColor = ({ currentForm, exterior, setExterior,setCurrnetForm }) => {
  const [newColor, setNewColor] = useState({
    name: "",
    colorCode: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewColor((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddColor = () => {
    if (newColor.name && newColor.colorCode) {
      setExterior((prev) => ({
        ...prev,
        bodyColor: {
          ...prev.bodyColor,
          options: [
            ...prev.bodyColor.options,
            {
              name: newColor.name,
              colorCode: newColor.colorCode,
              image: "" // Optional image URL
            }
          ]
        }
      }));
      // Clear the form inputs
      setNewColor({ name: "", colorCode: "" });
    }
  };

  const handleDeleteColor = (index) => {
    setExterior((prev) => ({
      ...prev,
      bodyColor: {
        ...prev.bodyColor,
        options: prev.bodyColor.options.filter((_, i) => i !== index)
      }
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted");
    setCurrnetForm("exteriorAccentColor")
  };

  const isFormDisabled = exterior.bodyColor.options.length < 1;

  return (
    <div className={`${currentForm === "bodyColor" ? "block" : "hidden"}`}>
      <div className="grid grid-cols-4 gap-2 pb-4">
        {exterior.bodyColor.options.map((ele, i) => (
          <div
            key={i}
            className="px-2 py-4 font-semibold border border-gray-300 cursor-pointer rounded-md"
          >
            <div
              className="w-full h-[150px] rounded-md"
              style={{ backgroundColor: ele.colorCode }}
            ></div>
            <p className="text-sm">{ele.name}</p>
            <Button
              colorScheme="orange"
              className="mt-1"
              rightIcon={<MdDelete />}
              onClick={() => handleDeleteColor(i)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <p className="text-xl font-bold text-nowrap mb-5">
          Add Exterior Body Colors
        </p>
        <div className="w-[50%] grid gap-2">
          <Input
            type="text"
            name="name"
            placeholder="Name of Body Color"
            value={newColor.name}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="colorCode"
            placeholder="Add Color Code"
            value={newColor.colorCode}
            onChange={handleInputChange}
          />
          <Button
            className="w-[50%]"
            colorScheme="yellow"
            onClick={handleAddColor}
          >
            Add Color
          </Button>
        </div>
        {isFormDisabled && (
          <Text color="red.500" mt={2}>
            Please add at least one color.
          </Text>
        )}
        <Button
          className="mt-4"
          colorScheme="blue"
          rightIcon={<GrFormNextLink />}
          type="submit"
          isDisabled={isFormDisabled}
        >
          Save Body {exterior.bodyColor.options.length > 1 ? "colors" : "color"}
        </Button>
      </form>
    </div>
  );
};
