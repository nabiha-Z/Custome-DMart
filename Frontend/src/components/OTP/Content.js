import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import { forgotPassword } from '../../../api';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';


const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

function Content() {


    const routerHistory = useHistory();
    const [email, setEmail] = useState("");


    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots: true,
        dotsClass: "d-flex slick-dots",
    }


    const sendEmai = async () => {
        console.log("email: ", email)
        await forgotPassword({
            email: email

        })
            .then(function (response) {
                console.log(response.data.message);
                if (response.data.message === true) {
                    setEmail("");
                    message.success(response.data.success)
                    routerHistory.push('/login');
                } else {
                    //alert("not found");
                    message.error(response.data.error)
                }

            })
            .catch(function (error) {

            });
    }

    return (
        <div className="acr-auth-container">
            <div className="acr-auth-content">
                <form onSubmit={e => { e.preventDefault(); }} >
                    <div className="auth-text">
                        <h3>Forgot Password?</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>


                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control form-control-light" placeholder="Username" name="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>


                    <button className="btn-custom secondary btn-block" onClick={() => sendEmai()}>Send Reset Instructions</button>

                    <p className="text-center mb-0">Don't have an account? <Link to="/register">Create One</Link> </p>
                </form>
            </div>
            <div className="acr-auth-bg">
                <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
                    {images.map((item, i) => (
                        <div key={i}>
                            <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} >
                                <div className="acr-auth-quote">
                                    <h6>{item.title}</h6>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}


export default Content;