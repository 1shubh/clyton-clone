import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { Loader } from "../components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { data } from "../utils";
import { FloorOptionCard } from "../components/FloorPlan/FloorOptionCard";
import { OptionCard } from "../components/OptionCard";
import { ColorCard } from "../components/ColorCard";
import { ColorContainer } from "../components/ColorContainer";
import { ImageColorCard } from "../components/ImageColorCard";
import { ImageBox } from "../components/ImageBox";

export const SingleModel = () => {
  const [activeSection, setActiveSection] = useState("floor-plan");
  const sectionRefs = useRef({
    "floor-plan": null,
    exterior: null,
    kitchen: null,
  });
  const [isImageFixed, setIsImageFixed] = useState(false);
  const navbarHeight = 80;

  const { id } = useParams();
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeObject, setActiveObject] = useState(data.floorPlan);
  const [activeFloorPlan, setActiveFloorPlan] = useState(
    data.floorPlan.options[0]
  );
  const [currentImage, setCurrentImage] = useState(data.floorPlan.image);

  const [activeSidingType, setActiveSidingType] = useState(
    data.exterior.sidingType.options[0]
  );
  const [activeExteriorBodyColor, setActiveExteriorBodyColor] = useState(
    data.exterior.bodyColor.options[0]
  );
  const [activeExteriorAccentColor, setActiveExteriorAccentColor] = useState(
    data.exterior.accentColor.options[0]
  );
  const [activeExteriorTrimColor, setActiveExteriorTrimColor] = useState(
    data.exterior.trimColor.options[0]
  );
  const [activeExteriorDoorPaint, setActiveExteriorDoorPaint] = useState(
    data.exterior.doorPaint.options[0]
  );
  const [activeShinglesMaterial, setActiveShinglesMaterial] = useState(
    data.exterior.shiglesMaterial.options[0]
  );
  const [activeShinglesType, setActiveShinglesType] = useState(
    activeShinglesMaterial.types[0]
  );
  const [activeExteriorDoors, setActiveExteriorDoors] = useState(
    data.exterior.exteriorDoors.options[0]
  );

  // Kitchen
  const [activeKitchenCounterTop, setActiveKitchenCounterTop] = useState(
    data.kitchen.counterTopMaterial.options[0]
  );
  const [activeCounterTopMaterial, setActiveCounterTopMaterial] = useState(
    activeKitchenCounterTop.types[0]
  );
  const [activeFlatCabinates, setActiveFlatCabinates] = useState(
    data.kitchen.flatPanelCabinets.options[0]
  );
  const [activecabinateHardware, setActiveCabinateHardware] = useState(
    data.kitchen.cabinetHardware.options[0]
  );
  const [activeTileBacksplash, setActiveTileBacksplash] = useState(
    data.kitchen.tileBacksplash.options[0]
  );
  const [activeBacksplashtile, setActivebacksplashTile] = useState(
    data.kitchen.backsplashTile.options[0]
  );
  const [
    activeKitchenFlooringMaterial,
    setActiveKitchenFlooringMaterial,
  ] = useState(data.kitchen.flooringMaterial.options[0]);
  const [activeFlooringType, setActiveFlooringType] = useState(
    activeKitchenFlooringMaterial.types[0]
  );
  const [activeKitchenFucet, setActiveKitchenFucet] = useState(
    data.kitchen.kitchenFaucets.options[0]
  );
  const [activeKitchenSinks, setActiveKitchenSinks] = useState(
    data.kitchen.kitchenSinks.options[0]
  );
  // console.log(activeCounterTopMaterial)
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

  useEffect(() => {
    setCurrentImage(data.floorPlan.image);
  }, [activeFloorPlan, activeShinglesMaterial]);

  // Scroll Event Listener for Active Section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + navbarHeight + 10;
      let currentSection = "floor-plan";

      Object.entries(sectionRefs.current).forEach(([section, ref]) => {
        if (ref && ref.offsetTop <= scrollPosition) {
          currentSection = section;
        }
      });

      setActiveSection(currentSection);

      // Set activeObject based on the current section
      switch (currentSection) {
        case "floor-plan":
          setActiveObject(data.floorPlan);
          break;
        case "exterior":
          setActiveObject(data.exterior);
          break;
        case "kitchen":
          setActiveObject(data.kitchen);
          break;
        default:
          setActiveObject(data.floorPlan); // Default to floor plan if no match
          break;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(activeObject);

  // Scroll effect for image container
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > navbarHeight) {
        setIsImageFixed(true);
      } else {
        setIsImageFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className="flex w-full relative">
      {/* Fixed Image Section */}
      <div className={`w-[70%] h-screen ${isImageFixed ? "fixed top-0" : ""}`}>
        <div
          style={{
            transform: activeFloorPlan.rotate, // Apply the rotation based on the active option
            transition: "transform 0.3s ease",
          }}
        >
          <img
            src={currentImage}
            alt={activeFloorPlan.title}
            className="w-full"
          />
        </div>
      </div>

      {/* Right-Side Content */}
      <div
        className={`w-[30%] p-5 bg-white right-0 ${
          isImageFixed ? "absolute right-1" : ""
        }`}
      >
        <div
          className={` bg-white z-10 pb-5 ${
            isImageFixed ? "fixed top-0 right-0 w-[30%] py-5 bg-white" : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <p
              className="flex gap-2 items-center cursor-pointer text-sm"
              onClick={() => navigate("/models")}
            >
              <IoMdArrowRoundBack />
              Back to the Product Page
            </p>
            <p className="font-bold text-[18px]">{modelData?.modelNum}</p>
          </div>
          <h2 className="text-[30px] font-semibold">{activeObject.title}</h2>
        </div>

        <div className="overflow-y-auto">
          {/* Floor Plan */}
          <div
            id="floor-plan"
            ref={(el) => (sectionRefs.current["floor-plan"] = el)}
          >
            {/* <h2 className="text-[30px] font-semibold">
              {data.floorPlan.title}
            </h2> */}
            <p className="text-xl font-semibold">{data.floorPlan.subtitle}</p>
            <div className="mt-5">
              {data.floorPlan.options.map((option, index) => (
                <FloorOptionCard
                  key={index}
                  option={option}
                  activeObj={activeFloorPlan}
                  setActiveObj={setActiveFloorPlan}
                />
              ))}
            </div>
          </div>
          {/* Exterior */}
          <div
            className="mt-5"
            id="exterior"
            ref={(el) => (sectionRefs.current["exterior"] = el)}
          >
            <h2 className="text-[30px] font-semibold">{data.exterior.title}</h2>
            <p className="text-xl font-semibold">
              {data.exterior.sidingType.title}
            </p>
            {/* exterior siding type */}
            <div className="mt-5">
              {data.exterior.sidingType.options.map((ele, index) => {
                return (
                  <OptionCard
                    key={index}
                    option={ele}
                    activeObj={activeSidingType}
                    setActiveObj={setActiveSidingType}
                  />
                );
              })}
            </div>
            {/* Exterior Body color */}
            <ColorContainer
              title={data.exterior.bodyColor.title}
              data={data.exterior.bodyColor.options}
              activeColor={activeExteriorBodyColor}
              setActiveColor={setActiveExteriorBodyColor}
            />
            {/* Exterior Accent color */}
            <ColorContainer
              title={data.exterior.accentColor.title}
              data={data.exterior.accentColor.options}
              activeColor={activeExteriorAccentColor}
              setActiveColor={setActiveExteriorAccentColor}
            />
            {/*  Exterior Trim Color*/}
            <ColorContainer
              title={data.exterior.trimColor.title}
              data={data.exterior.trimColor.options}
              activeColor={activeExteriorTrimColor}
              setActiveColor={setActiveExteriorTrimColor}
            />
            {/* Exterior Door Paint */}
            <ColorContainer
              title={data.exterior.doorPaint.title}
              data={data.exterior.doorPaint.options}
              activeColor={activeExteriorDoorPaint}
              setActiveColor={setActiveExteriorDoorPaint}
            />
            {/* Shingles Material */}
            <div className="mt-5">
              <p className="text-xl font-semibold">
                {data.exterior.shiglesMaterial.title}
              </p>
              <div className="mt-5">
                {data.exterior.shiglesMaterial.options.map((ele, index) => {
                  return (
                    <OptionCard
                      key={index}
                      option={ele}
                      activeObj={activeShinglesMaterial}
                      setActiveObj={setActiveShinglesMaterial}
                    />
                  );
                })}
              </div>
              {/* Active Shingles material type */}
              <ImageColorCard
                title={activeShinglesMaterial.subtitle}
                data={activeShinglesMaterial.types}
                active={activeShinglesType}
                setActive={setActiveShinglesType}
              />
              {/* Doors */}
              <p className="text-xl font-semibold mt-5">
                {data.exterior.exteriorDoors.title}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-5">
                {data.exterior.exteriorDoors.options?.map((ele, i) => {
                  return (
                    <div
                      className={`px-2 py-3 font-semibold border border-gray-300 cursor-pointer rounded-md ${
                        ele === activeExteriorDoors ? "bg-[#c5e5f8]" : ""
                      }`}
                      key={i}
                      onClick={() => setActiveExteriorDoors(ele)}
                    >
                      <div className="w-full h-[150px] rounded-md">
                        <img
                          src={ele.image}
                          alt={ele.name}
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                      <p>{ele.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Kitchen */}
          <div
            className="mt-5"
            id="kitchen"
            ref={(el) => (sectionRefs.current["kitchen"] = el)}
          >
            <h2 className="text-[30px] font-semibold">{data.kitchen.title}</h2>
            <div className="mt-5">
              <p className="text-xl font-semibold">Countertop material</p>
              <div className="mt-5">
                {data.kitchen.counterTopMaterial.options.map((ele, i) => {
                  return (
                    <OptionCard
                      key={i}
                      option={ele}
                      activeObj={activeKitchenCounterTop}
                      setActiveObj={setActiveKitchenCounterTop}
                    />
                  );
                })}
              </div>
              <ImageBox
                title={activeKitchenCounterTop.subTitle}
                data={activeKitchenCounterTop.types}
                active={activeCounterTopMaterial}
                setActive={setActiveCounterTopMaterial}
              />
              {/* kitchen flat cabinates */}
              <ImageBox
                title={data.kitchen.flatPanelCabinets.title}
                data={data.kitchen.flatPanelCabinets.options}
                active={activeFlatCabinates}
                setActive={setActiveFlatCabinates}
              />
              {/* cabinates hardware */}
              <ImageBox
                title={data.kitchen.cabinetHardware.title}
                data={data.kitchen.cabinetHardware.options}
                active={activecabinateHardware}
                setActive={setActiveCabinateHardware}
              />
              {/* tile backsplash */}
              <ImageBox
                title={data.kitchen.tileBacksplash.title}
                data={data.kitchen.tileBacksplash.options}
                active={activeTileBacksplash}
                setActive={setActiveTileBacksplash}
              />
              {/* Backsplash Tile */}
              <ImageBox
                title={data.kitchen.backsplashTile.title}
                data={data.kitchen.backsplashTile.options}
                active={activeBacksplashtile}
                setActive={setActivebacksplashTile}
              />
              {/* Flooring material */}
              <p className="text-xl font-semibold mt-5">
                {data.kitchen.flooringMaterial.title}
              </p>
              {data.kitchen.flooringMaterial.options.map((ele, i) => (
                <OptionCard
                  key={i}
                  option={ele}
                  activeObj={activeKitchenFlooringMaterial}
                  setActiveObj={setActiveKitchenFlooringMaterial}
                />
              ))}
              <ImageBox
                title={activeKitchenFlooringMaterial.subtitle}
                data={activeKitchenFlooringMaterial.types}
                active={activeFlooringType}
                setActive={setActiveFlooringType}
              />
              <ImageBox
                title={data.kitchen.kitchenFaucets.title}
                data={data.kitchen.kitchenFaucets.options}
                active={activeKitchenFucet}
                setActive={setActiveKitchenFucet}
              />
              <ImageBox
                title={data.kitchen.kitchenSinks.title}
                data={data.kitchen.kitchenSinks.options}
                active={activeKitchenSinks}
                setActive={setActiveKitchenSinks}
              />
            </div>
          </div>
        </div>
        {/* Active Object Details */}
      </div>
    </div>
  );
};
