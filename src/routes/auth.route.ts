import express, { Router } from "express";
import {signin,signup} from '../controllers/auth.controller'

export const router: Router = express.Router();

router.post('/signup',signup);
router.post('/signin', signin);


export default router;
