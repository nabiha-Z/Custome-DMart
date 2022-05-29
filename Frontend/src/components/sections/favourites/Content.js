//import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Saved from './Savedlists';
import { viewFavourites } from '../../../api';
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";


function Content() {

    const [saved, setSaved] = useState([]);
    const [check, setCheck] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const savedLists = [];



    const loadSaved = async () => {
        setFetching(true);
        const token = Cookies.get("token");
        const user = jwt_decode(token);
        const id = user.id;

        console.log(id);
        console.log("in funct");

        await viewFavourites({ id })

            .then(function (response) {
                console.log("response", response.data);
                if (response.data.message === true) {
                    console.log("type=", typeof (response.data.favourites));
                    setSaved(response.data.favourites);
                }
                setFetching(false);
            })
            .catch(function (error) {

            });

    }
    useEffect(() => {

        loadSaved();

    }, [check]);

    const LoadingData = () => {
        return (
            <>
                <div lassName="col-lg-12" style={{ color: "#59B0CD", fontSize: "80", marginLeft:500/2   }}>
                    <Bounce size='20' />;
                </div>
            </>
        );
    };

    const SavedLists = () => {
        return (
            <>
                <div className="col-lg-8" >
                    <Saved list={saved} check={check} setCheck={setCheck} />
                </div>
            </>
        );
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className="sidebar sticky-sidebar user-nav sidebar-left">
                            <ul>

                                <li> <Link to="/profile"> Edit Profile</Link> </li>
                                <li> <Link to="/favourites"  className="active"> Favourites </Link> </li>
                                <li> <Link to="/measurements"> Body Measurements </Link> </li>
                                <li> <Link className="logout" to="/" onClick={() => {
                                    Cookies.remove('token');
                                    Cookies.remove('mail');
                                    Cookies.remove('id');
                                }}><i className="flaticon-shut-down-button" /> Logout</Link> </li> </ul>
                        </div>
                    </div>
                    {/* <h1>hii</h1> */}
                    {isFetching? (<div className="col-lg-8"><LoadingData/></div>): saved.length === 0 ? (
                        <div className="col-lg-8">
                            <div className="acr-empty-section">
                                <i className="flaticon-home" />
                                <h3>You Haven't Saved Any Products</h3>
                                <p>You still havent saved any products yet, Go back to the products page and check some of your favorite items</p>
                                <Link to="/products" className="btn-custom">Go to Products</Link>
                            </div>
                        </div>) :

                        // isFetching || saved.length===0? <LoadingData/> : 
                        <SavedLists list={savedLists} />



                    }
                    {/* 
                        <div className="col-lg-8">
                             <div className="acr-empty-section">
                                 <i className="flaticon-home" />
                                 <h3>You Haven't Saved Any Listings</h3>
                                 <p>You still havent saved any listings yet, Go back to the listings page and check some of your favorite listings</p>
                                 <Link to="/listing-map" className="btn-custom">Go to Listings</Link>
                             </div>
                         </div> */}
                </div>
            </div>
        </div>
    );

    // }
}

export default Content;