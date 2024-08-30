import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { Loader } from "../components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";

const data = {
  modelNum: "EG-20302A",
  price: 1000,
  floorPlan: [
    {
      title: "Standard",
      price: 0,
      image: "https://trove.b-cdn.net/images/ge8c3q6podb.jpeg",
    },
    {
      title: "Horizontal Flip",
      price: 1250,
      image: "https://trove.b-cdn.net/images/ge8c3q6podb.jpeg",
    },
    {
      title: "Verical Flip",
      price: 1250,
      image: "https://trove.b-cdn.net/images/ge8c3q6podb.jpeg",
    },
  ],
  exterior: {
    images: ["", "", ""],
    sidingType: [
      {
        title: "Verticle",
        image: "https://trove.b-cdn.net/images/yzq7wyxeaml.png",
        price: "",
      },
      {
        title: "Horizontal",
        image: "https://trove.b-cdn.net/images/bexuphncbb.png",
        price: 2300,
      },
      {
        title: "Hardboard",
        image: "",
        price: "",
      },
      {
        title: "Board & Batten",
        image: "",
        price: "",
      },
    ],
    bodyColor: [
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
    ],
    accentColor: [
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
    ],
    trimColor: [
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
      {
        name: "",
        colorCode: "",
        image: "",
      },
    ],
    doorPaint: [
      {
        name: "",
        colorCode: "",
        image: "",
      },
    ],
    shiglesMaterial: [
      {
        title: "Standard",
        price: 0,
        image: "",
        types: [
          {
            name: "Shasta White",
            image: "",
            bgImage: "https://trove.b-cdn.net/images/sn1d0ooid99.png",
            price: 0,
          },
          {
            name: "Desert Tan",
            image: "",
            bgImage: "https://trove.b-cdn.net/images/nairm0s2rp.png",
            price: 0,
          },
          {
            name: "Amber",
            image: "",
            bgImage: "https://trove.b-cdn.net/images/0yum7q6wu1yp.png",
            price: 0,
          },
        ],
      },
      {
        title: "Architectural",
        price: 400,
        image: "",
        types: [
          {
            name: "Sierra Grey",
            image: "",
            bgImage: "https://trove.b-cdn.net/images/sn1d0ooid99",
            price: 0,
          },
          {
            name: "Desert Tan",
            image: "",
            bgImage: "https://trove.b-cdn.net/images/x2cm0bywho8.png",
            price: 0,
          },
          {
            name: "Shasta White",
            image: "",
            bgImage: "https://trove.b-cdn.net/images/fm5kn9mkk27.png",
            price: 0,
          },
          {
            name: "Amber",
            image: "",
            bgImage: "",
            price: 400,
          },
          {
            name: "Onyx Black",
            image: "",
            bgImage: "https://trove.b-cdn.net/images/fgz9vjhqrr.png",
            price: 0,
          },
        ],
      },
    ],
    exteriorDoors: [
      {
        title: "Fiberglass",
        image: "https://trove.b-cdn.net/images/ysdqmq8jyir.jpeg",
        price: 0,
      },
      {
        title: "Fiberglass 9 Light",
        image: "https://trove.b-cdn.net/images/noh33cnxsiq.jpeg",
        price: 300,
      },
      {
        title: "Sedona",
        image: "https://trove.b-cdn.net/images/1xpusmaanwq.jpeg",
        price: 1100,
      },
      {
        title: "Sliding Glass",
        image: "https://trove.b-cdn.net/images/x6q56fppmjk.jpeg",
        price: 1000,
      },
      {
        title: "Double French W/Blinds",
        image: "https://trove.b-cdn.net/images/kildpnunj1.jpeg",
        price: 2550,
      },
    ],
  },
  kitchen: {
    title: "Kitchen",
    image: "",
    counterTopMaterial: [
      {
        title: "Laminate",
        image: "",
        price: 0,
        subTitle: "Laminate Countertops",
        types: [
          {
            image: "",
            bgImage: "https://trove.b-cdn.net/images/3or101cperm.png",
            title: "Aluma Marble",
            price: 0,
          },
          {
            image: "",
            bgImage: "https://trove.b-cdn.net/images/s7hzaz5c6yg.png",
            title: "Bello Romano",
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
            title: "Artic Melange",
            price: 0,
          },
          {
            image: "",
            bgImage: "https://trove.b-cdn.net/images/y4qma2orpq.png",
            title: "Avalance Melange",
            price: 0,
          },
        ],
      },
    ],
    flatPanelCabinets: [
      {
        title: "Mesquite",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/3p4452ib09k.jpeg",
        price: 0,
      },
      {
        title: "Maple",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/vmph5pp5mc.jpeg",
        price: 0,
      },
    ],
    cabinetHardware: [
      {
        title: "Black Square Pull",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/zbbe1b8dbch.png",
        price: 0,
      },
      {
        title: "Brushed Nickel Pull",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/52fmcnswwst.png",
        price: 0,
      },
    ],
    tileBacksplash: [
      {
        title: "Laminate",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/5wdmx4wk3tv.png",
        price: 0,
      },
      {
        title: "Solid Surface",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/cexkr9u0fu4.png",
        price: 0,
      },
    ],
    backsplashTile: [
      {
        title: "Brickell Antracita 3 x 12",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/lvvqcoa2fdj.png",
        price: 0,
      },
      {
        title: "Brickell Taupe - 3 X 12",
        image: "",
        bgImage: "https://trove.b-cdn.net/images/cexkr9u0fu4.png",
        price: 0,
      },
    ],
    flooringMaterial: [
      {
        title: "Sheet Vinyl",
        price: 0,
        subtitle: "Kitchen Linoleum Flooring Material",
        image: "",
        types: [
          {
            title: "Meteor Highlight",
            image: "",
            bgImage:
              "https://trove.b-cdn.net/images/0afn5degr51j.png",
            price: 0,
          },
          {
            title: "Aged European",
            image: "",
            bgImage:
              "https://trove.b-cdn.net/images/rhtui4iy7vk.png",
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
            title: "Meteor Highlight",
            image: "",
            bgImage:
              "https://trove.b-cdn.net/images/0afn5degr51j.png",
            price: 0,
          },
          {
            title: "Aged European",
            image: "",
            bgImage:
              "https://trove.b-cdn.net/images/rhtui4iy7vk.png",
            price: 0,
          },
        ],
      },
      
    ],
    kitchenFaucets:[
      {
        title:"Brushed",
        image:"https://trove.b-cdn.net/images/czah4qbnm4s.png",
        bgImage:"https://trove.b-cdn.net/images/kekiv5ip3op.png",
        price:0,
      },
      {
        title:"Black Smooth",
        image:"https://trove.b-cdn.net/images/cefed805rxs.png",
        bgImage:"https://trove.b-cdn.net/images/3cpcxlcsjvg.jpeg",
        price:0,
      },
    ],
    kitchenSinks:[
      {
        title:"single Bowl",
        image:"",
        image2:"",
        bgImage:"https://trove.b-cdn.net/images/mbefd3lao5.png",
        price:0,
      },
      {
        title:"White Undermount",
        image:"",
        image2:"https://trove.b-cdn.net/images/qsvsexd7si.png",
        bgImage:"https://trove.b-cdn.net/images/qsvsexd7si.png",
        price:150,
      },
    ]
  },
  interior:{
    title:"Interior",
    doorHandles:[
      {
        title:"Black Round",
        image:"https://trove.b-cdn.net/images/ym9alipcl5.jpeg",
        price:0
      },
      {
        title:"Brushed",
        image:"https://trove.b-cdn.net/images/jhpx3820utp.jpeg",
        price:0
      },
    ],
    windowTreatment:[
      {
        title:"Factory Build valance",
        image:"https://trove.b-cdn.net/images/399rj0on95w.png",
        price:0
      },
      {
        title:"Faux Wood Blinds",
        image:"https://trove.b-cdn.net/images/su1rsuer0ck.png",
        price:0
      },
    ]
  },
  bathroom:{
    title:"Bathroom",
    bathroomType:{
      title:"Primary Bathroom Type",
      options:[
        {
          title:"Bath Tub",
          image:"https://trove.b-cdn.net/images/6ejss3ouc5p.jpeg",
          price:0
        },
        {
          title:"Shower",
          image:"https://trove.b-cdn.net/images/qsikt1rb2vj.jpeg",
          price:750
        },
      ]
    }
  }
};
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
          <p
            className="flex gap-2 items-center cursor-pointer text-sm"
            onClick={() => navigate("/models")}
          >
            {" "}
            <IoMdArrowRoundBack />
            Back to the Product Page
          </p>
          <p className="font-bold text-[18px]">{modelData.modelNum}</p>
        </div>
      </div>
    </div>
  );
};
