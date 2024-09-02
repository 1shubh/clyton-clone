import React from "react";

export const ImageColorCard = ({ data, title, active, setActive }) => {
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
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <p>{ele.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
