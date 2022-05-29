import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import './login.css';
import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { login } from '../../../api/index';


const images = [
    { img: 'images/img8.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'images/img1.png', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'images/img2.png', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

function Content() {


    const routerHistory = useHistory();
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [error, seterror] = useState([]);


    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots: true,
        dotsClass: "d-flex slick-dots",
    }
    const API = async () => {
        console.log(email, password)
        await login({
            email: email, password: password

        })
            .then(function (response) {
                //   console.log(response);
                if (response.data.message === true) {
                    console.log("token: ", response.data.token);
                    try {
                        Cookies.set('token', response.data.token);
                        var newarray = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'];
                        Cookies.set('series', newarray);
                        Cookies.set('mail', email);
                        Cookies.set('id', response.data.user._id);
                        routerHistory.push('./profile');
                    } catch (e) {
                        return null;
                    }

                } else if (response.data.message === false) {
                    // seterror("Login Failed");
                    console.log("err:", response.data.error)
                    message.error(response.data.error)

                }

            })
            .catch(function (error) {

            });
    }

    return (
        <div className="acr-auth-container">
            <div className="acr-auth-bg" style={{marginTop:20}}>
                <img src="/images/bg2.jpg" style={{width:900, height:600}}/>
               
            </div>
            <div className="acr-auth-content" style={{marginTop:80}}>
                <form onSubmit={e => { e.preventDefault(); }} >
                    <div className="auth-text">
                        <h3>Log Into Your Account</h3>
                  
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control form-control-light" placeholder="Email" name="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control form-control-light" placeholder="Password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <Link to="/forgotpassword" className="forgot-password">Forgot Password?</Link>
                    </div>
                    <button className="loginBtn" onClick={() => API()}>Login</button>
                    {/* <div className="auth-seperator">
                        <span>OR</span>
                    </div>
                    <div className="social-login">

                        <button type="button" className="acr-social-login google"><i className="fab fa-google" /> Continue with Google</button>
                    </div> */}
                    <p className="text-center mb-0">Don't have an account? <Link to="/register">SignUp now</Link> </p>
                </form>
            </div>
            
        </div>
    );
}


export default Content;