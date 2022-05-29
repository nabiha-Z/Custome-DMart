import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'http://localhost:8000/' });

export const fetchProducts = () => API.get(`admin/getproducts`);
export const login = userdata => API.post(`user/login`, userdata);
export const searchLists = userdata => API.post(`listings/search`, userdata);
export const loginuser = userdata => API.post(`user/loginuser`, userdata);
export const currentuser = userdata => API.post(`user/currentuser`, userdata);
export const signup = userdata => API.post(`user/signup`, userdata);
export const searchCategory = userdata => API.post(`user/category-search`, userdata);
export const search = userdata => API.post(`user/search`, userdata);
export const latestProducts = userdata => API.get(`user/latestProducts`, userdata);
export const fetchCart = userdata => API.post(`user/fetchCart`, userdata);
export const addCart = userdata => API.post(`user/addCart`, userdata);
export const deleteItem = userdata => API.post(`user/deleteCartItem`, userdata);
export const deleteCart = userdata => API.post(`user/deleteCart`, userdata)
export const updateQuantity = userdata => API.post(`user/updateQuantity`, userdata);
export const getProduct = userdata => API.post(`user/getProduct`, userdata);
export const viewFavourites = userdata => API.post(`user/viewFavourites`, userdata);
export const unFavProduct = userdata => API.post(`user/unfavorite`, userdata);
export const favourite = userdata => API.patch(`user/favorite`, userdata);
export const updateProfile = (data)=>API.patch(`user/updateProfile`,data);
export const updatePicture = (data)=>API.post(`user/updatePicture`,data);
export const updatepassword = (data)=>API.patch(`user/changePassword`,data);
export const forgotPassword = userdata => API.post(`user/forgotpassword`, userdata);
export const resetPassword = userdata => API.post(`user/resetpassword`, userdata);
export const placeOrder = userdata => API.post(`user/placeorder`, userdata);



// export const login = loginForm => API.post('user/login', loginForm);
//export const signup =(userdata) => axios.post(`${url} /signup`,userdata)
export const fetchFeatures = userdata => API.get(`listings/getfeaures`, userdata);
export const approveFeatures = (id,data) => API.patch(`listings/updatefeatures/${id}`,data)
export const updatelimit = (id,data) => API.patch(`user/updatelimit/${id}`,data);



//export const updateList = (id, data) => API.patch(`user/approval/${id}`, data);

