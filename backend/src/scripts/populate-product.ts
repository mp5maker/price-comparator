import axios from "axios";
import FormData from "form-data";
import path from "path";
import fs from "fs";
import get from "lodash/get";

const products = [
  {
    name: "Samsung Fridge",
    model: "RT34K5032S8/D3",
    price: 50255,
    distributor: 1,
    type: 3,
    image: "elektra/samsung-fridge-1.png",
  },
  {
    name: "Samsung Fridge",
    model: "RT65K7058BS/D2",
    price: 109155,
    distributor: 1,
    type: 3,
    image: "elektra/samsung-fridge-2.png",
  },
  {
    name: "Samsung Washing Machine",
    model: "WW80J4213GS/TL (8Kg)",
    price: 49305,
    distributor: 1,
    type: 2,
    image: "elektra/samsung-washing-machine-1.png",
  },
  {
    name: "Samsung Washing Machine",
    model: "WW90K54EOUX/TL (9Kg)",
    price: 58805,
    distributor: 1,
    type: 2,
    image: "elektra/samsung-washing-machine-2.png",
  },
  {
    name: "General AC",
    model: "ASGA-18EHFT (1.5 Ton AC)",
    price: 78000,
    distributor: 3,
    type: 4,
    image: "esquire/general-ac-1.png",
  },
  {
    name: "Sharp Inverter Refrigerator",
    model: "SJ-EX585P-BK",
    price: 99900,
    distributor: 3,
    type: 3,
    image: "esquire/sharp-fridge-1.png",
  },
  {
    name: "Sharp Inverter Refrigerator",
    model: "SJ-EX645P-BK",
    price: 119000,
    distributor: 3,
    type: 3,
    image: "esquire/sharp-fridge-2.png",
  },
  {
    name: "Sharp Inverter Refrigerator",
    model: "SJ-EX455P-BK",
    price: 95000,
    distributor: 3,
    type: 3,
    image: "esquire/sharp-fridge-3.png",
  },
  {
    name: "Sharp Full Auto Washing Machine",
    model: "ES-HFH814AS3",
    price: 55000,
    distributor: 3,
    type: 2,
    image: "esquire/sharp-washing-machine-1.png",
  },
  {
    name: "Sharp Full Auto Washing Machine",
    model: "ES-HFH014AS3",
    price: 60000,
    distributor: 3,
    type: 2,
    image: "esquire/sharp-washing-machine-2.png",
  },
  {
    name: "LG Front Loading (6.5 KG)",
    model: "LG FC106554W",
    price: 54160,
    distributor: 4,
    type: 2,
    image: "butterfly/lg-washing-machine-1.png",
  },
  {
    name: "LG Front Loading (8 KG)",
    model: "F4J5TNP3W",
    price: 66350,
    distributor: 5,
    type: 2,
    image: "mk-electronics/mk-washing-machine-1.png",
  },
  {
    name: "Sony Bravia 43 4K Ultra HD Android Smart LED",
    model: "54X8000G",
    price: 67500,
    distributor: 5,
    type: 1,
    image: "mk-electronics/mk-tv-1.png",
  },
  {
    name: "General 1.5 Ton",
    model: "ASGA-18FMTB",
    price: 71000,
    distributor: 5,
    type: 4,
    image: "mk-electronics/mk-ac-1.png",
  },
  {
    name: "Sharp 649 Ltr.",
    model: "SJ-SE70D-BK3",
    price: 102830,
    distributor: 5,
    type: 3,
    image: "mk-electronics/mk-fridge-1.png",
  },
  {
    name: "Samsung 43 Inch 4K Smart UHD TV",
    model: "UA43TU80000RSER Series 8",
    price: 59900,
    distributor: 2,
    type: 1,
    image: "transcom/transcom-tv-1.png",
  },
  {
    name: "Samsung Side By Side Refrigerator",
    model: "RS72R5011B4/D2",
    price: 136900,
    distributor: 2,
    type: 3,
    image: "transcom/transcom-fridge-1.png",
  },
  {
    name: "Panasonic Non Inverter AC",
    model: "CS-VC18VKY-81+S",
    price: 65100,
    distributor: 2,
    type: 4,
    image: "transcom/transcom-ac-1.png",
  },
  {
    name: "Samsung Front Loading (9KG)",
    model: "WW90K54EOUX/TL",
    price: 61900,
    distributor: 2,
    type: 2,
    image: "transcom/transcom-wm-1.png",
  },
  {
    name: "Samsung Front Loading (9KG)",
    model: "WW91K54EOUX/TL",
    price: 61900,
    distributor: 2,
    type: 2,
    image: "transcom/transcom-wm-2.png",
  },
  {
    name: "Samsung Front Loading (6KG)",
    model: "WF600BOBHWQ",
    price: 53900,
    distributor: 2,
    type: 2,
    image: "transcom/transcom-wm-3.png",
  },
  {
    name: "Samsung Front Loading (8KG) Eco Bubble",
    model: "WW80J4213GS/TL",
    price: 51900,
    distributor: 2,
    type: 2,
    image: "transcom/transcom-wm-4.png",
  },
];

const init = async () => {
  try {
    const requests = products.map(async (item) => {
      let formData = new FormData();
      const imagePath = path.join(__dirname, "images", get(item, "image", ""));
      formData.append("name", get(item, "name", ""));
      formData.append("model", get(item, "model", ""));
      formData.append("price", get(item, "price", ""));
      formData.append("distributor", get(item, "distributor", ""));
      formData.append("type", get(item, "type", ""));
      await formData.append("image", fs.createReadStream(imagePath));
      return axios.post("http://localhost:4000/api/v1/product/", formData, {
        headers: {
          // @ts-ignore
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });
    });

    await Promise.all(requests);
  } catch (error) {
    console.log(error);
  }
};

init();
