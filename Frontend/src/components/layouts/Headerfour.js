import React, { Fragment, useState, useEffect } from 'react';
import Menu from '../layouts/Menu';
import { Badge } from '@material-ui/core';
import Mobilemenu from '../layouts/Mobilemenu';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import './header.css';
import { loginuser, currentuser } from '../../api';
import { ImCart } from 'react-icons/im';
import { HiShoppingCart } from 'react-icons/hi';
import { useHistory } from 'react-router';



const Headerfour = () => {
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

    return (
        <Fragment>
            {/* Aside (Mobile Navigation) */}
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
                        <Menu />
                       
                        <div className="header-controls">
                            <ul className="header-controls-inner d-none d-lg-flex">

                                {Cookies.get('id') === undefined ? <>
                                    <li className="menu-item menu-item-has-children"> <Link to="/login" id="loginBtn" >Login</Link> </li>
                                    <li>or</li>
                                    <li className="menu-item menu-item-has-children" > <Link to="/register" id="signupBtn"> Signup</Link> </li></> : <li>
                                    <Link to="/cart">
                                        <Badge badgeContent={totalItems} color="secondary">
                                            <HiShoppingCart style={{ color:'#3E3F40',width: 30, height: 'auto' }} />
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
            {/* Header End */}
        </Fragment>
    );
}


export default Headerfour;