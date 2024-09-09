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
import { PriceCard } from "../components/PriceCard";
import ExteriorSection from "../components/SingleProperty/ExteriorSection";
import KitchenSection from "../components/SingleProperty/KitchenSection";
import InteriorSection from "../components/SingleProperty/InteriorSection";
import BathroomSection from "../components/SingleProperty/BathroomSection";
import FlooringSection from "../components/SingleProperty/FlooringSection";
import AppliancesSection from "../components/SingleProperty/AppliancesSection";
import AdvanceDetailsSection from "../components/SingleProperty/AdvanceDetailsSection";
import { ExteriorUpgrades } from "../components/SingleProperty/ExteriorUpgrades";
import { KitchenUpgrades } from "../components/SingleProperty/KitchenUpgrades";
import { InteriorUpgrades } from "../components/SingleProperty/InteriorUpgrades";
import { BathroomUpgrades } from "../components/SingleProperty/BathroomUpgrades";
import { FlooringUpgrades } from "../components/SingleProperty/FlooringUpgrades";
import { AppliancesUpgrade } from "../components/SingleProperty/AppliancesUpgrade";
import { AdvanceDetailsUpgrade } from "../components/SingleProperty/AdvanceDetailsUpgrade";
import { Button } from "@chakra-ui/react";
import useInView from "../hooks/useInView";

export const SingleModel = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeSection, setActiveSection] = useState("floor-plan");
  const sectionRefs = useRef({
    "floor-plan": null,
    exterior: null,
    kitchen: null,
    interior: null,
    bathroom: null,
    flooring: null,
    appliances: null,
    "advance-details": null,
    "your-home": null,
  });

  const [isImageFixed, setIsImageFixed] = useState(false);
  const navbarHeight = 80;
  const { id } = useParams();
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Floor Plan
  const [activeObject, setActiveObject] = useState(data.floorPlan);
  const [activeFloorPlan, setActiveFloorPlan] = useState(
    data.floorPlan.options[0]
  );
  const [currentImage, setCurrentImage] = useState(data.floorPlan.image);
  let FloorArray = [activeFloorPlan];
  // Exterior
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
  // console.log(activeBathroomTile);
  // console.log(activeBathroomTileType);
  const [activeSuboption, setActiveSuboption] = useState([]);
  const [activeSuboptionTotal, setActiveSubOptionTotal] = useState(0);
  useEffect(() => {
    const total = activeSuboption.reduce((sum, item) => sum + item.price, 0);
    setActiveSubOptionTotal(total);
  }, [activeSuboption]);

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
  // console.log(activeCustomAppliances);
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
  const [activeStructure, setActiveStructure] = useState([]);
  const [activeStructureTotal, setActiveStructureTotal] = useState(0);
  useEffect(() => {
    const total = activeStructure.reduce((sum, item) => sum + item.price, 0);
    setActiveStructureTotal(total);
  }, [activeStructure]);
  // console.log(activeStructureTotal)
  const [activeSideWall, setActiveSideWall] = useState(
    data.advanceDetails.sidewallDimenstions.options[0]
  );
  const [activeInsulationOption, setActiveInsulationOption] = useState(
    data.advanceDetails.insulationOptions.options[0]
  );

  // upgrades total
  const [upgrades, setUpgrades] = useState(0);
  // console.log(upgrades);
  // Fetch the data from the api
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
        case "your-home":
          setActiveObject({
            title: "Your Home",
            image: data.advanceDetails.image,
          });
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
  }, [navbarHeight, data]); // Make sure to add dependencies

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

  // total upgrades
  useEffect(() => {
    const activeItems = [
      activeFloorPlan,
      activeSidingType,
      activeShinglesMaterial,
      activeShinglesType,
      activeExteriorDoors,
      activeKitchenCounterTop,
      activeCounterTopMaterial,
      activeFlatCabinates,
      activecabinateHardware,
      activeTileBacksplash,
      activeBacksplashtile,
      activeKitchenFlooringMaterial,
      activeFlooringType,
      activeKitchenFucet,
      activeInteriorDoorHandles,
      activeInteriorWindow,
      activeBathroomType,
      activeBathroomEnclosure,
      activeBathroomTile,
      activeShowertiles,
      activeBathroomMirror,
      activeBathroomVanity,
      activeBathroomHardware,
      activeKitchenBathroomFlooring,
      activeKitchenBathroomFlooringType,
      activeLeavingRoomFlooring,
      leavingRoomFlooringMaterial,
      activeBedroomFlooringMaterial,
      activeAppliancesPackage,
      activeDishwasher,
      activeCeilingHeight,
      activeStructure, // Make sure this is the correct state
      activeSideWall,
      activeInsulationOption,
    ];

    // Calculate the total upgrades price
    const totalUpgrades = activeItems.reduce(
      (acc, item) => acc + (item?.price || 0),
      0
    );
    setUpgrades(totalUpgrades + activeStructureTotal + activeSuboptionTotal);
  }, [
    activeFloorPlan,
    activeSidingType,
    activeShinglesMaterial,
    activeShinglesType,
    activeExteriorDoors,
    activeKitchenCounterTop,
    activeCounterTopMaterial,
    activeFlatCabinates,
    activecabinateHardware,
    activeTileBacksplash,
    activeBacksplashtile,
    activeKitchenFlooringMaterial,
    activeFlooringType,
    activeKitchenFucet,
    activeInteriorDoorHandles,
    activeInteriorWindow,
    activeBathroomType,
    activeBathroomEnclosure,
    activeBathroomTile,
    activeShowertiles,
    activeBathroomMirror,
    activeBathroomVanity,
    activeBathroomHardware,
    activeKitchenBathroomFlooring,
    activeKitchenBathroomFlooringType,
    activeLeavingRoomFlooring,
    leavingRoomFlooringMaterial,
    activeBedroomFlooringMaterial,
    activeAppliancesPackage,
    activeDishwasher,
    activeCeilingHeight,
    activeStructure,
    activeSideWall,
    activeInsulationOption,
    activeSuboption,
    activeStructureTotal,
    activeSuboptionTotal,
  ]);

  // useinview for price total

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
            transform:
              activeObject.title === "Floor Plan" ? activeFloorPlan.rotate : "", // Apply the rotation based on the active option
            transition: "transform 0.3s ease",
          }}
          className={`${
            activeObject.title === "Floor Plan"
              ? "w-full flex items-center bg-white justify-center h-screen"
              : activeObject.title === "Interior"
              ? "w-full flex items-center bg-white justify-center h-screen"
              : "w-full h-screen flex items-center"
          }`}
        >
          <img
            src={
              activeObject.title === "Interior"
                ? activeObject.doorHandles.options[0].image
                : activeObject.title === "Bathroom"
                ? activeBathroomType.image
                : activeObject.image
            }
            alt={activeObject.title}
            className={`${
              activeObject.title === "Floor Plan"
                ? "w-[70%] m-auto"
                : activeObject.title === "Interior"
                ? "w-[20%] m-auto"
                : activeObject.title === "Appliances"
                ? "m-auto"
                : "w-full h-full object-cover"
            }`}
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
          <h2 className="text-[30px] font-semibold pl-5">
            {activeObject.title}
          </h2>
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
          <ExteriorSection
            data={data}
            activeSidingType={activeSidingType}
            setActiveSidingType={setActiveSidingType}
            activeExteriorBodyColor={activeExteriorBodyColor}
            setActiveExteriorBodyColor={setActiveExteriorBodyColor}
            activeExteriorAccentColor={activeExteriorAccentColor}
            setActiveExteriorAccentColor={setActiveExteriorAccentColor}
            activeExteriorTrimColor={activeExteriorTrimColor}
            setActiveExteriorTrimColor={setActiveExteriorTrimColor}
            activeExteriorDoorPaint={activeExteriorDoorPaint}
            setActiveExteriorDoorPaint={setActiveExteriorDoorPaint}
            activeShinglesMaterial={activeShinglesMaterial}
            setActiveShinglesMaterial={setActiveShinglesMaterial}
            activeShinglesType={activeShinglesType}
            setActiveShinglesType={setActiveShinglesType}
            activeExteriorDoors={activeExteriorDoors}
            setActiveExteriorDoors={setActiveExteriorDoors}
            sectionRefs={sectionRefs}
          />
          {/* Kitchen */}
          <KitchenSection
            data={data}
            activeKitchenCounterTop={activeKitchenCounterTop}
            setActiveKitchenCounterTop={setActiveKitchenCounterTop}
            activeCounterTopMaterial={activeCounterTopMaterial}
            setActiveCounterTopMaterial={setActiveCounterTopMaterial}
            activeFlatCabinates={activeFlatCabinates}
            setActiveFlatCabinates={setActiveFlatCabinates}
            activeCabinateHardware={activecabinateHardware}
            setActiveCabinateHardware={setActiveCabinateHardware}
            activeTileBacksplash={activeTileBacksplash}
            setActiveTileBacksplash={setActiveTileBacksplash}
            activeBacksplashtile={activeBacksplashtile}
            setActiveBacksplashtile={setActivebacksplashTile}
            activeKitchenFlooringMaterial={activeKitchenFlooringMaterial}
            setActiveKitchenFlooringMaterial={setActiveKitchenFlooringMaterial}
            activeFlooringType={activeFlooringType}
            setActiveFlooringType={setActiveFlooringType}
            activeKitchenFaucet={activeKitchenFucet}
            setActiveKitchenFaucet={setActiveKitchenFucet}
            activeKitchenSinks={activeKitchenSinks}
            setActiveKitchenSinks={setActiveKitchenSinks}
            sectionRefs={sectionRefs}
          />
          {/* Interior */}
          <InteriorSection
            data={data}
            activeInteriorDoorHandles={activeInteriorDoorHandles}
            setActiveInteriorDoorHandles={setActiveInteriorDoorHandles}
            activeInteriorWindow={activeInteriorWindow}
            setActiveWindow={setActiveWindow}
            sectionRefs={sectionRefs}
          />
          {/* Bathroom */}
          <BathroomSection
            data={data}
            activeBathroomType={activeBathroomType}
            setActiveBathroomType={setActiveBathroomType}
            activeBathroomEnclosure={activeBathroomEnclosure}
            setActiveBathroomEnclosure={setActiveBathroomEnclosure}
            activeBathroomTile={activeBathroomTile}
            setActiveBathroomTile={setActiveBathroomTile}
            activeBathroomTileType={activeBathroomTileType}
            setActiveBathroomTileType={setActiveBathroomTileType}
            activeSuboption={activeSuboption}
            setActiveSuboption={setActiveSubOptionTotal}
            activeShowertiles={activeShowertiles}
            setActiveShowerTiles={setActiveShowerTiles}
            activeBathroomMirror={activeBathroomMirror}
            setActiveBathroomMirror={setActiveBathroomMirror}
            activeBathroomVanity={activeBathroomVanity}
            setActiveBathroomVanity={setActiveBathroomVanity}
            activeBathroomHardware={activeBathroomHardware}
            setActiveBathroomHardware={setActiveBathroomHardware}
            sectionRefs={sectionRefs}
          />
          {/* Flooring */}
          <FlooringSection
            data={data}
            activeKitchenBathroomFlooring={activeKitchenBathroomFlooring}
            setActiveKitchenBathroomFlooring={setActiveKitchenBathroomFlooring}
            activeKitchenBathroomFlooringType={
              activeKitchenBathroomFlooringType
            }
            setActiveKithcenBathroomFlooringType={
              setActiveKitchenBathroomFlooring
            }
            activeLeavingRoomFlooring={activeLeavingRoomFlooring}
            setActiveLeavingRoomFlooring={setActiveLeavingRoomFlooring}
            leavingRoomFlooringMaterial={leavingRoomFlooringMaterial}
            setLivingRoomFlooringMaterial={setLivingRoomFlooringMaterial}
            activeBedroomFlooringMaterial={activeBedroomFlooringMaterial}
            setActiveBedroomFlooringMaterial={setActiveBedroomFlooringMaterial}
            sectionRefs={sectionRefs}
          />
          {/* Appliances */}
          <AppliancesSection
            data={data}
            activeAppliances={activeAppliances}
            setActiveAppliances={setActiveAppliances}
            activeAppliancesPackage={activeAppliancesPackage}
            setActiveAppliancesPackage={setActiveAppliancesPackage}
            activeCustomAppliances={activeCustomAppliances}
            setActiveCustomAppliances={setActiveCustomAppliances}
            activeCustomRefrigirator={activeCustomRefrigirator}
            setActiveRefrigirator={setActiveRefrigirator}
            activeRange={activeRange}
            setActiveRange={setActiveRange}
            activeDishwasher={activeDishwasher}
            setActiveDishwasher={setActiveDishwasher}
            sectionRefs={sectionRefs}
          />
          {/* advance details */}
          <AdvanceDetailsSection
            data={data}
            activeCeilingHeight={activeCeilingHeight}
            setActiveCeilingHeight={setActiveCeilingHeight}
            activeStructure={activeStructure}
            setActiveStructure={setActiveStructure}
            activeSideWall={activeSideWall}
            setActiveSideWall={setActiveSideWall}
            activeInsulationOption={activeInsulationOption}
            setActiveInsulationOption={setActiveInsulationOption}
            sectionRefs={sectionRefs}
          />
          {/* Your Home */}
          <div
            className="mt-5"
            id="your-home"
            ref={(el) => (sectionRefs.current["your-home"] = el)}
          >
            <h2 className="text-[30px] font-semibold">Your Home</h2>
            <div className="mt-5 pb-5">
              <p className="font-semibold text-xl">{modelData.modelNum}</p>
              <p>{modelData.bedroom} Bedroom</p>
            </div>
            <hr />
            {/* Floor Plan */}
            <div className="mt-5 pb-5">
              <p className="font-semibold text-xl">{data.floorPlan.title}</p>
              <PriceCard
                name={activeFloorPlan.title}
                price={activeFloorPlan.price}
                subtext={"Orientation"}
              />
            </div>
            <hr />
            {/* exterior */}
            <ExteriorUpgrades
              data={data}
              activeSidingType={activeSidingType}
              activeExteriorBodyColor={activeExteriorBodyColor}
              activeExteriorAccentColor={activeExteriorAccentColor}
              activeExteriorTrimColor={activeExteriorTrimColor}
              activeExteriorDoorPaint={activeExteriorDoorPaint}
              activeShinglesMaterial={activeShinglesMaterial}
              activeShinglesType={activeShinglesType}
              activeExteriorDoors={activeExteriorDoors}
            />
            <hr />
            {/* Kitchen */}
            <KitchenUpgrades
              data={data}
              activeKitchenCounterTop={activeKitchenCounterTop}
              activeCounterTopMaterial={activeCounterTopMaterial}
              activeFlatCabinates={activeFlatCabinates}
              activecabinateHardware={activecabinateHardware}
              activeTileBacksplash={activeTileBacksplash}
              activeBacksplashtile={activeBacksplashtile}
              activeKitchenFlooringMaterial={activeKitchenFlooringMaterial}
              activeFlooringType={activeFlooringType}
              activeKitchenFucet={activeKitchenFucet}
              activeKitchenSinks={activeKitchenSinks}
            />
            <hr />
            {/* interior */}
            <InteriorUpgrades
              data={data}
              activeInteriorDoorHandles={activeInteriorDoorHandles}
              activeInteriorWindow={activeInteriorWindow}
            />
            <hr />
            {/* Bathroom */}
            <BathroomUpgrades
              data={data}
              activeBathroomType={activeBathroomType}
              activeBathroomEnclosure={activeBathroomEnclosure}
              activeBathroomTile={activeBathroomTile}
              activeSuboption={activeSuboption}
              activeShowertiles={activeShowertiles}
              activeBathroomMirror={activeBathroomMirror}
              activeBathroomVanity={activeBathroomVanity}
              activeBathroomHardware={activeBathroomHardware}
            />
            <hr />
            {/* Flooring */}
            <FlooringUpgrades
              data={data}
              activeKitchenBathroomFlooring={activeKitchenBathroomFlooring}
              activeKitchenBathroomFlooringType={
                activeKitchenBathroomFlooringType
              }
              activeLeavingRoomFlooring={activeLeavingRoomFlooring}
              leavingRoomFlooringMaterial={leavingRoomFlooringMaterial}
              activeBedroomFlooringMaterial={activeBedroomFlooringMaterial}
            />

            <hr />
            {/* Appliances */}
            <AppliancesUpgrade
              data={data}
              activeAppliances={activeAppliances}
              activeAppliancesPackage={activeAppliancesPackage}
              activeCustomAppliances={activeCustomAppliances}
              activeCustomRefrigirator={activeCustomRefrigirator}
              activeRange={activeRange}
              activeDishwasher={activeDishwasher}
            />

            <hr />
            {/* Advance Details */}
            <AdvanceDetailsUpgrade
              data={data}
              activeCeilingHeight={activeCeilingHeight}
              activeStructure={activeStructure}
              activeSideWall={activeSideWall}
              activeInsulationOption={activeInsulationOption}
            />
            <hr />
            <div className={"mt-5 pb-5"} id="">
              <p className="font-semibold text-xl">Price estimate</p>
              <div className="flex justify-between items-center">
                <p>Unit Price</p>
                <p className="font-bold">$ {modelData.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Upgrades</p>
                <p className="font-bold">+ ${upgrades}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Total</p>
                <p className="font-bold">
                  ${Math.floor(modelData.price) + upgrades}
                </p>
              </div>
            </div>
            <hr />
            <div className="mt-5 pb-5" id="">
              <p className="font-semibold text-xl">Disclaimer</p>
              <p>
                Prices, dimensions, and features may vary and are subject to
                change. Photos are for illustrative purposes only.
              </p>
            </div>
            <hr />
            {/* Sticky text */}
            <div
              className={"mt-5 p-5 border rounded-xl bg-white shadow-2xl"}
              id="price-total"
              ref={ref}
            >
              <p className="text-xl font-semibold mb-5">{modelData.modelNum}</p>
              <hr />
              <div className="flex justify-between items-center mt-5">
                <p>Unit Price</p>
                <p className="">$ {modelData.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Upgrades</p>
                <p className="">+ ${upgrades}</p>
              </div>
              <div className="flex justify-between items-center pb-5">
                <p>Unit Total</p>
                <p className="font-bold">
                  ${Math.floor(modelData.price) + upgrades}
                </p>
              </div>
              <hr />
              <div className="flex justify-between mt-5">
                <Button>Reset</Button>
                <Button colorScheme="orange">Save Design</Button>
              </div>
            </div>
            <div className={isInView ? "hidden":"p-5 fixed bottom-10 bg-white 2xl:w-[33%] w-[28%] rounded-xl border shadow-xl flex justify-between items-center"}>
              <p className="text-xl font-bold">
                ${Math.floor(modelData.price) + upgrades} <br />{" "}
                <span className="font-normal text-sm">
                  Base unit + upgrades
                </span>
              </p>
              <Button colorScheme="orange">Continue</Button>
            </div>
          </div>
        </div>
        {/* Active Object Details */}
      </div>
    </div>
  );
};
// activeObject.title != "Your Home" ? "p-5 fixed bottom-10 bg-white w-[33%] shadow-lg" :
