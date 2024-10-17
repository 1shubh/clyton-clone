import React, { useState } from "react";
import { KitchenFlooring } from "./Flooring/KitchenFlooring";
import { LeavingRoom } from "./Flooring/LeavingRoom";
import { BedroomFlooring } from "./Flooring/BedroomFlooring";

export const FlooringForm = ({ onSubmit, setIndex }) => {
  const [flooring, setFlooring] = useState({
    title: "Flooring",
    image: "/images/kitchen.webp",
    kitchenflooringMaterial: {
      title: "Kitchen & bathroom flooring material",
      image: "",
      options: [
        {
          title: "Sheet Vinyl",
          image: "",
          price: 0,
          subheading: "Kitchen Linoleum Flooring Material",
          options: [
            {
              name: "Metor",
              image: "",
              bgImage:
                "https://trove.b-cdn.net/images/0afn5degr51j.png?height=160",
              price: 0,
            },
            {
              name: "Aged European Oak Natural",
              image: "",
              bgImage:
                "https://trove.b-cdn.net/images/rhtui4iy7vk.png?height=160",
              price: 0,
            },
          ],
        },
        {
          title: "Luxury Vinyl",
          image: "",
          price: 550,
          subheading: "Kitchen MSI Flooring Material",
          options: [
            {
              name: "Cyrus Akadia",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/5c7r9rhbb6t.png",
              price: 0,
            },
            {
              name: "Cyrus Mezcla",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/mamwpkwbuls.png",
              price: 0,
            },
          ],
        },
      ],
    },
    leavingRoomFlooringMaterial: {
      title: "Living Room flooring material",
      image: "",
      options: [
        {
          title: "Takeaway carpet",
          price: 0,
          subheading: "Living Room Carpet Takeaway - Non FHA",
          subOptions: [
            {
              name: "Cornerstone",
              image: "https://trove.b-cdn.net/images/jcjpd3bg5al.png",
              bgImage:
                "https://trove.b-cdn.net/images/mrxj616ohzr.png?height=160",
              price: 0,
            },
            {
              name: "Driftwood",
              image: "https://trove.b-cdn.net/images/33zvoqob9ty.png",
              bgImage:
                "https://trove.b-cdn.net/images/mkz15qqvt8s.png?height=160",
              price: 0,
            },
          ],
        },
        {
          title: "Shake it up carpet",
          price: 100,
          subheading: "Living Room Carpet - Shake It Up",
          subOptions: [
            {
              name: "Creamy silk",
              image: "https://trove.b-cdn.net/images/33zvoqob9ty.png",
              bgImage:
                "https://trove.b-cdn.net/images/8yvkakyrpml.png?height=160",
              price: 0,
            },
            {
              name: "Driftwood",
              image: "https://trove.b-cdn.net/images/33zvoqob9ty.png",
              bgImage:
                "https://trove.b-cdn.net/images/mkz15qqvt8s.png?height=160",
              price: 0,
            },
          ],
        },
        {
          title: "Sheet Vinyl",
          price: 500,
          subheading: "Living Room Linoleum Flooring Material",
          subOptions: [
            {
              name: "Meteor Highlights",
              image: "https://trove.b-cdn.net/images/qgds5fm4atf.png",
              bgImage:
                "https://trove.b-cdn.net/images/0afn5degr51j.png?height=160",
              price: 0,
            },
            {
              name: "Aged European Oak Natural",
              image: "https://trove.b-cdn.net/images/o1kdabcdw3q.png",
              bgImage:
                "https://trove.b-cdn.net/images/rhtui4iy7vk.png?height=160",
              price: 0,
            },
          ],
        },
      ],
    },
    bedroomFlooringMaterial: {
      title: "Bedroom flooring material",
      image: "",
      options: [
        {
          title: "Takeaway carpet",
          price: 0,
          subheading: "Bedroom Carpet Takeaway - Non FHA",
          subOptions: [
            {
              name: "Cornerstone",
              image: "https://trove.b-cdn.net/images/njmkmtmfab.png",
              bgImage:
                "https://trove.b-cdn.net/images/mrxj616ohzr.png?height=160",
              price: 0,
            },
            {
              name: "Driftwood",
              image: "https://trove.b-cdn.net/images/sfn4b2nasxj.png",
              bgImage:
                "https://trove.b-cdn.net/images/mkz15qqvt8s.png?height=160",
              price: 0,
            },
          ],
        },
        {
          title: "Shake it up carpet",
          price: 100,
          subheading: "Bedroom Carpet - Shake It Up",
          subOptions: [
            {
              name: "Creamy silk",
              image: "https://trove.b-cdn.net/images/sfn4b2nasxj.png",
              bgImage:
                "https://trove.b-cdn.net/images/8yvkakyrpml.png?height=160",
              price: 0,
            },
            {
              name: "Driftwood",
              image: "https://trove.b-cdn.net/images/sfn4b2nasxj.png",
              bgImage:
                "https://trove.b-cdn.net/images/mkz15qqvt8s.png?height=160",
              price: 0,
            },
          ],
        },
        {
          title: "Sheet Vinyl",
          price: 300,
          subheading: "Bedroom Linoleum Flooring Material",
          subOptions: [
            {
              name: "Meteor Highlights",
              image: "https://trove.b-cdn.net/images/cyztgwvgwz.png",
              bgImage:
                "https://trove.b-cdn.net/images/0afn5degr51j.png?height=160",
              price: 0,
            },
            {
              name: "Aged European Oak Natural",
              image: "https://trove.b-cdn.net/images/ye08fyccoun.png",
              bgImage:
                "https://trove.b-cdn.net/images/rhtui4iy7vk.png?height=160",
              price: 0,
            },
          ],
        },
      ],
    },
  });

  const [currentForm, setcurrentForm] = useState("kitchenFlooring");
  const handleSubmit = () => {
    onSubmit(flooring)
    setIndex(7)
  }

  return (
    <div>
      <KitchenFlooring
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        flooring={flooring}
        setFlooring={setFlooring}
      />
      <LeavingRoom
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        flooring={flooring}
        setFlooring={setFlooring}
      />
      <BedroomFlooring
        currentForm={currentForm}
        setCurrentForm={setcurrentForm}
        flooring={flooring}
        setFlooring={setFlooring}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
