import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../firebase-config/config";
import { ref, deleteObject } from "firebase/storage";
import { ImageUploader } from "./ImageUploader";
import { setUploadBathroomImage } from "../../Redux/imageSlice";
import { ImageCard } from "../ImageCard";
import { BathroomType } from "./Bathroom/BathroomType";
import { BathroomEnclosure } from "./Bathroom/BathroomEnclosure";
import { BathroomTile } from "./Bathroom/BathroomTile";
import { ShowerTiles } from "./Bathroom/ShowerTiles";
import { BathroomMirror } from "./Bathroom/BathroomMirror";
import { BathroomVanity } from "./Bathroom/BathroomVanity";
import { BathroomHardware } from "./Bathroom/BathroomHardware";

export const BathroomForm = ({ onSubmit, setIndex }) => {
  const [bathroom, setBathroom] = useState({
    title: "Bathroom",
    image: "",
    bathroomType: {
      title: "Primary Bathroom Type",
      options: [
        {
          title: "Bath Tub",
          image: "https://trove.b-cdn.net/images/6ejss3ouc5p.jpeg",
          price: 0,
        },
        {
          title: "Shower",
          image: "https://trove.b-cdn.net/images/qsikt1rb2vj.jpeg",
          price: 750,
        },
      ],
    },
    bathroomEnclosure: {
      title: "Primary Bathroom Enclosure",
      options: [
        {
          title: "No Enclosure",
          image: "https://trove.b-cdn.net/images/6m6afikb03.jpeg",
          price: 0,
        },
        {
          title: "Glass Enclosure",
          image: "https://trove.b-cdn.net/images/6ejss3ouc5p.jpeg",
          price: 0,
        },
      ],
    },
    bathroomTile: {
      title: "Primary Bathroom Tile",
      options: [
        {
          title: "Fiberglass",
          image: "",
          price: 0,
          options: {},
        },
        {
          title: "Tile Walls",
          image: "",
          price: 2500,
          options: {
            title: "Primary Bathroom Tile Options",
            subOptions: [
              {
                title: "Shampoo Niche",
                price: 700,
                image: "",
              },
              {
                title: "Tile to Ceiling",
                price: 1150,
                image: "",
              },
            ],
          },
        },
      ],
    },
    showerAndTiles: {
      title: "Shower | Tiles",
      price: 0,
      options: [
        {
          name: "Calcutta Gold 12 x 24",
          image: "https://trove.b-cdn.net/images/yt9a7m1lbxn.png?height=160",
          price: 0,
        },
        {
          name: "Pietra 12x24",
          image: "https://trove.b-cdn.net/images/16bpp2fax2c.png",
          price: 0,
        },
      ],
    },
    mirror: {
      title: "Bathroom Mirror",
      options: [
        {
          name: "Omit Mirror",
          image: "https://trove.b-cdn.net/images/6coep6765ql.jpeg?height=160",
          price: 0,
        },
        {
          name: "LED Mount",
          image: "https://trove.b-cdn.net/images/6coep6765ql.jpeg?height=160",
          price: 400,
        },
      ],
    },
    vanityLighting: {
      title: "Vanity Lighting",
      options: [
        {
          name: "Brushed Lighting",
          image: "https://trove.b-cdn.net/images/8osr7gddjry.png",
          price: 0,
        },
        {
          name: "Brushed Nickel",
          image: "https://trove.b-cdn.net/images/nfpyjr4xkua.png",
          price: 0,
        },
      ],
    },
    hardware: {
      title: "Hardware",
      options: [
        {
          title: "Single Lever Brushed Nickel",
          image: "https://trove.b-cdn.net/images/nmqi4oh1wpf.png",
          price: 0,
        },
        {
          title: "Dual Faucet Brushed Nickel",
          image: "https://trove.b-cdn.net/images/6xv48e9j1j5.png",
          price: 0,
        },
      ],
    },
  });

  const [currentForm, setcurrentForm] = useState("bathroomType");

  const handleSubmit = () => {
    onSubmit(bathroom);
    setIndex(6);
  };
  return (
    <div>
      <BathroomType
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        Bathroom={bathroom}
        setBathroom={setBathroom}
      />
      <BathroomEnclosure
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        Bathroom={bathroom}
        setBathroom={setBathroom}
      />
      <BathroomTile
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        Bathroom={bathroom}
        setBathroom={setBathroom}
      />
      <ShowerTiles
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        Bathroom={bathroom}
        setBathroom={setBathroom}
      />
      <BathroomMirror
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        Bathroom={bathroom}
        setBathroom={setBathroom}
      />
      <BathroomVanity
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        Bathroom={bathroom}
        setBathroom={setBathroom}
      />
      <BathroomHardware
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        Bathroom={bathroom}
        setBathroom={setBathroom}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
