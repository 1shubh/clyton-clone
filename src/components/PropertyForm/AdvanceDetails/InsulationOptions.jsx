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
import { AiOutlineDelete } from "react-icons/ai";

export const InsulationOptions = ({
  data,
  setData,
  currentForm,
  setCurrentForm,
  handleSubmit,
}) => {
  const [slidingPrices, setSlidingPrices] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [newOption, setNewOption] = useState({ title: "", price: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSlidingPriceChange = (i, value) => {
    setSlidingPrices((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  const handleAddSlidingPrice = (i) => {
    setData((prevData) => {
      const updatedOptions = prevData.insulationOptions.options.map(
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
        insulationOptions: {
          ...prevData.insulationOptions,
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
        insulationOptions: {
          ...prevData.insulationOptions,
          options: [
            ...prevData.insulationOptions.options,
            {
              title: newOption.title,
              price: parseFloat(newOption.price),
            },
          ],
        },
      }));
      setNewOption({ title: "", price: "" });
      setIsAddingNew(false);
    }
  };

  const handleDeleteOption = (i) => {
    setData((prevData) => {
      const updatedOptions = prevData.insulationOptions.options.filter(
        (option, index) => index !== i
      );
      return {
        ...prevData,
        insulationOptions: {
          ...prevData.insulationOptions,
          options: updatedOptions,
        },
      };
    });
  };

  return (
    <div className={`${currentForm === "insulationOptions" ? "block" : "hidden"}`}>
      <div>
        <p className="text-xl font-bold">Add Insulation Options</p>
        <div className="grid gap-2 mt-5">
          {data.insulationOptions.options.map((ele, i) => (
            <div key={i} className="border bg-green-100 p-5 rounded-xl grid gap-2">
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
                        slidingPrices[i] !== undefined ? slidingPrices[i] : ele.price
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
                  onClick={() =>
                    isEditing[i]
                      ? handleAddSlidingPrice(i)
                      : handleToggleEdit(i)
                  }
                >
                  {isEditing[i] ? "Add" : "Edit"}
                </Button>
                <IconButton
                  colorScheme="red"
                  aria-label="Delete Option"
                  icon={<AiOutlineDelete />}
                  onClick={() => handleDeleteOption(i)}
                />
              </div>
            </div>
          ))}

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
            Save Insulation Options
          </Button>
        </div>
      </div>
    </div>
  );
};
