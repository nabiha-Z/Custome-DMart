import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class Footercontent extends Component {
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 footer-widget">
                            <div className="footer-logo">
                                <img src="/logo2.png" alt="acres" />
                                
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                           
                        </div>
                        <div className="col-lg-2 offset-md-1 col-md-4 col-sm-6 footer-widget">
                            <h5 className="widget-title">Menu</h5>
                            <ul>
                                <li> <Link to="/products">Find Dress</Link> </li>
                                {Cookies.get('mail')===undefined?<li> <Link to="/login">Add Listings</Link> </li>:  <li> <Link to="/submit-listing">Add Listing</Link> </li>}
                               
                                <li> <Link to="/listing-grid">Listings</Link> </li>
                                <li> <Link to="/blog-grid">Blog</Link> </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6 footer-widget">
                            <h5 className="widget-title">Legal</h5>
                            <ul>
                                <li> <Link to="#">Privacy Policy</Link> </li>
                                <li> <Link to="#">Refund Policy</Link> </li>
                                <li> <Link to="#">Cookie Policy</Link> </li>
                            </ul>
                        </div>
                       
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <p className="m-0">© Copyright 2021 - <Link to="#">Outfit Adobe</Link> All Rights Reserved.</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Footercontent;