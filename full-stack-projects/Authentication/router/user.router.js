import express from 'express';
import {register,verify,login, getProfile,logout} from '../cantrollers/user.cantroller.js'
import isLogedin from "../middleware/islogedIn.middleware.js";

const router=express.Router();

router.post('/register',register)
router.get('/verify/:token',verify);
router.post('/login',login);
router.post('/get-profile',isLogedin,getProfile)
router.get('/logout',isLogedin,logout)

export default router;