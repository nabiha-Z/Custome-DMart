import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Menu from '../../layouts/Menu';
import { Badge } from '@material-ui/core';
import Mobilemenu from '../../layouts/Mobilemenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import { HiShoppingCart } from 'react-icons/hi';
import axios from 'axios';
import dropDown from './drop-down.css';
import UpArrow from '@material-ui/icons/ExpandLessTwoTone';
import { loginuser } from '../../../api';
import './home.css'

function Banner() {
    const [showButton, setShowButton] = useState(false);
    const [user, setuser] = useState({});
    const [navtoggle, setnavtoggle] = useState(false);
    const [navbar, setNavbar] = useState(false)

    const totalItems = 0

    const changeBackground = () => {

        if (window.scrollY >= 300) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(() => {
        loginuser({
            id: Cookies.get('id')
        })
            .then(function (response) {
                //  console.log("header rewsponse", response);
                if (response.data.message == true) {
                    try {
                        setuser(response.data.user);

                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === false) {

                }

            })
            .catch(function (error) {

            });

        window.addEventListener("scroll", () => {

            changeBackground()

        })


    }, []);

    const navtoggleClass = () => {
        setnavtoggle(!navtoggle)
    }



    useEffect(() => {


        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };
    return (

        <div className='header'>
            <aside className={classNames("main-aside", { "open": navtoggle })}>
                <div className="aside-title">
                    <div className="aside-controls aside-trigger">
                        <h4>Menu</h4>
                        <div className="close-btn close-dark" onClick={() => navtoggleClass()} >
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
                <Mobilemenu />
            </aside>
            <div className="aside-overlay aside-trigger" onClick={() => navtoggleClass()} />
            {/* Header Start */}
            <header className="main-header" id={navbar ? "coloredHeader" : "transparentHeader"}>
                <nav className="navbar" >
                    <div className="container">
                      
                        {/* Menu */}
                        <ul className="navbar-nav">
                            <li className="menu-item menu-item-has-children">
                                <Link to="/" id="links" style={{ color: navbar ? 'white' : 'white' }} >Home</Link>
                            </li>
                            <li className="menu-item menu-item-has-children" >
                                <Link to="/products" id="links" style={{ color: navbar ? 'white' : 'white' }}>Products</Link>
                            </li>

                            <li className="menu-item menu-item-has-children">
                                {Cookies.get("id") === undefined ? (
                                    ""
                                ) : (
                                    <Link to="/profile" style={{ color: navbar ? 'white' : 'white' }} id="links" >My Account</Link>
                                )}


                            </li>
                            <li> <h2 style={{marginLeft:Cookies.get("id") === undefined ?250:150, fontSize:30, fontWeight:'bold', marginTop:10, color:'white'}}>Custom D-Mart</h2></li>

                        </ul>
                        <div className="header-controls">
                            <ul className="header-controls-inner d-none d-lg-flex">

                                {Cookies.get('id') === undefined ? <>
                                    <li className="menu-item menu-item-has-children"> <Link to="/login" id="loginBtn" style={{color:'white'}}>Login</Link> </li>
                                    <li style={{color:'white'}}>or</li>
                                    <li className="menu-item menu-item-has-children" > <Link to="/register" id="signupBtn"> Signup</Link> </li></> : <li>
                                    <Link to="/cart">
                                        <Badge badgeContent={totalItems} color="secondary">
                                            <HiShoppingCart style={{ color: '#3E3F40', width: 30, height: 'auto' }} />
                                        </Badge>
                                    </Link>
                                </li>}


                            </ul>
                            {/* Toggler */}
                            <div className="aside-toggler aside-trigger" onClick={() => navtoggleClass()} >
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>



            <div id="HeaderCarousel" className="carousel slide carousel-fade" data-ride="carousel" data-interh5="1000">

                <div className="carousel-inner" >
                    <img src="/images/bg-image2.jpg" className='imgslider' />
                    <div className="row" style={{ backgroundColor: 'red' }}>

                        <div className='col-lg-5 col-md-5 col-sm-12' style={{justifyContent:'center', alignItems:'center'}}>
                            <div className="caption">
                                <h1 className="animate__animated animate__slideInDown" style={{color:'white'}}>Select.Try.Buy! </h1>
                                <p className="animate__animated animate__fadeInUp" ><a href="FoodOrderingSystemMenu.php"><span className="animate__animated animate__zoomIn" style={{ animationDelay: '1s' }} ><Link id="Order-Button" to="/products">Shop now!</Link></span ></a>
                                    <span className="animate__animated animate__fadeInRight">Enjoy it!</span></p>
                            </div>
                        </div>
              
                        <div className='col-lg-5 col-md-5 col-sm-12' >
                            <div className="caption2" >
                            
                            <img src="/images/mug.png" id='bannerImg2' className="animate__animated animate__slideInUp" style={{ animationDelay:'0s', animationDuration:'2s'}} />
                            <img src="/images/jacket.png" id='bannerImg3' className="animate__animated animate__fadeInDown" style={{ animationDelay:'0s', animationDuration:'2s'}}/>
                            <img src="/images/laptop.png" id='bannerImg1' className="animate__animated animate__slideInRight" style={{ animationDelay:'0s', animationDuration:'2s', width:500}}/> 
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );

}

export default Banner;