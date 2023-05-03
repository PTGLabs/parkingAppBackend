import { Parking } from "./../models/parking.model";
import httpStatus from "http-status";
import { User } from "../models/user.model";
import ApiError from "../utils/APIError";

export const updateUserById = async (userId: string, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const parking = await Parking.findOne({
    area: updateBody.bookings[0].area,
    spot: updateBody.bookings[0].spot,
  });
  if (!parking) {
    throw new ApiError(httpStatus.NOT_FOUND, "Parking spot not found");
  }
  const obj = {
    booked :true
  }
  Object.assign(parking, obj);
  await parking.save();
  updateBody.bookings = user.bookings?.concat(updateBody.bookings);
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const getUserById = async (id: string) => {
  return User.findById(id);
};
