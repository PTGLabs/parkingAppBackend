import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { createParking, getParking } from "../services/parking.service";
import { Request, Response } from "express";

export const postParking = catchAsync(async (req: Request, res: Response) => {
  const response = await createParking(req.body);
  res
    .status(httpStatus.CREATED)
    .send({ message: "Parking has been created", response });
});

export const getAllParkings = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getParking();
    res
      .status(httpStatus.CREATED)
      .send({ message: "Got all Parkings", result });
  }
);
