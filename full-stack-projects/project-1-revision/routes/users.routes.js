import express from 'express';
import { register } from '../cantroller/register.cantroller.js';

const router=express.Router();

router.post('/register',register)

export default router;