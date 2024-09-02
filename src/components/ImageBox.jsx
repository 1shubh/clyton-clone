import React from "react";

export const ImageBox = ({ data, title, active, setActive }) => {
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
    
  return (
    <div className="mt-5">
      <p className="text-xl font-semibold">{title}</p>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {data?.map((ele, i) => {
          return (
            <div
              className={`px-2 py-3 font-semibold border border-gray-300 cursor-pointer rounded-md ${
                ele === active ? "bg-[#c5e5f8]" : ""
              }`}
              key={i}
              onClick={() => setActive(ele)}
            >
              <div className="w-full h-[150px] rounded-md">
                <img
                  src={ele.bgImage}
                  alt={ele.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <p>{ele.name}</p>
              <div
                className={`${
                  ele.price === 0 ? "hidden" : "block"
                } border-black border border-opacity-70 w-fit rounded-md transition-opacity duration-300 ease-in-out px-1 mt-2 h-6 flex items-center justify-center opacity-70 text-xs font-normal`}
              >
                <p className="text-sm font-semibold text-[#000000]">
                  + ${formatPrice(ele.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
