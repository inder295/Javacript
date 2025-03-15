import express from "express";
import { login, registerUser,verifyUser } from "../cantroller/user.cantroller.js";
import { verify } from "crypto";

const router=express.Router();

router.post('/register',registerUser);

//after colon : its a variable name
router.get('/verify/:token',verifyUser);
router.post('/login',login); 

export default router;