import axios from "axios";

const instance = axios.create({
  baseURL: "https://tracking.bosta.co/shipments/",
  headers: {
    accept: "application/json",
  },
});

export const getShipment = async (trackingNumber: any) => {
  const res = await instance.get(`track/${trackingNumber}`);
  return res.data;
};
export default instance;
