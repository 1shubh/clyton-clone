import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { Loader } from "../components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { data } from "../utils";

export const SingleModel = () => {
  const { id } = useParams();
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeObj, setActiveObj] = useState(data.floorPlan.options[0]); // Default to the first option

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setModelData(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching document:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchModelData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center h-[100vh] flex items-center justify-center">
        No Property Found
      </p>
    );
  }

  return (
    <div className="flex w-full">
      {/* Fixed Image Section */}
      <div className="w-[70%] border">
        <img
          src={activeObj.image}
          alt={activeObj.title}
          className="w-full"
        />
      </div>

      {/* Right-Side Content */}
      <div className="w-[30%] p-5">
        <div className="flex justify-between items-center bg-white pb-5">
          <p
            className="flex gap-2 items-center cursor-pointer text-sm"
            onClick={() => navigate("/models")}
          >
            <IoMdArrowRoundBack />
            Back to the Product Page
          </p>
          <p className="font-bold text-[18px]">{modelData.modelNum}</p>
        </div>

        {/* Active Object Details */}
        <div className="mt-5">
          <h2 className="text-lg font-semibold">{activeObj.title}</h2>
          <p>Price: ${activeObj.price}</p>

          {/* Scrollable Floor Plan Options */}
          <div className="mt-5 max-h-[60vh] overflow-y-auto">
            {data.floorPlan.options.map((option, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2 mb-2 border rounded ${
                  option.title === activeObj.title ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setActiveObj(option)}
              >
                <p>{option.title}</p>
                <p>Price: ${option.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
