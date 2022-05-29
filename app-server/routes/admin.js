import express from "express";

import { login, signup, updateProfile,forgotPassword, resetPassword, verifyDesigners, viewVerifiedDesigners } from "../controllers/admin.js";



const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.patch('/edit',updateProfile);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.post('/verifyDesigners', verifyDesigners);
router.get('/viewVerified', viewVerifiedDesigners);

export default router;
