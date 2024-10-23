import React, { useState } from "react";
import {
  Input,
  Button,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";

export const CielingHeight = ({
  data,
  setData,
  currentForm,
  setCurrentForm,
 
}) => {
  const [slidingPrices, setSlidingPrices] = useState({}); // To store price inputs
  const [isEditing, setIsEditing] = useState({});
  const [newOption, setNewOption] = useState({
    title: "",
    price: "",
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSlidingPriceChange = (i, value) => {
    setSlidingPrices((prev) => ({
      ...prev,
      [i]: value, // Keep the user input as is
    }));
  };

  const handleAddSlidingPrice = (i) => {
    setData((prevData) => {
      const updatedOptions = prevData.celingHeight.options.map((option, index) =>
        index === i
          ? {
              ...option,
              price:
                slidingPrices[i] !== undefined
                  ? parseFloat(slidingPrices[i])
                  : option.price,
            }
          : option
      );
      return {
        ...prevData,
        celingHeight: {
          ...prevData.celingHeight,
          options: updatedOptions,
        },
      };
    });

    // Once price is added, change editing state to false
    setIsEditing((prev) => ({
      ...prev,
      [i]: false,
    }));
  };

  // Handle toggling between Add/Edit modes
  const handleToggleEdit = (i) => {
    setIsEditing((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  // Handle deleting an option
  const handleDeleteOption = (i) => {
    setData((prevData) => {
      const updatedOptions = prevData.celingHeight.options.filter(
        (option, index) => index !== i
      );
      return {
        ...prevData,
        celingHeight: {
          ...prevData.celingHeight,
          options: updatedOptions,
        },
      };
    });
  };

  // Handle adding a new ceiling height option
  const handleAddNewOption = () => {
    if (newOption.title && newOption.price) {
      setData((prevData) => ({
        ...prevData,
        celingHeight: {
          ...prevData.celingHeight,
          options: [
            ...prevData.celingHeight.options,
            {
              title: newOption.title,
              price: parseFloat(newOption.price),
            },
          ],
        },
      }));
      setNewOption({ title: "", price: "" });
      setIsAddingNew(false); // Close the form after adding the new option
    }
  };

  const handleSubmit = () => {
    setCurrentForm("structuralUpgrades")
  }

  return (
    <div className={`${currentForm === "cielingHeight" ? "block" : "hidden"}`}>
      <div>
        <p className="text-xl font-bold text-nowrap">Add Ceiling Height Options</p>
        <div className="grid gap-2 mt-5">
          {data.celingHeight.options.map((ele, i) => {
            return (
              <div
                key={i}
                className="border bg-green-100 p-5 rounded-xl grid gap-2"
              >
                <p className="font-bold text-md">{ele.title} Price</p>
                <div className="flex gap-5 items-center">
                  {isEditing[i] ? (
                    // Input field when editing is true
                    <InputGroup w={"20%"}>
                      <InputLeftElement>
                        <BiSolidDollarCircle fontSize={"30px"} />
                      </InputLeftElement>
                      <Input
                        border={"1px solid black"}
                        placeholder="Price"
                        type="number"
                        value={
                          slidingPrices[i] !== undefined
                            ? slidingPrices[i]
                            : ele.price
                        } // Check for slidingPrices[i] explicitly
                        onChange={(e) =>
                          handleSlidingPriceChange(i, e.target.value)
                        }
                      />
                    </InputGroup>
                  ) : (
                    // Text display when not editing
                    <span className="font-bold">{ele.price} $</span>
                  )}
                  <Button
                    colorScheme="yellow"
                    onClick={
                      () =>
                        isEditing[i]
                          ? handleAddSlidingPrice(i) // Add price if in edit mode
                          : handleToggleEdit(i) // Toggle to edit mode
                    }
                  >
                    {isEditing[i] ? "Add" : "Edit"}
                  </Button>
                  <IconButton
                    aria-label="Delete option"
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => handleDeleteOption(i)}
                  />
                </div>
              </div>
            );
          })}

          {/* New Option Adding Form */}
          {isAddingNew ? (
            <div className="border bg-blue-100 p-5 rounded-xl grid gap-2">
              <p className="font-bold text-md">Add New Option</p>
              <Input
                placeholder="Title"
                value={newOption.title}
                onChange={(e) =>
                  setNewOption((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                placeholder="Price"
                type="number"
                value={newOption.price}
                onChange={(e) =>
                  setNewOption((prev) => ({ ...prev, price: e.target.value }))
                }
              />
              <Button colorScheme="green" onClick={handleAddNewOption}>
                Add Option
              </Button>
              <Button colorScheme="red" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              colorScheme="blue"
              onClick={() => setIsAddingNew(true)}
              className="mt-4"
            >
              Add New Option
            </Button>
          )}
        </div>
        <div className="flex items-center justify-end">
          <Button
            className="mt-5"
            colorScheme="blue"
            rightIcon={<GrFormNextLink />}
            onClick={handleSubmit}
          >
            Save Ceiling Heights
          </Button>
        </div>
      </div>
    </div>
  );
};
