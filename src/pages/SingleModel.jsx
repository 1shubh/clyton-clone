import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { Loader } from "../components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";

export const SingleModel = () => {
  const { id } = useParams();
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const docRef = doc(db, "properties", id); // Replace 'models' with your collection name
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
    <div className="h-[100vh] flex p-5">
        {/* Images */}
      <div className="w-[70%]"></div>
      {/* other details */}
      <div className="w-[30%]">
        <div className="flex justify-between items-center">
            
          <p className="flex gap-2 items-center cursor-pointer text-sm" onClick={()=>navigate("/models")}> <IoMdArrowRoundBack />Back to the Product Page</p>
          <p className="font-bold text-[18px]">{modelData.modelNum}</p>
        </div>
      </div>
    </div>
  );
};
