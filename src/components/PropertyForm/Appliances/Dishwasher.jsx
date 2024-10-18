import React, { useState } from "react";
import {
  Input,
  Button,
  Text,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";

export const Dishwasher = ({
  data,
  setData,
  currentForm,
  setCurrentForm,
  handleSubmit,
}) => {
  const [slidingPrices, setSlidingPrices] = useState({}); // To store price inputs
  const [isEditing, setIsEditing] = useState({});
  const [newPackage, setNewPackage] = useState({
    title: "",
    price: "",
    description: "",
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
      const updatedOptions = prevData.dishwasher.package.map((option, index) =>
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
        dishwasher: {
          ...prevData.dishwasher,
          package: updatedOptions,
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

  // Handle adding a new package
  const handleAddNewPackage = () => {
    if (newPackage.title && newPackage.price) {
      setData((prevData) => ({
        ...prevData,
        dishwasher: {
          ...prevData.dishwasher,
          package: [
            ...prevData.dishwasher.package,
            {
              title: newPackage.title,
              price: parseFloat(newPackage.price),
              description: newPackage.description,
            },
          ],
        },
      }));
      setNewPackage({ title: "", price: "", description: "" });
      setIsAddingNew(false); // Close the form after adding the new package
    }
  };

  return (
    <div className={`${currentForm === "dishwasher" ? "block" : "hidden"}`}>
      <div>
        <p className="text-xl font-bold text-nowrap">
          Add {data.dishwasher.title}
        </p>
        <div className="grid gap-2 mt-5">
          {data.dishwasher.package.map((ele, i) => {
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
                </div>
              </div>
            );
          })}

          {/* New Package Adding Form */}
          {isAddingNew ? (
            <div className="border bg-blue-100 p-5 rounded-xl grid gap-2">
              <p className="font-bold text-md">Add New Package Option</p>
              <Input
                placeholder="Title"
                value={newPackage.title}
                onChange={(e) =>
                  setNewPackage((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                placeholder="Price"
                type="number"
                value={newPackage.price}
                onChange={(e) =>
                  setNewPackage((prev) => ({ ...prev, price: e.target.value }))
                }
              />
              <Input
                placeholder="Description"
                value={newPackage.description}
                onChange={(e) =>
                  setNewPackage((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <Button colorScheme="green" onClick={handleAddNewPackage}>
                Add Package
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
              Add New Package
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
            Save Appliances
          </Button>
        </div>
      </div>
    </div>
  );
};
