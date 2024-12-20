
export const data = {
  modelNum: "EG-20302A",
  price: 1000,
  floorPlan: {
    title: "Floor Plan",
    subtitle: "Floor Plan orientation",
    image: "https://trove.b-cdn.net/images/ge8c3q6podb.jpeg",
    options: [
      {
        title: "Standard",
        rotate: "scaleX(1) scaleY(1)",
        price: 0,
      },
      {
        title: "Horizontal Flip",
        price: 1250,
        rotate: "scaleX(-1)",
      },
      {
        title: "Verical Flip",
        price: 1250,
        rotate: "scaleY(-1)",
      },
    ],
  },
  exterior: {
    title: "Exterior",
    image:"/images/exterior.webp",
    sidingType: {
      title: "Exterior Siding Type",
      options: [
        {
          title: "Verticle",
          image: "https://trove.b-cdn.net/images/yzq7wyxeaml.png",
          price: 0,
        },
        {
          title: "Horizontal",
          image: "https://trove.b-cdn.net/images/bexuphncbb.png",
          price: 2300,
        },
        {
          title: "Hardboard",
          image: "",
          price: 2500,
        },
        {
          title: "Board & Batten",
          image: "",
          price: 3000,
        },
      ],
    },
    bodyColor: {
      title: "Exterior Body Color",
      options: [
        {
          name: "Foil",
          colorCode: "#c1c3c4",
          image: "",
        },
        {
          name: "Blue Print",
          colorCode: "#58697d",
          image: "",
        },
        {
          name: "Stay Calm",
          colorCode: "#c0bbb1",
          image: "",
        },
      ],
    },
    accentColor: {
      title: "Exterior Accent Color",
      options: [
        {
          name: "Foil",
          colorCode: "#c1c3c4",
          image: "",
        },
        {
          name: "Blue Print",
          colorCode: "#58697d",
          image: "",
        },
        {
          name: "Stay Calm",
          colorCode: "#c0bbb1",
          image: "",
        },
      ],
    },
    trimColor: {
      title: "Exterior Trim Color",
      options: [
        {
          name: "Foil",
          colorCode: "#c1c3c4",
          image: "",
        },
        {
          name: "Blue Print",
          colorCode: "#58697d",
          image: "",
        },
        {
          name: "Stay Calm",
          colorCode: "#c0bbb1",
          image: "",
        },
      ],
    },
    doorPaint: {
      title: "Exterior Door Paint",
      options: [
        {
          name: "White",
          colorCode: "#ffffff",
          image: "",
        },
        {
          name: "Iron River",
          colorCode: "#4d504b",
          image: "",
        },
      ],
    },
    shiglesMaterial: {
      title: "Shingles Material",
      options: [
        {
          title: "Standard",
          price: 0,
          image: "",
          subtitle: "Standard Material",
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
          subtitle: "Architectural Shingles",
          types: [
            {
              name: "Sierra Grey",
              image: "",
              bgImage: "https://trove.b-cdn.net/images/dgdotyuqopo.png",
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
              bgImage:
                "https://trove.b-cdn.net/images/0yum7q6wu1yp.png?height=160",
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
    },
    exteriorDoors: {
      title: "Exterior Door",
      options: [
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
  },
  kitchen: {
    title: "Kitchen",
    image: "/images/kitchen.webp",
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
      title: "Kitchen",
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
  },
  interior: {
    title: "Interior",
    doorHandles: {
      title: "Interior Door Handles",
      options: [
        {
          name: "Black Round",
          bgImage: "https://trove.b-cdn.net/images/ym9alipcl5.jpeg?height=160",
          price: 0,
          image: "https://trove.b-cdn.net/images/ym9alipcl5.jpeg?height=160",
        },
        {
          name: "Brushed",
          bgImage: "https://trove.b-cdn.net/images/jhpx3820utp.jpeg?height=160",
          price: 0,
          image: "",
        },
      ],
    },
    windowTreatment: {
      title: "Window Treatment",
      options: [
        {
          name: "Factory Build valance",
          bgImage: "https://trove.b-cdn.net/images/399rj0on95w.png",
          price: 0,
          image: "",
        },
        {
          name: "Faux Wood Blinds",
          bgImage: "https://trove.b-cdn.net/images/su1rsuer0ck.png",
          price: 0,
          image: "",
        },
      ],
    },
  },
  bathroom: {
    title: "Bathroom",
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
  },
  flooring: {
    title: "Flooring",
    image:"/images/kitchen.webp",
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
  },
  appliances: {
    title: "Appliances",
    note: "Appliances may vary in style",
    image: "https://trove.b-cdn.net/images/dcr6u9q33ok.png",
    types: [
      {
        title: "Electric only",
        subtitle: "Appliance Package",
        description:
          "All electric homes are easier to permit and have reduced site work costs. All appliances will be electric including stove, oven, dryer, furnace, and water heater.",
        package: [
          {
            title: "Standard",
            image: "https://trove.b-cdn.net/images/dcr6u9q33ok.png",
            price: 0,
          },
          {
            title: "Premium Stainless Steel",
            image: "https://trove.b-cdn.net/images/w2jgs33pew.jpeg",
            price: 4050,
          },
          {
            title: "Custom",
            image: "https://trove.b-cdn.net/images/w2jgs33pew.jpeg",
            price: 0,
            options: {
              refrigirator: {
                title: "Refrigerator",
                category: [
                  {
                    title: "Standard",
                    // image: ["https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg"],
                    description:
                      "30-inch Wide Top Freezer Refrigerator - 18 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                  {
                    title: "Premium",
                    image: "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                    description:
                      "36-inch Wide Side-by-Side Refrigerator - 24 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        title: "Gas & Electric",
        subtitle: "Appliance Package",
        description:
          "This option will increase your site work costs and may not be allowed in your jurisdiction.",
        package: [
          {
            title: "Standard",
            image: "https://trove.b-cdn.net/images/dcr6u9q33ok.png",
            price: 0,
          },
          {
            title: "Premium Stainless Steel",
            image: "https://trove.b-cdn.net/images/w2jgs33pew.jpeg",
            price: 4050,
          },
          {
            title: "Custom",
            image: "https://trove.b-cdn.net/images/w2jgs33pew.jpeg",
            price: 0,
            options: [
              {
                title: "Refrigerator",
                category: [
                  {
                    title: "Standard",
                    // image: ["https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg"],
                    description:
                      "30-inch Wide Top Freezer Refrigerator - 18 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Gas Range",
                          description:
                            "Whirlpool® 5.1 Cu. Ft. Freestanding 4-Burner Gas Stove",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/s4qqtbhmwwj.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Gas Range",
                          description:
                            "5.0 cu. ft. gas range with SpeedHeat burner",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/qphkrwhhtra.jpeg",
                          ],
                        },
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/s4qqtbhmwwj.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                  {
                    title: "Premium",
                    image: "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                    description:
                      "36-inch Wide Side-by-Side Refrigerator - 24 cu. ft.",
                    price: 0,
                    subCategory: {
                      title: "Choose your range",
                      options: [
                        {
                          title: "Standard Gas Range",
                          description:
                            "Whirlpool® 5.1 Cu. Ft. Freestanding 4-Burner Gas Stove",
                          images: [
                            "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                            "https://trove.b-cdn.net/images/s4qqtbhmwwj.jpeg",
                          ],
                        },
                        {
                          title: "Standard steel Gas Range",
                          description:
                            "5.0 cu. ft. gas range with SpeedHeat burner",
                          images: [
                            "https://trove.b-cdn.net/images/0b0vbn2339yj.jpeg",
                            "https://trove.b-cdn.net/images/qphkrwhhtra.jpeg",
                          ],
                        },
                        {
                          title: "Standard Electric Range",
                          description:
                            "4.8 cu. ft. Whirlpool® electric range with Keep Warm setting",
                          images: [
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                        {
                          title: "Stainless Steel Electric Range",
                          description:
                            "5.3 cu. ft. electric range with Frozen Bake technology",
                          images: [
                            "https://trove.b-cdn.net/images/ek18w1fu7cb.jpeg",
                            "https://trove.b-cdn.net/images/ufgw0tvia9n.jpeg",
                          ],
                        },
                        {
                          title: "omit Range",
                          description: "",
                          images: [
                            "https://trove.b-cdn.net/images/hnjxd85ftfw.jpeg",
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    dishwasher: {
      title: "Dishwasher & Disposal",
      subtitle: "",
      description: "",
      package: [
        {
          title: "Kitchen Sink Disposal",
          price: 0,
          description: "",
        },
        {
          title: "Dishwasher & Sink Disposal",
          price: 0,
          description:
            "Stainless steel 4 cycle dishwasher and kitchen sink disposal",
        },
      ],
    },
  },
  advanceDetails: {
    title: "Advance Details",
    image: "https://trove.b-cdn.net/images/rs0o38rh9c.jpeg",
    celingHeight: {
      title: "Celing Height",
      options: [
        {
          title: "8' Flat",
          price: 0,
        },
        {
          title: "9' Flat",
          price: 2050,
        },
      ],
    },
    structuralUpgrades: {
      title: "Structural Upgrades",
      options: [
        {
          title: "Fire Sprinklers",
          price: 4050,
          description: "",
        },
        {
          title: "Reverse Hitch",
          price: 0,
          description:
            "This upgrade is sometimes needed for the delivery of the home. Talk to your builder before selecting this upgrade.",
        },
      ],
    },
    sidewallDimenstions: {
      title: "Sidewall Dimensions",
      options: [
        {
          title: "Standard",
          price: 0,
        },
        {
          title: `2" X 6" - 90" Sidewalls`,
          price: 1100,
        },
        {
          title: `2" X 6" - 96" Sidewalls`,
          price: 700,
        },
        {
          title: `2" X 6" - 108" Sidewalls`,
          price: 700,
        },
      ],
    },
    insulationOptions: {
      title: "Insulation Options",
      options: [
        {
          title: "Standard",
          price: 0,
        },
        {
          title: "Insulation R33",
          price: 0,
        },
      ],
    },
  },
};
