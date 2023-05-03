/* eslint-disable prettier/prettier */
import express from "express";

import authRoute from "./auth.route";
import parkingRoute from "./parking.route";
import userRoute from "./user.route";



 const router = express.Router();

router.use("/auth", authRoute);
router.use("/parking", parkingRoute);
router.use("/user", userRoute);



export default router;

