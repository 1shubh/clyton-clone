import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PropertyCard = ({
  id,
  images,
  name,
  area,
  address,
  bathroom,
  bedroom,
  bredth,
  bundlePrice,
  description,
  length,
  modelNum,
  price,
}) => {
  const navigate = useNavigate()
  const handleRoute = () => {
    navigate(`/models/${id}`)
  }
  return (
    <div key={id} className="border border-red-700 rounded-md p-2 shadow-lg">
      <div className="h-[200px]">
        <img
          src={images[0]}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-fit">
        <p className="uppercase font-semibold text-xl sm:text-lg">{name}</p>
        <p className="font-semibold sm:text-sm">
          ${price} (Before Options and Fees)
        </p>
        <p className="text-sm sm:text-[12px]">{address}</p>
        <p className="text-black font-semibold sm:text-sm">
          {bedroom} beds | {bathroom} bath | {area} sq. ft. |{" "}
          {length} x {bredth}
        </p>
      </div>
      <div className="flex gap-3 mt-5 sm:mt-2">
        <Button onClick={handleRoute}>Start Order</Button>
        {/* <Button>Start Stock Order</Button> */}
      </div>
    </div>
  );
};
