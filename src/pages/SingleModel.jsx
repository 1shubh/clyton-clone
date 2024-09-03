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
import { BathroomTypeCard } from "../components/BathroomTypeCard";
import { CheckboxCard } from "../components/CheckboxCard";
import { AppliancesPackageCard } from "../components/AppliancesPackageCard";

export const SingleModel = () => {
  const [activeSection, setActiveSection] = useState("floor-plan");
  const sectionRefs = useRef({
    "floor-plan": null,
    exterior: null,
    kitchen: null,
    interior: null,
    bathroom: null,
    flooring: null,
    appliances: null,
    advanceDetails: null,
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

  // interior
  const [activeInteriorDoorHandles, setActiveInteriorDoorHandles] = useState(
    data.interior.doorHandles.options[0]
  );
  const [activeInteriorWindow, setActiveWindow] = useState(
    data.interior.windowTreatment.options[0]
  );
  // Bathroom
  const [activeBathroomType, setActiveBathroomType] = useState(
    data.bathroom.bathroomType.options[0]
  );
  const [activeBathroomEnclosure, setActiveBathroomEnclosure] = useState(
    data.bathroom.bathroomEnclosure.options[0]
  );
  const [activeBathroomTile, setActiveBathroomTile] = useState(
    data.bathroom.bathroomTile.options[0]
  );
  const [activeBathroomTileType, setActiveBathroomTileType] = useState({});
  const [activeSuboption, setActiveSuboption] = useState({});
  const [activeShowertiles, setActiveShowerTiles] = useState(
    data.bathroom.showerAndTiles.options[0]
  );
  const [activeBathroomMirror, setActiveBathroomMirror] = useState(
    data.bathroom.mirror.options[0]
  );
  const [activeBathroomVanity, setActiveBathroomVanity] = useState(
    data.bathroom.vanityLighting.options[0]
  );
  const [activeBathroomHardware, setActiveBathroomHardware] = useState(
    data.bathroom.hardware.options[0]
  );

  // Flooring
  const [
    activeKitchenBathroomFlooring,
    setActiveKitchenBathroomFlooring,
  ] = useState(data.flooring.kitchenflooringMaterial.options[0]);

  const [
    activeKitchenBathroomFlooringType,
    setActiveKithcenBathroomFlooringType,
  ] = useState(activeKitchenBathroomFlooring.options[0]);
  const [activeLeavingRoomFlooring, setActiveLeavingRoomFlooring] = useState(
    data.flooring.leavingRoomFlooringMaterial.options[0]
  );
  const [leavingRoomFlooringMaterial, setLivingRoomFlooringMaterial] = useState(
    activeLeavingRoomFlooring.subOptions[0]
  );
  const [
    activeBedroomFlooringMaterial,
    setActiveBedroomFlooringMaterial,
  ] = useState(data.flooring.bedroomFlooringMaterial.options[0]);

  // Appliances
  const [activeAppliances, setActiveAppliances] = useState(
    data.appliances.types[0]
  );
  const [activeAppliancesPackage, setActiveAppliancesPackage] = useState(
    activeAppliances.package[0]
  );
  const [activeCustomAppliances, setActiveCustomAppliances] = useState(null);
  const [activeCustomRefrigirator, setActiveRefrigirator] = useState({});
  const [activeRange, setActiveRange] = useState({});
  useEffect(() => {
    if (activeCustomAppliances != null) {
      setActiveRefrigirator(activeCustomAppliances.refrigirator.category[0]);
    } else {
      setActiveRefrigirator({});
    }
  }, [activeCustomAppliances]);
  useEffect(() => {
    if (
      activeCustomRefrigirator &&
      activeCustomRefrigirator.subCategory &&
      activeCustomRefrigirator.subCategory.options
    ) {
      setActiveRange(activeCustomRefrigirator.subCategory.options[0]);
    } else {
      setActiveRange({});
    }
  }, [activeCustomRefrigirator]);
  const [activeDishwasher, setActiveDishwasher] = useState(
    data.appliances.dishwasher.package[0]
  );
  // Advance details
  const [activeCeilingHeight, setActiveCeilingHeight] = useState(
    data.advanceDetails.celingHeight.options[0]
  );
  const [activeStrucure, setActiveStructure] = useState(
    data.advanceDetails.structuralUpgrades.options[0]
  );
  const [activeSideWall, setActiveSideWall] = useState(
    data.advanceDetails.sidewallDimenstions.options[0]
  );
  const [activeInsulationOption, setActiveInsulationOption] = useState(
    data.advanceDetails.insulationOptions.options[0]
  );

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
        case "interior":
          setActiveObject(data.interior);
          break;
        case "bathroom":
          setActiveObject(data.bathroom);
          break;
        case "flooring":
          setActiveObject(data.flooring);
          break;
        case "appliances":
          setActiveObject(data.appliances);
          break;
        case "advance-details":
          setActiveObject(data.advanceDetails);
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
      <div
        className={`w-[70%] 2xl:w-[65%] h-screen ${
          isImageFixed ? "fixed top-0" : ""
        }`}
      >
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
        className={`w-[30%] 2xl:w-[35%] p-5 bg-white right-0 ${
          isImageFixed ? "absolute right-1" : ""
        }`}
      >
        <div
          className={` bg-white z-10 pb-5 ${
            isImageFixed
              ? "fixed top-0 right-0 w-[30%] 2xl:w-[35%] py-5 bg-white"
              : ""
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

        <div className="">
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
          {/* Interior */}
          <div
            className="mt-5"
            id="interior"
            ref={(el) => (sectionRefs.current["interior"] = el)}
          >
            <h2 className="text-[30px] font-semibold">{data.interior.title}</h2>
            {/* interior door handles */}
            <ImageBox
              title={data.interior.doorHandles.title}
              data={data.interior.doorHandles.options}
              active={activeInteriorDoorHandles}
              setActive={setActiveInteriorDoorHandles}
            />
            {/* interior window treatment */}
            <ImageBox
              title={data.interior.windowTreatment.title}
              data={data.interior.windowTreatment.options}
              active={activeInteriorWindow}
              setActive={setActiveWindow}
            />
          </div>
          {/* Bathroom */}
          <div
            className="mt-5"
            id="bathroom"
            ref={(el) => (sectionRefs.current["bathroom"] = el)}
          >
            <h2 className="text-[30px] font-semibold">{data.bathroom.title}</h2>
            {/* bathroom type */}
            <p className="text-xl font-semibold">
              {data.bathroom.bathroomType.title}
            </p>
            <div className="mt-5">
              {data.bathroom.bathroomType.options.map((ele, i) => {
                return (
                  <OptionCard
                    key={i}
                    option={ele}
                    activeObj={activeBathroomType}
                    setActiveObj={setActiveBathroomType}
                  />
                );
              })}
            </div>
            {/* Bathroom Enclosure */}
            <p className="text-xl font-semibold mt-5">
              {data.bathroom.bathroomEnclosure.title}
            </p>
            <div className="mt-5">
              {data.bathroom.bathroomEnclosure.options.map((ele, i) => {
                return (
                  <OptionCard
                    key={i}
                    option={ele}
                    activeObj={activeBathroomEnclosure}
                    setActiveObj={setActiveBathroomEnclosure}
                  />
                );
              })}
            </div>
            {/* Bathroom tiles */}
            <p className="text-xl font-semibold mt-5">
              {data.bathroom.bathroomTile.title}
            </p>
            <div className="mt-5">
              {data.bathroom.bathroomTile.options?.map((ele, i) => {
                return (
                  <BathroomTypeCard
                    key={i}
                    option={ele}
                    activeObj={activeBathroomTile}
                    setActiveObj={setActiveBathroomTile}
                    activeType={activeBathroomTileType}
                    setActiveType={setActiveBathroomTileType}
                  />
                );
              })}
            </div>
            {/* bathroom tile Walls options or types */}
            <div className="mt-5">
              <p className="text-xl font-semibold mt-5">
                {activeBathroomTileType?.title}
              </p>
              <div className="mt-5">
                {Object.keys(activeBathroomTileType).length === 0 ? (
                  <></>
                ) : (
                  activeBathroomTileType.subOptions.map((ele, i) => {
                    return (
                      <CheckboxCard
                        key={i}
                        option={ele}
                        activeObj={activeSuboption}
                        setActiveObj={setActiveSuboption}
                      />
                    );
                  })
                )}
              </div>
            </div>
            {/* shower tiles */}
            <ImageBox
              title={data.bathroom.showerAndTiles.title}
              data={data.bathroom.showerAndTiles.options}
              active={activeShowertiles}
              setActive={setActiveShowerTiles}
            />
            {/* Bathroom mirrors */}
            <ImageBox
              title={data.bathroom.mirror.title}
              data={data.bathroom.mirror.options}
              active={activeBathroomMirror}
              setActive={setActiveBathroomMirror}
            />
            {/* vanity lighting */}
            <ImageBox
              title={data.bathroom.vanityLighting.title}
              data={data.bathroom.vanityLighting.options}
              active={activeBathroomVanity}
              setActive={setActiveBathroomVanity}
            />
            {/* Hardware */}
            <ImageBox
              title={data.bathroom.hardware.title}
              data={data.bathroom.hardware.options}
              active={activeBathroomHardware}
              setActive={setActiveBathroomHardware}
            />
          </div>
          {/* Flooring */}
          <div
            className="mt-5"
            id="flooring"
            ref={(el) => (sectionRefs.current["flooring"] = el)}
          >
            <h2 className="text-[30px] font-semibold">{data.flooring.title}</h2>
            {/* Kichen Bathroom Flooring Material */}
            <p className="text-xl font-semibold mt-5">
              {data.flooring.kitchenflooringMaterial.title}
            </p>
            {data.flooring.kitchenflooringMaterial.options.map((ele, i) => (
              <OptionCard
                key={i}
                option={ele}
                activeObj={activeKitchenBathroomFlooring}
                setActiveObj={setActiveKitchenBathroomFlooring}
              />
            ))}
            {/* type of Kitchen bathroom flooring material */}
            <div>
              <ImageBox
                title={activeKitchenBathroomFlooring.subheading}
                data={activeKitchenBathroomFlooring.options}
                active={activeKitchenBathroomFlooringType}
                setActive={setActiveKithcenBathroomFlooringType}
              />
            </div>
            {/* living room flooring */}
            <p className="text-xl font-semibold mt-5">
              {data.flooring.leavingRoomFlooringMaterial.title}
            </p>
            <div className="mt-5">
              {data.flooring.leavingRoomFlooringMaterial.options.map(
                (ele, i) => (
                  <OptionCard
                    option={ele}
                    key={i}
                    activeObj={activeLeavingRoomFlooring}
                    setActiveObj={setActiveLeavingRoomFlooring}
                  />
                )
              )}
            </div>
            <ImageBox
              title={activeLeavingRoomFlooring.subheading}
              data={activeLeavingRoomFlooring.subOptions}
              active={leavingRoomFlooringMaterial}
              setActive={setLivingRoomFlooringMaterial}
            />
            {/* bedroom flooring */}
            <p className="text-xl font-semibold mt-5">
              {data.flooring.bedroomFlooringMaterial.title}
            </p>
            <div className="mt-5">
              {data.flooring.bedroomFlooringMaterial.options.map((ele, i) => (
                <OptionCard
                  option={ele}
                  key={i}
                  activeObj={activeBedroomFlooringMaterial}
                  setActiveObj={setActiveBedroomFlooringMaterial}
                />
              ))}
            </div>
            <ImageBox
              title={activeBedroomFlooringMaterial.subheading}
              data={activeBedroomFlooringMaterial.subOptions}
              active={leavingRoomFlooringMaterial}
              setActive={setLivingRoomFlooringMaterial}
            />
          </div>
          {/* Appliances */}
          <div
            className="mt-5"
            id="appliances"
            ref={(el) => (sectionRefs.current["appliances"] = el)}
          >
            <h2 className="text-[30px] font-semibold">
              {data.appliances.title}
            </h2>
            <p className="text-base font-normal text-gray-600 text-[16px]">
              {data.appliances.note}
            </p>
            <div className="mt-5">
              {data.appliances.types.map((ele, i) => {
                return (
                  <OptionCard
                    option={ele}
                    key={i}
                    activeObj={activeAppliances}
                    setActiveObj={setActiveAppliances}
                  />
                );
              })}
            </div>
            <p className="text-xl font-semibold mt-5">
              {activeAppliances.subtitle}
            </p>
            <div className="mt-5">
              {activeAppliances.package.map((ele, i) => {
                return (
                  <AppliancesPackageCard
                    key={i}
                    option={ele}
                    activeObj={activeAppliancesPackage}
                    setActiveObj={setActiveAppliancesPackage}
                    setActiveCustom={setActiveCustomAppliances}
                  />
                );
              })}
            </div>
            {/* Refrigirator for custome selection */}
            <p className="text-xl font-semibold mt-5">
              {activeCustomAppliances != null
                ? activeCustomAppliances.refrigirator.title
                : ""}
            </p>
            <div className="mt-5">
              {activeCustomAppliances != null
                ? activeCustomAppliances.refrigirator.category.map((ele, i) => {
                    return (
                      <OptionCard
                        key={i}
                        option={ele}
                        activeObj={activeCustomRefrigirator}
                        setActiveObj={setActiveRefrigirator}
                      />
                    );
                  })
                : ""}
            </div>
            {/* Choose your range */}
            <p className="text-xl font-semibold mt-5">
              {activeCustomRefrigirator && activeCustomRefrigirator.subCategory
                ? activeCustomRefrigirator.subCategory.title
                : ""}
            </p>
            <div className="mt-5">
              {activeCustomRefrigirator && activeCustomRefrigirator.subCategory
                ? activeCustomRefrigirator.subCategory.options.map((ele, i) => {
                    return (
                      <OptionCard
                        key={i}
                        option={ele}
                        activeObj={activeRange}
                        setActiveObj={setActiveRange}
                      />
                    );
                  })
                : ""}
            </div>
            {/* Dishwasher */}
            <p className="text-xl font-semibold mt-5">
              {data.appliances.dishwasher.title}
            </p>
            <div className="mt-5">
              {data.appliances.dishwasher.package.map((ele, i) => {
                return (
                  <OptionCard
                    option={ele}
                    key={i}
                    activeObj={activeDishwasher}
                    setActiveObj={setActiveDishwasher}
                  />
                );
              })}
            </div>
          </div>
          {/* advance details */}
          <div
            className="mt-5"
            id="advance-details"
            ref={(el) => (sectionRefs.current["advance-details"] = el)}
          >
            <h2 className="text-[30px] font-semibold">
              {data.advanceDetails.title}
            </h2>
            {/* Celing Height */}
            <div className="mt-5">
              <p className="text-xl font-semibold">
                {data.advanceDetails.celingHeight.title}
              </p>
              <div className="mt-5">
                {data.advanceDetails.celingHeight.options.map((ele, i) => {
                  return (
                    <OptionCard
                      option={ele}
                      key={i}
                      activeObj={activeCeilingHeight}
                      setActiveObj={setActiveCeilingHeight}
                    />
                  );
                })}
              </div>
            </div>
            {/* strucural upgrade */}
            <div className="mt-5">
              <p className="text-xl font-semibold">
                {data.advanceDetails.structuralUpgrades.title}
              </p>
              <div className="mt-5">
                {data.advanceDetails.celingHeight.options.map((ele, i) => {
                  return (
                    <CheckboxCard
                      option={ele}
                      key={i}
                      activeObj={activeStrucure}
                      setActiveObj={setActiveStructure}
                    />
                  );
                })}
              </div>
            </div>
            {/* sidewall dimensions */}
            <div className="mt-5">
              <p className="text-xl font-semibold">
                {data.advanceDetails.sidewallDimenstions.title}
              </p>
              <div className="mt-5">
                {data.advanceDetails.sidewallDimenstions.options.map(
                  (ele, i) => {
                    return (
                      <OptionCard
                        option={ele}
                        key={i}
                        activeObj={activeSideWall}
                        setActiveObj={setActiveSideWall}
                      />
                    );
                  }
                )}
              </div>
            </div>
            {/* insulation */}
            <div className="mt-5">
              <p className="text-xl font-semibold">
                {data.advanceDetails.insulationOptions.title}
              </p>
              <div className="mt-5">
                {data.advanceDetails.insulationOptions.options.map((ele, i) => {
                  return (
                    <OptionCard
                      option={ele}
                      key={i}
                      activeObj={activeInsulationOption}
                      setActiveObj={setActiveInsulationOption}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Active Object Details */}
      </div>
    </div>
  );
};
