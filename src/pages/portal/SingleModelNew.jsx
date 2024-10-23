import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config/config";
import { Loader } from "../../components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import useInView from "../../hooks/useInView";
import { FloorOptionCard } from "../../components/FloorPlan/FloorOptionCard";
import ExteriorSection from "../../components/SingleProperty/ExteriorSection";
import KitchenSection from "../../components/SingleProperty/KitchenSection";
import InteriorSection from "../../components/SingleProperty/InteriorSection";
import BathroomSection from "../../components/SingleProperty/BathroomSection";
import FlooringSection from "../../components/SingleProperty/FlooringSection";
import AppliancesSection from "../../components/SingleProperty/AppliancesSection";
import AdvanceDetailsSection from "../../components/SingleProperty/AdvanceDetailsSection";
import { ExteriorUpgrades } from "../../components/SingleProperty/ExteriorUpgrades";
import { KitchenUpgrades } from "../../components/SingleProperty/KitchenUpgrades";
import { InteriorUpgrades } from "../../components/SingleProperty/InteriorUpgrades";
import { BathroomUpgrades } from "../../components/SingleProperty/BathroomUpgrades";
import { FlooringUpgrades } from "../../components/SingleProperty/FlooringUpgrades";
import { AppliancesUpgrade } from "../../components/SingleProperty/AppliancesUpgrade";
import { AdvanceDetailsUpgrade } from "../../components/SingleProperty/AdvanceDetailsUpgrade";
import { PriceCard } from "../../components/PriceCard";

export const SingleModelNew = () => {
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State Management for Different Sections
  const [activeObject, setActiveObject] = useState({});
  const [activeFloorPlan, setActiveFloorPlan] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  let FloorArray = [activeFloorPlan];
  // Various active states for sections
  const [activeSidingType, setActiveSidingType] = useState({});
  const [activeExteriorBodyColor, setActiveExteriorBodyColor] = useState({});
  const [activeExteriorAccentColor, setActiveExteriorAccentColor] = useState(
    {}
  );
  const [activeExteriorTrimColor, setActiveExteriorTrimColor] = useState({});
  const [activeExteriorDoorPaint, setActiveExteriorDoorPaint] = useState({});
  const [activeShinglesMaterial, setActiveShinglesMaterial] = useState({});
  const [activeShinglesType, setActiveShinglesType] = useState({});
  const [activeExteriorDoors, setActiveExteriorDoors] = useState({});

  //   KITCHEN
  const [activeKitchenCounterTop, setActiveKitchenCounterTop] = useState({});
  const [activeCounterTopMaterial, setActiveCounterTopMaterial] = useState(
    activeKitchenCounterTop?.types?.[0]
  );
  const [activeFlatCabinates, setActiveFlatCabinates] = useState({});
  const [activecabinateHardware, setActiveCabinateHardware] = useState({});
  const [activeTileBacksplash, setActiveTileBacksplash] = useState({});
  const [activeBacksplashtile, setActivebacksplashTile] = useState({});
  const [
    activeKitchenFlooringMaterial,
    setActiveKitchenFlooringMaterial,
  ] = useState({});

  const [activeFlooringType, setActiveFlooringType] = useState({});
  const [activeKitchenFucet, setActiveKitchenFucet] = useState({});
  const [activeKitchenSinks, setActiveKitchenSinks] = useState({});

  //   INTERIOR
  const [activeInteriorDoorHandles, setActiveInteriorDoorHandles] = useState(
    {}
  );
  const [activeInteriorWindow, setActiveWindow] = useState({});
  //   BATHROOM
  const [activeBathroomType, setActiveBathroomType] = useState({});
  const [activeBathroomEnclosure, setActiveBathroomEnclosure] = useState({});
  const [activeBathroomTile, setActiveBathroomTile] = useState({});
  const [activeBathroomTileType, setActiveBathroomTileType] = useState({});

  const [activeShowertiles, setActiveShowerTiles] = useState({});
  const [activeBathroomMirror, setActiveBathroomMirror] = useState({});
  const [activeBathroomVanity, setActiveBathroomVanity] = useState({});
  const [activeBathroomHardware, setActiveBathroomHardware] = useState({});
  //   FLOORING
  const [
    activeKitchenBathroomFlooring,
    setActiveKitchenBathroomFlooring,
  ] = useState({});
  const [
    activeKitchenBathroomFlooringType,
    setActiveKithcenBathroomFlooringType,
  ] = useState(activeKitchenBathroomFlooring?.options?.[0]);
  const [activeLeavingRoomFlooring, setActiveLeavingRoomFlooring] = useState(
    {}
  );
  console.log(activeLeavingRoomFlooring)
  const [leavingRoomFlooringMaterial, setLivingRoomFlooringMaterial] = useState(
    activeLeavingRoomFlooring?.subOptions?.[0]
  );
  const [
    activeBedroomFlooringMaterial,
    setActiveBedroomFlooringMaterial,
  ] = useState({});
  //   APPLIANCES
  const [activeAppliances, setActiveAppliances] = useState([]);
  const [activeAppliancesPackage, setActiveAppliancesPackage] = useState( activeAppliances?.package?.[0]);
  const [activeCustomAppliances, setActiveCustomAppliances] = useState(null);
  const [activeCustomRefrigirator, setActiveRefrigirator] = useState({});
  const [activeRange, setActiveRange] = useState({});
  useEffect(() => {
    if (activeCustomAppliances != null) {
      setActiveRefrigirator(
        activeCustomAppliances?.refrigirator?.category?.[0]
      );
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
  const [activeDishwasher, setActiveDishwasher] = useState({});
  //   ADVANCE DETAILS
  const [activeCeilingHeight, setActiveCeilingHeight] = useState({});
  const [activeSideWall, setActiveSideWall] = useState({});
  const [activeInsulationOption, setActiveInsulationOption] = useState({});
  const [activeStructure, setActiveStructure] = useState([]);
  const [activeSuboption, setActiveSuboption] = useState([]);

  const [activeStructureTotal, setActiveStructureTotal] = useState(0);
  const [activeSuboptionTotal, setActiveSubOptionTotal] = useState(0);

  const [upgrades, setUpgrades] = useState(0);

  // Data fetching from Firebase Firestore
  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setModelData(fetchedData);
          setData(fetchedData);
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

  // Initialize active states with fetched data
  useEffect(() => {
    if (data) {
      // floor plan
      setActiveFloorPlan(data?.floorPlan?.options?.[0]);
      //Exterior
      setActiveSidingType(data?.exterior?.sidingType?.options?.[0]);
      setActiveExteriorBodyColor(data?.exterior?.bodyColor?.options?.[0]);
      setActiveExteriorAccentColor(data?.exterior?.accentColor?.options?.[0]);
      setActiveExteriorTrimColor(data?.exterior?.trimColor?.options?.[0]);
      setActiveExteriorDoorPaint(data?.exterior?.doorPaint?.options?.[0]);
      setActiveShinglesMaterial(data?.exterior?.shinglesMaterial?.options?.[0]);
      //   setActiveShinglesType(data?.exterior?.shinglesMaterial?.types?.[0]);
      setActiveExteriorDoors(data?.exterior?.exteriorDoors?.options?.[0]);
      //   kitchen
      setActiveKitchenCounterTop(
        data?.kitchen?.counterTopMaterial?.options?.[0]
      );
      setActiveFlatCabinates(data?.kitchen?.flatPanelCabinets?.options?.[0]);
      setActiveCabinateHardware(data?.kitchen?.cabinetHardware?.options?.[0]);
      setActiveTileBacksplash(data?.kitchen.tileBacksplash.options[0]);
      setActivebacksplashTile(data?.kitchen.backsplashTile.options[0]);
      setActiveKitchenFlooringMaterial(
        data?.kitchen?.flooringMaterial?.options?.[0]
      );
      setActiveKitchenFucet(data?.kitchen.kitchenFaucets.options[0]);
      setActiveKitchenSinks(data?.kitchen.kitchenSinks.options[0]);

      //interior
      setActiveInteriorDoorHandles(data?.interior?.doorHandles?.options?.[0]);
      setActiveWindow(data?.interior.windowTreatment.options[0]);

      //   bathroom
      setActiveBathroomType(data?.bathroom?.bathroomType?.options?.[0]);
      setActiveBathroomEnclosure(data?.bathroom.bathroomEnclosure.options[0]);
      setActiveBathroomTile(data?.bathroom?.bathroomTile?.options?.[0]);
      //   setActiveBathroomTileType(data?.bathroom?.bathroomti)
      setActiveShowerTiles(data?.bathroom.showerAndTiles.options[0]);
      setActiveBathroomMirror(data?.bathroom.mirror.options[0]);
      setActiveBathroomVanity(data?.bathroom.vanityLighting.options[0]);
      setActiveBathroomHardware(data?.bathroom.hardware.options[0]);
      // flooring
      setActiveKitchenBathroomFlooring(
        data?.flooring.kitchenflooringMaterial.options[0]
      );
      setActiveLeavingRoomFlooring(
        data?.flooring.leavingRoomFlooringMaterial.options[0]
      );
      setLivingRoomFlooringMaterial(activeLeavingRoomFlooring?.subOptions?.[0]);
      setActiveBedroomFlooringMaterial(data?.flooring.bedroomFlooringMaterial.options[0])
    //   appliances
      setActiveAppliances(data?.appliances?.types?.[0]);
      setActiveAppliancesPackage(activeAppliances?.package?.[0])
      setActiveDishwasher(data?.appliances.dishwasher.package[0])
    //   advance details
      setActiveCeilingHeight(data?.advanceDetails?.ceilingHeight?.options?.[0]);
      setActiveSideWall(data?.advanceDetails?.sidewallDimensions?.options?.[0]);
      setCurrentImage(data?.floorPlan?.image);
    }
  }, [data]);

  // Calculate total upgrades
  const totalUpgrades = useMemo(() => {
    const activeItems = [
      activeFloorPlan,
      activeSidingType,
      activeShinglesMaterial,
      activeShinglesType,
      activeExteriorDoors,
      activeKitchenCounterTop,
      activeKitchenFlooringMaterial,
      activeInteriorDoorHandles,
      activeBathroomType,
      activeBathroomTile,
      activeAppliances,
      activeCeilingHeight,
      activeSideWall,
    ];

    return (
      activeItems.reduce((acc, item) => acc + (item?.price || 0), 0) +
      activeStructureTotal +
      activeSuboptionTotal
    );
  }, [
    activeFloorPlan,
    activeSidingType,
    activeShinglesMaterial,
    activeShinglesType,
    activeExteriorDoors,
    activeKitchenCounterTop,
    activeKitchenFlooringMaterial,
    activeInteriorDoorHandles,
    activeBathroomType,
    activeBathroomTile,
    activeAppliances,
    activeCeilingHeight,
    activeSideWall,
    activeStructureTotal,
    activeSuboptionTotal,
  ]);

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
          setActiveObject(data?.floorPlan);
          break;
        case "exterior":
          setActiveObject(data?.exterior);
          break;
        case "kitchen":
          setActiveObject(data?.kitchen);
          break;
        case "interior":
          setActiveObject(data?.interior);
          break;
        case "bathroom":
          setActiveObject(data?.bathroom);
          break;
        case "flooring":
          setActiveObject(data?.flooring);
          break;
        case "appliances":
          setActiveObject(data?.appliances);
          break;
        case "advance-details":
          setActiveObject(data?.advanceDetails);
          break;
        case "your-home":
          setActiveObject({
            title: "Your Home",
            image: data?.advanceDetails.image,
          });
          break;
        default:
          setActiveObject(data?.floorPlan);
          break;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarHeight, data]);

  // Sticky Image on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsImageFixed(window.scrollY > navbarHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

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
            loading="lazy"
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
            <p className="font-bold text-[18px]">
              {modelData?.propertyDetails.modelNum}
            </p>
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
          {/* <AppliancesSection
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
          /> */}
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
              <p className="font-semibold text-xl">
                {modelData?.propertyDetails.modelNum}
              </p>
              <p>{modelData.propertyDetails.bedroom} Bedroom</p>
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
                <p className="font-bold">$ {modelData.propertyDetails.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Upgrades</p>
                <p className="font-bold">+ ${upgrades}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Total</p>
                <p className="font-bold">
                  ${Math.floor(modelData.propertyDetails.price) + upgrades}
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
              <p className="text-xl font-semibold mb-5">
                {modelData.propertyDetails.modelNum}
              </p>
              <hr />
              <div className="flex justify-between items-center mt-5">
                <p>Unit Price</p>
                <p className="">$ {modelData.propertyDetails.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Upgrades</p>
                <p className="">+ ${upgrades}</p>
              </div>
              <div className="flex justify-between items-center pb-5">
                <p>Unit Total</p>
                <p className="font-bold">
                  ${Math.floor(modelData.propertyDetails.price) + upgrades}
                </p>
              </div>
              <hr />
              <div className="flex justify-between mt-5">
                <Button>Reset</Button>
                <Button colorScheme="orange">Save Design</Button>
              </div>
            </div>
            <div
              className={
                isInView
                  ? "hidden"
                  : "p-5 fixed bottom-10 bg-white 2xl:w-[33%] w-[28%] rounded-xl border shadow-xl flex justify-between items-center"
              }
            >
              <p className="text-xl font-bold">
                ${Math.floor(modelData.propertyDetails.price) + upgrades} <br />{" "}
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