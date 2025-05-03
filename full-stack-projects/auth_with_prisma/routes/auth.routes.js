import express from "express";
import { registerUser } from "../cantrollers/auth.cantroller.js";

const userRoute=express.Router();

userRoute.post("/register",registerUser);

export default userRoute;