import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageUploader } from "./ImageUploader";
import { setUploadKitchenImage } from "../../Redux/imageSlice";
import { ImageCard } from "../ImageCard";
import { storage } from "../../firebase-config/config";
import { ref, deleteObject } from "firebase/storage";
import { KitchenCounterTop } from "./Kitchen/KitchenCounterTop";
import { FlatPanelCabinates } from "./Kitchen/FlatPanelCabinates";
import { CabinetHardware } from "./Kitchen/CabinetHardware";
import { Tilebackspash } from "./Kitchen/Tilebackspash";
import { BacksplashTile } from "./Kitchen/BacksplashTile";
import { FlooringMaterial } from "./Kitchen/FlooringMaterial";
import { KitchenFaucets } from "./Kitchen/KitchenFaucets";
import { KitchenSinks } from "./Kitchen/KitchenSinks";

export const KitchenForm = ({ onSubmit,setIndex}) => {
  const [kitchen, setKitchen] = useState({
    title: "Kitchen",
    image: "",
    counterTopMaterial: {
      title: "Counter Top Material",
      options: [
        {
          title: "Laminate",
          image: "",
          price: 0,
          subTitle: "Laminate Countertops",
          types: [
            {
              image: "",
              bgImage: "https://trove.b-cdn.net/images/3or101cperm.png",
              name: "Aluma Marble",
              price: 0,
            },
            {
              image: "",
              bgImage: "https://trove.b-cdn.net/images/s7hzaz5c6yg.png",
              name: "Bello Romano",
              price: 0,
            },
          ],
        },
        {
          title: "Solid Surface",
          image: "",
          price: 3800,
          subTitle: "Solid Surface Countertops",
          types: [
            {
              image: "",
              bgImage: "https://trove.b-cdn.net/images/rr2pjyopalb.png",
              name: "Artic Melange",
              price: 0,
            },
            {
              image: "",
              bgImage: "https://trove.b-cdn.net/images/y4qma2orpq.png",
              name: "Avalance Melange",
              price: 0,
            },
          ],
        },
      ],
    },
    flatPanelCabinets: {
      title: "Flat Panel Cabinets",
      options: [
        {
          name: "Mesquite",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/3p4452ib09k.jpeg",
          price: 0,
        },
        {
          name: "Maple",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/vmph5pp5mc.jpeg",
          price: 0,
        },
      ],
    },
    cabinetHardware: {
      title: "Cabinate Hardware",
      options: [
        {
          name: "Black Square Pull",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/zbbe1b8dbch.png",
          price: 0,
        },
        {
          name: "Brushed Nickel Pull",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/52fmcnswwst.png",
          price: 0,
        },
      ],
    },
    tileBacksplash: {
      title: "Tile Backsplash",
      options: [
        {
          name: "Laminate",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/5wdmx4wk3tv.png",
          price: 0,
        },
        {
          name: "Solid Surface",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/cexkr9u0fu4.png",
          price: 0,
        },
      ],
    },
    backsplashTile: {
      title: "Backsplash Tile",
      options: [
        {
          name: "Brickell Antracita 3 x 12",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/lvvqcoa2fdj.png",
          price: 0,
        },
        {
          name: "Brickell Taupe - 3 X 12",
          image: "",
          bgImage: "https://trove.b-cdn.net/images/cexkr9u0fu4.png",
          price: 0,
        },
      ],
    },
    flooringMaterial: {
      title: "Kitchen & bathroom flooring material",
      options: [
        {
          title: "Sheet Vinyl",
          price: 0,
          subtitle: "Kitchen Linoleum Flooring Material",
          image: "",
          types: [
            {
              name: "Meteor Highlight",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/0afn5degr51j.png",
              price: 0,
            },
            {
              name: "Aged European",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/rhtui4iy7vk.png",
              price: 0,
            },
          ],
        },
        {
          title: "LVT",
          price: 550,
          subtitle: "Kitchen MSI Flooring Material",
          image: "",
          types: [
            {
              name: "Meteor Highlight",
              image: "",
              bgImage:
                "https://trove.b-cdn.net/images/5c7r9rhbb6t.png?height=160",
              price: 0,
            },
            {
              name: "Aged European",
              image: "",
              bgImage:
                "https://trove.b-cdn.net/images/mamwpkwbuls.png?height=160",
              price: 0,
            },
          ],
        },
      ],
    },
    kitchenFaucets: {
      title: "Kitchen Faucets",
      options: [
        {
          name: "Brushed",
          image: "https://trove.b-cdn.net/images/czah4qbnm4s.png",
          bgImage: "https://trove.b-cdn.net/images/kekiv5ip3op.png",
          price: 0,
        },
        {
          name: "Black Smooth",
          image: "https://trove.b-cdn.net/images/cefed805rxs.png",
          bgImage: "https://trove.b-cdn.net/images/3cpcxlcsjvg.jpeg",
          price: 500,
        },
      ],
    },
    kitchenSinks: {
      title: "Kitchen Sinks",
      options: [
        {
          name: "single Bowl",
          image: "",
          image2: "",
          bgImage: "https://trove.b-cdn.net/images/mbefd3lao5.png",
          price: 0,
        },
        {
          name: "White Undermount",
          image: "",
          image2: "https://trove.b-cdn.net/images/qsvsexd7si.png",
          bgImage: "https://trove.b-cdn.net/images/qsvsexd7si.png",
          price: 150,
        },
      ],
    },
  });
  const [imageUploaded, setImageUploaded] = useState(true);
  const [filePath, setFilePath] = useState("");
  const maxNumber = 1;
  const dispatch = useDispatch();
  const [currentForm, setcurrentForm] = useState("kitchenSidingType");

  // setuploaded image to the kitchen main image

  const uploadedKitchenImage = useSelector(
    (state) => state.images.uploadedKitchenImage
  );

  useEffect(() => {
    if (uploadedKitchenImage.length > 0) {
      setKitchen((prevProperty) => ({
        ...prevProperty,
        image: uploadedKitchenImage[0].url, // Update image in floor plan state
      }));
      setFilePath(uploadedKitchenImage[0].path); // Save the file path for later deletion
    }
  }, [uploadedKitchenImage]);

  const deleteImage = async () => {
    if (!filePath) return;
    const imageRef = ref(storage, filePath);
    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      setKitchen((prev) => ({ ...prev, image: "" }));
      setImageUploaded(false); // Reset the uploaded state
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
   const handleKitchenSubmit = () => {
    onSubmit(kitchen)
    setIndex(4)
   }

  return (
    <div>
      {imageUploaded ? (
        <div className="flex gap-20">
          <div className="w-[30%]">
            <ImageCard
              url={kitchen.image}
              title={"Kitchen"}
              deleteImage={deleteImage}
            />
          </div>
          <div className="w-[65%] border px-10 py-10 rounded-xl border-black">
            {/* Kitchen siding type */}
            <KitchenCounterTop
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
            {/* Kitchen Flat panel cabinet */}
            <FlatPanelCabinates
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
            {/* Cabinet hardware */}
            <CabinetHardware
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
            <Tilebackspash
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
            <BacksplashTile
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
            <FlooringMaterial
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
            <KitchenFaucets
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
            <KitchenSinks
              currentForm={currentForm}
              kitchen={kitchen}
              setKitchen={setKitchen}
              setCurrentForm={setcurrentForm}
            />
          </div>
        </div>
      ) : (
        <ImageUploader
          title={"kitchen"}
          maxNumber={maxNumber}
          setImageUploaded={setImageUploaded}
          setUploadedImage={setUploadKitchenImage}
        />
      )}
    </div>
  );
};
