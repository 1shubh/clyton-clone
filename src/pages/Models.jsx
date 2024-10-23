import { Button, Select } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../Redux/PropertySlice";
import { PropertyCard } from "../components/PropertyCard";
import { Loader } from "../components/Loader";

export const Models = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(
    (state) => state.properties
  );
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="bg-[#fd211e] p-20">
        <p className="text-white text-6xl sm:text-4xl text-center">
          Order/Quote Builder
        </p>
      </div>
      {/* Orders data */}
      <div className="py-5">
        <Select
          w={{ lg: "20%", base: "80%", md: "50%", sm: "100%" }}
          margin={"auto"}
        >
          <option>All Sizes</option>
          <option>Single-Section</option>
          <option>Multi-Section</option>
        </Select>
      </div>
      {/* Properties */}
      {properties.length === 0 ? (
        <p className="text-center font-bold text-xl">No Properties Found</p>
      ) : (
        <div className="grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-5 p-10 lg:p-5">
          {properties.map((ele) => {
            
            return (
              <PropertyCard
                name={ele.propertyDetails.name}
                images={ele.propertyDetails.images}
                id={ele.id}
                area={ele.propertyDetails.area}
                address={ele.propertyDetails.address}
                bathroom={ele.propertyDetails.bathroom}
                bredth={ele.propertyDetails.bredth}
                length={ele.propertyDetails.length}
                 price={ele.propertyDetails.price}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
