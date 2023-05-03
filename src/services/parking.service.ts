import { Parking } from "../models/parking.model";

export const createParking = async (body: any) => {
  const parking = await Parking.create(body);
  return parking;
};

export const getParking = async () => {
  const parking = Parking.find();
  return parking;
};

