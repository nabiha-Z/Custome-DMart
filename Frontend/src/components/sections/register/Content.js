import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { signup } from '../../../api';


const images = [
    { img: 'images/img7.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'images/img9.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'images/img1.png', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];


function Content() {
    const routerHistory = useHistory();
    const [error, seterror] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [password, setpassword] = useState("");
    const [address, setAddress] = useState("");

    useEffect (()=>{

        const token = Cookies.get("token");
        
        if(token == null){
            console.log("hello");

        }
        else{

            const user = jwt_decode(token);
            const user_id = user.id;
            console.log("userid"+user_id);
        }

    },[])

    const API = async() => {
        console.log(name, email, phonenumber, password, address)
       await signup({
            name, email, phonenumber, password, address

        })
            .then(function (response) {
                if (response.data.message == true) {
                    console.log("llldfs")
                    console.log("token: ", response.data.token);
                    try {
                        Cookies.set('token', response.data.token);
                        Cookies.set('mail', email);
                        Cookies.set('id', response.data.user._id);
                        routerHistory.push('./profile');
                    } catch (e) {
                        return null;
                    }

                } else if (response.data.message === "false") {
                    seterror("User Already Existsed")
                }

            })
            .catch(function (error) {

            });
    }

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots: true,
        dotsClass: "d-flex slick-dots",
    }

    return (
        <div className="acr-auth-container">
            <div className="acr-auth-content" style={{marginTop:100}}>
                <form onSubmit={e => { e.preventDefault(); }}    >
                    <div className="auth-text">
                        <h3>Create A New Account</h3>
                        
                        <h4 style={{ color: '#C72C2C', fontWeight: 20, fontSize: 20 }}> {error} </h4>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control form-control-light" placeholder="Username" name="username" value={name} onChange={(e) => setname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control form-control-light" placeholder="Email Address" name="email" value={email} onChange={(e) => setemail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Phone No</label>
                        <input type="tel" className="form-control form-control-light" placeholder="Phone Number" name="phone" value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control form-control-light" placeholder="Password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control form-control-light" placeholder="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                   
                    <button type="submit" className="btn-custom secondary btn-block" style={{width:'100%', marginBottom:10, backgroundColor:'#2A9583'}} onClick={() => API()}>Register</button>
                    {/* <div className="auth-seperator">
                        <span>OR</span>
                    </div>
                    <div className="social-login">
                        <button type="button" className="acr-social-login google"><i className="fab fa-google" /> Continue with Google</button>
                    </div> */}
                    <p className="text-center mb-0">Already have an account? <Link to="/login">Login</Link> </p>
                </form>
            </div>
            <div className="acr-auth-bg">
            <img src="/images/bg6.jpg" style={{width:900, height:900}}/>
            </div>
        </div>
    );
}


export default Content;