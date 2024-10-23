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
import { IoMdArrowRoundBack } from "react-icons/io";

export const StructuralUpgrades = ({
  data,
  setData,
  currentForm,
  setCurrentForm,
  handleSubmit,
}) => {
  const [slidingPrices, setSlidingPrices] = useState({}); // To store price inputs
  const [isEditing, setIsEditing] = useState({});
  const [newOption, setNewOption] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSlidingPriceChange = (i, value) => {
    setSlidingPrices((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  const handleAddSlidingPrice = (i) => {
    setData((prevData) => {
      const updatedOptions = prevData.structuralUpgrades.options.map(
        (option, index) =>
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
        structuralUpgrades: {
          ...prevData.structuralUpgrades,
          options: updatedOptions,
        },
      };
    });

    setIsEditing((prev) => ({
      ...prev,
      [i]: false,
    }));
  };

  const handleToggleEdit = (i) => {
    setIsEditing((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  const handleAddNewOption = () => {
    if (newOption.title && newOption.price) {
      setData((prevData) => ({
        ...prevData,
        structuralUpgrades: {
          ...prevData.structuralUpgrades,
          options: [
            ...prevData.structuralUpgrades.options,
            {
              title: newOption.title,
              price: parseFloat(newOption.price),
              description: newOption.description,
            },
          ],
        },
      }));
      setNewOption({ title: "", price: "", description: "" });
      setIsAddingNew(false);
    }
  };

  const handleDeleteOption = (i) => {
    setData((prevData) => {
      const updatedOptions = prevData.structuralUpgrades.options.filter(
        (_, index) => index !== i
      );
      return {
        ...prevData,
        structuralUpgrades: {
          ...prevData.structuralUpgrades,
          options: updatedOptions,
        },
      };
    });
  };

  return (
    <div className={`${currentForm === "structuralUpgrades" ? "block" : "hidden"}`}>
      <div>
        <p className="text-xl font-bold text-nowrap">Add Structural Upgrades Options</p>
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          variant={"outline"}
          onClick={() => setCurrentForm("gasAppliances")}
        >
          Back to Add Interior Ceiling Height
        </Button>
        <div className="grid gap-2 mt-5">
          {data.structuralUpgrades.options.map((ele, i) => {
            return (
              <div
                key={i}
                className="border bg-green-100 p-5 rounded-xl grid gap-2"
              >
                <p className="font-bold text-md">{ele.title} Price</p>
                <div className="flex gap-5 items-center">
                  {isEditing[i] ? (
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
                        }
                        onChange={(e) =>
                          handleSlidingPriceChange(i, e.target.value)
                        }
                      />
                    </InputGroup>
                  ) : (
                    <span className="font-bold">{ele.price} $</span>
                  )}
                  <Button
                    colorScheme="yellow"
                    onClick={
                      () =>
                        isEditing[i]
                          ? handleAddSlidingPrice(i)
                          : handleToggleEdit(i)
                    }
                  >
                    {isEditing[i] ? "Add" : "Edit"}
                  </Button>
                  <IconButton
                    colorScheme="red"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteOption(i)}
                    aria-label="Delete Option"
                  />
                </div>
                <p className="text-sm">{ele.description}</p>
              </div>
            );
          })}

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
              <Input
                placeholder="Description"
                value={newOption.description}
                onChange={(e) =>
                  setNewOption((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
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
            onClick={()=>setCurrentForm("sidewallDimensions")}
          >
            Save Structural Upgrades
          </Button>
        </div>
      </div>
    </div>
  );
};
