import express from "express";

import { login, signup, updateProfile,forgotPassword, resetPassword,currentuser } from "../controllers/designer.js";



const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.post('/getDesigner',currentuser)
router.post('/updateprofile',updateProfile);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);

export default router;
