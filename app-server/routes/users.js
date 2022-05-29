import express from 'express';

import {getusers, login,loginuser,signup,favList, updateProfile, changePassword, forgotPassword, resetPassword, 
    fetchMeasurements, deleteMeasurements, editMeasurements, categorySearch, searchProducts,deleteCart, filterProducts, fetchCart, addInCart, updateQuantity, deleteCartItem, latestProducts, changePicture, viewFavourites, unfavList, currentuser, updatePicture, smartAdvisor, placeorder, orderhistory, recommendations } from '../controllers/users.js';


const router = express.Router();
router.get('/',getusers);
router.post('/signup',signup);
router.post('/login',login);
router.post('/loginuser',loginuser);
router.post('/currentuser',currentuser);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.post('/changePicture', changePicture);
router.patch('/favorite',favList);  
router.post('/unfavorite',unfavList);  
router.post('/viewFavourites',viewFavourites);  
router.post('/search', searchProducts);
router.post('/filter', filterProducts);
router.post('/fetchCart', fetchCart);
router.post('/addCart', addInCart);
router.post('/updatePicture', updatePicture);
router.get('/latestProducts', latestProducts);
router.post('/updateQuantity', updateQuantity);
router.post('/deleteCart', deleteCart);
router.post('/deleteCartItem', deleteCartItem);
router.post('/orderhistory', orderhistory);
router.post('/category-search', categorySearch);
router.post('/deleteMeassurements', deleteMeasurements);
router.patch('/editMeasurements', editMeasurements);
router.post('/getMeassurements', fetchMeasurements);
router.patch('/updateProfile',updateProfile);
router.patch('/changePassword',changePassword);
router.post('/smartAdvisor', smartAdvisor);
router.post('/recommendations', recommendations);
router.post('/placeorder', placeorder);



export default router;