import express from 'express';
import { getAllParkings, postParking } from '../controllers/parking.controller';

const parkingRouter = express.Router();

parkingRouter.route('/').post(postParking).get(getAllParkings);

export default parkingRouter;