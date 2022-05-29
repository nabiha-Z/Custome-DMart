import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Button } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import 'antd/dist/antd.css';
import { message } from 'antd';
import './details.css';



export default function Details() {

    let routerHistory = useHistory();
    const location = useLocation();
    const [currentPage, setcurrentPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(6);
    const [loading, setloading] = useState(false);
    const sizes = ['S', 'M', 'L', 'XL']
    const [selectedSize, setSlected] = useState(null);

    const product = location.state.product;

    const addtocart = async () => {
        if (Cookies.get('id') !== undefined) {

          
            if (selectedSize !== null) {
               alert("Added to Cart")
            } else {
                message.error("Select Size")
            }
        } else {
            message.error("You need to login first!")
        }
    }


    return (
        <>
            <main class="container2">
                <div className='row' style={{ flex: 1, flexWrap: 'wrap' }}>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div class="left-column">
                            <img data-image="black" src="images/black.png" alt="" />
                            <img data-image="blue" src="images/blue.png" alt="" />
                            <img data-image="green" class="active" src={product.picture} alt="" />
                        </div>
                    </div>


                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div class="right-column">
                            <div class="product-description">
                                {/* <span>{product.category}</span> */}
                                <h1>{product.title}</h1>

                                {/* <p>{product.description}</p> */}
                                <p>The preferred choice of a vast range of acclaimed DJs. Punchy, bass-focused sound and high isolation. Sturdy headband and on-ear cushions suitable for live performance</p>
                            </div>

                            <div class="product-configuration">
                                <button class="try-on">
                                    <span>Virtual Try-on</span>
                                    <i className="fas fa-camera"  style={{margin:10}}/>
                                </button>
                                <div class="product-color" style={{marginTop:30}}>
                                    <span>Color</span>

                                    <div class="color-choose">
                                        <div >
                                            <input data-image="red" type="radio" id="red" name="color" value="red" checked />
                                            <label for="red"><span style={{ backgroundColor: product.color }}></span></label>
                                        </div>
                                        {/* <div>
                                            <input data-image="blue" type="radio" id="blue" name="color" value="blue" />
                                            <label for="blue"><span></span></label>
                                        </div>
                                        <div>
                                            <input data-image="black" type="radio" id="black" name="color" value="black" />
                                            <label for="black"><span></span></label>
                                        </div> */}
                                    </div>

                                </div>

                                <div class="product-config">
                                    <span>Sizes</span>

                                    <div class="product-choose">
                                        {sizes.map((item) => (
                                            <button onClick={() => setSlected(item)}>{item}</button>
                                        ))}

                                    </div>
                                </div>
                            </div>

                            <div class="product-price">
                                <span>{product.price}/-</span>
                                <button class="cart-btn" onClick={(e) =>addtocart()}>Add to cart</button>

                            </div>
                        </div>
                    </div>

                </div>

            </main>
            <div style={{padding:170}}>
                
            </div>
        </>
    )
}