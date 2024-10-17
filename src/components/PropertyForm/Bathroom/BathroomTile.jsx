import React, { useState } from "react";
import { Button, Input, IconButton } from "@chakra-ui/react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";

export const BathroomTile = ({
  currentForm,
  setCurrentForm,
  Bathroom,
  setBathroom,
}) => {
  const [newTile, setNewTile] = useState({
    title: "",
    image: "",
    price: 0,
    options: { title: "", subOptions: [] },
  });
  const [newSubOption, setNewSubOption] = useState({
    title: "",
    price: 0,
    image: "",
  });
  const [editingTileIndex, setEditingTileIndex] = useState(null);
  const [editingSubOptionIndex, setEditingSubOptionIndex] = useState(null);
  const [editedTilePrice, setEditedTilePrice] = useState(0);
  const [editedSubOptionPrice, setEditedSubOptionPrice] = useState(0);
  const [showSubOptionForm, setShowSubOptionForm] = useState(null); // Control form visibility

  // Handle input changes for the new tile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle sub-option input changes
  const handleSubOptionChange = (e) => {
    const { name, value } = e.target;
    setNewSubOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new tile option
  const handleAddTile = () => {
    if (!newTile.title || newTile.price <= 0) {
      alert("Please fill out the tile title and price.");
      return;
    }

    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      bathroomTile: {
        ...prevBathroom.bathroomTile,
        options: [...prevBathroom.bathroomTile.options, newTile],
      },
    }));

    // Reset form after adding
    setNewTile({
      title: "",
      image: "",
      price: 0,
      options: { title: "", subOptions: [] },
    });
  };

  // Add a new sub-option
  const handleAddSubOption = (tileIndex) => {
    if (!newSubOption.title || newSubOption.price <= 0) {
      alert("Please fill out the sub-option title and price.");
      return;
    }

    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.bathroomTile.options];
      const selectedTile = updatedOptions[tileIndex];

      // Add sub-option to the selected tile's options
      if (!selectedTile.options.subOptions) {
        selectedTile.options.subOptions = [];
      }

      selectedTile.options.subOptions.push(newSubOption);
      return {
        ...prevBathroom,
        bathroomTile: {
          ...prevBathroom.bathroomTile,
          options: updatedOptions,
        },
      };
    });

    // Reset sub-option form
    setNewSubOption({ title: "", price: 0, image: "" });
    setShowSubOptionForm(null); // Close the form after adding the sub-option
  };

  // Delete a tile option
  const handleDeleteTile = (index) => {
    setBathroom((prevBathroom) => ({
      ...prevBathroom,
      bathroomTile: {
        ...prevBathroom.bathroomTile,
        options: prevBathroom.bathroomTile.options.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Delete a sub-option
  const handleDeleteSubOption = (tileIndex, subOptionIndex) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.bathroomTile.options];
      updatedOptions[tileIndex].options.subOptions = updatedOptions[
        tileIndex
      ].options.subOptions.filter((_, i) => i !== subOptionIndex);

      return {
        ...prevBathroom,
        bathroomTile: {
          ...prevBathroom.bathroomTile,
          options: updatedOptions,
        },
      };
    });
  };

  // Enable editing mode for tile
  const handleEditTilePrice = (index) => {
    setEditingTileIndex(index);
    setEditedTilePrice(Bathroom.bathroomTile.options[index].price);
  };

  // Save the edited tile price
  const handleSaveTilePrice = (index) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.bathroomTile.options];
      updatedOptions[index].price = editedTilePrice;
      return {
        ...prevBathroom,
        bathroomTile: {
          ...prevBathroom.bathroomTile,
          options: updatedOptions,
        },
      };
    });
    setEditingTileIndex(null); // Exit edit mode
  };

  // Enable editing mode for sub-option
  const handleEditSubOptionPrice = (tileIndex, subOptionIndex) => {
    setEditingSubOptionIndex({ tileIndex, subOptionIndex });
    setEditedSubOptionPrice(
      Bathroom.bathroomTile.options[tileIndex].options.subOptions[
        subOptionIndex
      ].price
    );
  };

  // Save the edited sub-option price
  const handleSaveSubOptionPrice = (tileIndex, subOptionIndex) => {
    setBathroom((prevBathroom) => {
      const updatedOptions = [...prevBathroom.bathroomTile.options];
      updatedOptions[tileIndex].options.subOptions[
        subOptionIndex
      ].price = editedSubOptionPrice;
      return {
        ...prevBathroom,
        bathroomTile: {
          ...prevBathroom.bathroomTile,
          options: updatedOptions,
        },
      };
    });
    setEditingSubOptionIndex(null); // Exit edit mode
  };

  const handlebathroomTypeSubmit = () => {
          setCurrentForm("showerTiles")
  }

  return (
    <div className={`${currentForm === "bathroomTiles" ? "block" : "hidden"}`}>
      <h2 className="text-xl font-bold my-5">Add Bathroom Tile Options</h2>
      <Button
            leftIcon={<IoMdArrowRoundBack/>}
            variant={"outline"}
            onClick={() => setCurrentForm("bathroomEnclosure")}
          >
            Back to Bathroom Enclosure
          </Button>
      {/* Render existing tiles */}
      <div className="grid grid-cols-3 gap-5 mt-5">
        {Bathroom?.bathroomTile?.options?.map((tile, tileIndex) => (
          <div
            key={tileIndex}
            className="border p-3 rounded-md bg-gray-100"
          >
            <h3 className="font-bold text-lg flex items-center justify-between">
              {tile.title}
              <IconButton
                icon={<MdDelete />}
                onClick={() => handleDeleteTile(tileIndex)}
                size="sm"
                colorScheme="red"
              />
            </h3>
            <div className="flex items-center">
              <span className="mr-2">
                {editingTileIndex === tileIndex ? (
                  <Input
                    value={editedTilePrice}
                    onChange={(e) => setEditedTilePrice(e.target.value)}
                    type="number"
                    className="ml-2"
                  />
                ) : (
                  `$${tile.price}`
                )}
              </span>
              {editingTileIndex === tileIndex ? (
                <Button
                  onClick={() => handleSaveTilePrice(tileIndex)}
                  colorScheme="green"
                  size="sm"
                >
                  <MdSave /> Save
                </Button>
              ) : (
                <Button
                  onClick={() => handleEditTilePrice(tileIndex)}
                  colorScheme="yellow"
                  size="sm"
                >
                  <MdEdit /> Edit
                </Button>
              )}
            </div>

            {/* Render sub-options if available */}
            {tile.options?.subOptions?.length > 0 && (
              <div className="ml-4 mt-2">
                <h4 className="font-semibold">Sub-Options:</h4>
                {tile.options.subOptions.map((subOption, subOptionIndex) => (
                  <div
                    key={subOptionIndex}
                    className="flex items-center justify-between mb-2"
                  >
                    <div className="flex items-center">
                      <p>{subOption.title}</p>
                      <IconButton
                        icon={<MdDelete />}
                        onClick={() =>
                          handleDeleteSubOption(tileIndex, subOptionIndex)
                        }
                        size="sm"
                        colorScheme="red"
                        className="ml-2"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {editingSubOptionIndex?.tileIndex === tileIndex &&
                        editingSubOptionIndex?.subOptionIndex ===
                          subOptionIndex ? (
                          <Input
                            value={editedSubOptionPrice}
                            onChange={(e) =>
                              setEditedSubOptionPrice(e.target.value)
                            }
                            type="number"
                            className="ml-2"
                          />
                        ) : (
                          `$${subOption.price}`
                        )}
                      </span>

                      {editingSubOptionIndex?.tileIndex === tileIndex &&
                      editingSubOptionIndex?.subOptionIndex ===
                        subOptionIndex ? (
                        <Button
                          onClick={() =>
                            handleSaveSubOptionPrice(tileIndex, subOptionIndex)
                          }
                          colorScheme="green"
                          size="sm"
                        >
                          <MdSave /> Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleEditSubOptionPrice(tileIndex, subOptionIndex)
                          }
                          colorScheme="yellow"
                          size="sm"
                        >
                          <MdEdit /> Edit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Toggle form visibility for adding sub-option */}
            <Button
              onClick={() =>
                setShowSubOptionForm(
                  showSubOptionForm === tileIndex ? null : tileIndex
                )
              }
              colorScheme="blue"
              size="sm"
              className="mt-2"
            >
              {showSubOptionForm === tileIndex
                ? "Cancel Adding Sub-Option"
                : "Add Sub-Option"}
            </Button>

            {/* Form to add new sub-option, shown when button is clicked */}
            {showSubOptionForm === tileIndex && (
              <div className="mt-2">
                <Input
                  placeholder="Sub-option title"
                  name="title"
                  value={newSubOption.title}
                  onChange={handleSubOptionChange}
                  className="mb-2"
                />
                <Input
                  placeholder="Sub-option price"
                  name="price"
                  type="number"
                  value={newSubOption.price}
                  onChange={handleSubOptionChange}
                  className="mb-2"
                />
                <Button
                  onClick={() => handleAddSubOption(tileIndex)}
                  colorScheme="green"
                  size="sm"
                >
                  Add Sub-Option
                </Button>
              </div>
            )}
          </div>
        ))}
        {/* Form to add new tile */}
        <div className="border bg-green-100 rounded-md p-2">
          <h3 className="text-lg font-semibold">Add New Tile Option</h3>
          <Input
            placeholder="Tile title"
            name="title"
            value={newTile.title}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Input
            placeholder="Tile price"
            name="price"
            type="number"
            value={newTile.price}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Button onClick={handleAddTile} colorScheme="blue">
            Add Tile
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Button
          className="mt-4"
          colorScheme="blue"
          rightIcon={<GrFormNextLink/>}
          type="submit"
          onClick={handlebathroomTypeSubmit}
        >
          Submit Bathroom Tile
        </Button>
      </div>
    </div>
  );
};
