import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, NavLink } from 'react-bootstrap';
import App from './App';

class Footer extends Component {
    render() {
        return (
            <footer className="acr-footer footer-2">
                {/* Footer Top Start */}
            
                {/* Footer Top End */}
                {/* Footer Middle Start */}
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-sm-12 footer-widget">
                                <div className="footer-logo"> <img src={"/images/logo2.png"} alt="acres" /> </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                              
                            </div>
                            <div className="col-lg-2 offset-lg-1 col-sm-4 footer-widget">
                                <h5 className="widget-title">Menu</h5>
                                <ul>
                                    <li> <Link to="/listing-grid">Find Dress</Link> </li>
                                    <li> <Link to="/about">Contact Us</Link> </li>
                                    <li> <Link to="/faq">FAQ</Link> </li>
                                </ul>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                {/* Footer Middle End */}
                {/* Footer Bottom Start */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <p className="m-0">© Copyright 2022 - <Link to="#">Outfit Adobe</Link> All Rights Reserved.</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
                {/* Footer Bottom End */}
            </footer>
        );
    }
}

export default Footer;