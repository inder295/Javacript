import {Router} from "express";
import { healthcheck } from "../cantrollers/healthcheck.cantroller.js";

const router=Router();

router.get("/",healthcheck);


export default router;